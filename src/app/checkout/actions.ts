"use server";

import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isPayosConfigured, getPayos } from "@/lib/payos";
import { confirmOrderPaid } from "@/lib/orders";
import { getPlan } from "@/data/pricing";

export interface CheckoutInput {
  planId: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface CheckoutResult {
  error?: string;
  /** Có giá trị khi dùng payOS thật -> client chuyển hướng sang trang thanh toán. */
  redirectUrl?: string;
  /** True khi đã kích hoạt ngay (chế độ mock / chưa nối payOS). */
  mockPaid?: boolean;
}

export async function createCheckout(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  const plan = getPlan(input.planId);
  if (!plan) return { error: "Gói học không hợp lệ." };

  // Chưa cấu hình Supabase -> chế độ demo thuần local (client tự lưu).
  if (!isSupabaseConfigured) return { mockPaid: true };

  const user = await getCurrentUser();
  if (!user) return { error: "Vui lòng đăng nhập để thanh toán." };

  const supabase = await createClient();
  const orderCode = Date.now();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      plan_id: plan.id,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      amount: plan.price,
      status: "pending",
      payos_order_code: orderCode,
    })
    .select("id")
    .single();

  if (error || !order) {
    return { error: `Không tạo được đơn hàng. ${error?.message ?? ""}`.trim() };
  }

  // Có payOS thật -> tạo link thanh toán và chuyển hướng.
  if (isPayosConfigured) {
    try {
      const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      const link = await getPayos().paymentRequests.create({
        orderCode,
        amount: plan.price,
        description: `AIM28 ${plan.name}`.slice(0, 25),
        returnUrl: `${origin}/dashboard?paid=1`,
        cancelUrl: `${origin}/checkout?plan=${plan.id}&canceled=1`,
      });
      return { redirectUrl: link.checkoutUrl };
    } catch (e) {
      console.error("[payos] create link failed", e);
      return { error: "Không tạo được liên kết thanh toán. Vui lòng thử lại." };
    }
  }

  // Chưa nối payOS -> mô phỏng xác nhận thanh toán ngay (mock).
  const ok = await confirmOrderPaid(orderCode);
  if (!ok) {
    return {
      error:
        "Đơn đã tạo nhưng chưa kích hoạt được. Cần thêm SUPABASE_SERVICE_ROLE_KEY để xác nhận (xem README).",
    };
  }
  return { mockPaid: true };
}
