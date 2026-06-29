"use server";

import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

export interface CaptureLeadInput {
  email: string;
  personaId?: string;
  recommendedPlan?: string;
  answers?: Record<string, unknown>;
}

export interface CaptureLeadResult {
  ok?: boolean;
  error?: string;
}

/**
 * Lưu email lead từ trang kết quả quiz vào Supabase (qua service role).
 * Chưa cấu hình service role -> vẫn trả ok để không chặn UX (demo/local).
 */
export async function captureLead(
  input: CaptureLeadInput,
): Promise<CaptureLeadResult> {
  const email = input.email?.trim().toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Email chưa hợp lệ." };
  }

  if (!isAdminConfigured) return { ok: true };

  const admin = createAdminClient();
  const { error } = await admin.from("leads").upsert(
    {
      email,
      persona_id: input.personaId ?? null,
      recommended_plan: input.recommendedPlan ?? null,
      answers: input.answers ?? null,
      source: "quiz_result",
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error("[leads] capture failed:", error.message);
    return { error: "Không lưu được, vui lòng thử lại." };
  }
  return { ok: true };
}
