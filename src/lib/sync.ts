import type { SupabaseClient } from "@supabase/supabase-js";
import {
  hydrateFromRemote,
  getCompletedDays,
  getProfile,
  getEnrollment,
  getFinalResult,
  getOrCreateCertCode,
  type RemoteSnapshot,
} from "@/lib/progress";

/**
 * Đồng bộ dữ liệu học viên giữa localStorage và Supabase (local-first).
 * - pullAll: kéo dữ liệu từ Supabase về localStorage khi đăng nhập.
 * - pushAll: đẩy trạng thái local hiện tại lên Supabase khi có thay đổi.
 *
 * Phạm vi đồng bộ: tiến độ bài học, hồ sơ, gói đã ghi danh, chứng nhận.
 * (Đơn hàng vẫn ở local cho admin demo; khi nối payOS sẽ tạo đơn ở server.)
 */

export async function pullAll(
  supabase: SupabaseClient,
  userId: string,
): Promise<void> {
  try {
    const [prog, prof, enr, cert] = await Promise.all([
      supabase
        .from("lesson_progress")
        .select("day")
        .eq("user_id", userId)
        .eq("completed", true),
      supabase
        .from("profiles")
        .select("full_name,email")
        .eq("id", userId)
        .maybeSingle(),
      supabase
        .from("enrollments")
        .select("plan_id,order_id,enrolled_at")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("certificates")
        .select("code,score,total,issued_at")
        .eq("user_id", userId)
        .order("issued_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    const snapshot: RemoteSnapshot = {};

    if (prog.data) {
      snapshot.completed = prog.data
        .map((r: { day: number }) => r.day)
        .sort((a, b) => a - b);
    }
    if (prof.data) {
      snapshot.profile = {
        fullName: prof.data.full_name ?? "",
        email: prof.data.email ?? "",
      };
    }
    if (enr.data) {
      snapshot.enrollment = {
        planId: enr.data.plan_id,
        orderId: enr.data.order_id ?? "",
        enrolledAt: enr.data.enrolled_at,
      };
    }
    if (cert.data) {
      snapshot.certCode = cert.data.code;
      snapshot.final = {
        score: cert.data.score ?? 0,
        total: cert.data.total ?? 0,
        passed: true,
        completedAt: cert.data.issued_at,
      };
    }

    hydrateFromRemote(snapshot);
  } catch (e) {
    console.error("[sync] pull failed", e);
  }
}

/** Log lỗi query Supabase (supabase-js trả lỗi trong .error chứ không throw). */
function logErr(label: string, error: { message: string } | null) {
  if (error) console.error(`[sync] ${label}:`, error.message);
}

export async function pushAll(
  supabase: SupabaseClient,
  userId: string,
): Promise<void> {
  try {
    const completed = getCompletedDays();
    const profile = getProfile();
    const enrollment = getEnrollment();
    const final = getFinalResult();
    const now = new Date().toISOString();

    // Tiến độ bài học
    if (completed.length > 0) {
      const up = await supabase.from("lesson_progress").upsert(
        completed.map((day) => ({
          user_id: userId,
          day,
          completed: true,
          completed_at: now,
        })),
        { onConflict: "user_id,day" },
      );
      logErr("progress upsert", up.error);
      const del = await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", userId)
        .not("day", "in", `(${completed.join(",")})`);
      logErr("progress delete", del.error);
    } else {
      const del = await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", userId);
      logErr("progress clear", del.error);
    }

    // Hồ sơ
    if (profile) {
      const r = await supabase
        .from("profiles")
        .upsert(
          { id: userId, full_name: profile.fullName, email: profile.email },
          { onConflict: "id" },
        );
      logErr("profile upsert", r.error);
    }

    // Ghi danh (gói học)
    if (enrollment) {
      const r = await supabase
        .from("enrollments")
        .upsert(
          {
            user_id: userId,
            plan_id: enrollment.planId,
            enrolled_at: enrollment.enrolledAt,
          },
          { onConflict: "user_id" },
        );
      logErr("enrollment upsert", r.error);
    }

    // Chứng nhận (chỉ khi đã đạt)
    if (final?.passed) {
      const r = await supabase.from("certificates").upsert(
        {
          user_id: userId,
          code: getOrCreateCertCode(),
          score: final.score,
          total: final.total,
        },
        { onConflict: "code" },
      );
      logErr("certificate upsert", r.error);
    }
  } catch (e) {
    console.error("[sync] push failed", e);
  }
}
