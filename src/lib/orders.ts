import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

/**
 * Xác nhận một đơn đã thanh toán: cập nhật status -> 'paid' và mở quyền học
 * (tạo enrollment). Dùng SERVICE ROLE nên gọi từ server (webhook payOS hoặc
 * luồng mock). KHÔNG phải server action — không expose ra client.
 */
export async function confirmOrderPaid(orderCode: number): Promise<boolean> {
  if (!isAdminConfigured) {
    console.error(
      "[orders] thiếu SUPABASE_SERVICE_ROLE_KEY — không thể xác nhận thanh toán",
    );
    return false;
  }

  const admin = createAdminClient();

  const { data: order, error } = await admin
    .from("orders")
    .select("id,user_id,plan_id,status")
    .eq("payos_order_code", orderCode)
    .maybeSingle();

  if (error || !order) {
    console.error("[orders] không tìm thấy đơn", orderCode, error?.message);
    return false;
  }
  if (order.status === "paid") return true; // idempotent

  const upd = await admin
    .from("orders")
    .update({ status: "paid" })
    .eq("id", order.id);
  if (upd.error) {
    console.error("[orders] update paid lỗi", upd.error.message);
    return false;
  }

  const enr = await admin.from("enrollments").upsert(
    {
      user_id: order.user_id,
      plan_id: order.plan_id,
      order_id: order.id,
      enrolled_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (enr.error) {
    console.error("[orders] tạo enrollment lỗi", enr.error.message);
    return false;
  }

  return true;
}
