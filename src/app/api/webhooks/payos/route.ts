import { NextResponse } from "next/server";
import { isPayosConfigured, getPayos } from "@/lib/payos";
import { confirmOrderPaid } from "@/lib/orders";

/**
 * Webhook payOS: payOS gọi POST tới đây khi có biến động thanh toán.
 * - Xác thực dữ liệu bằng checksum (SDK `webhooks.verify`).
 * - Nếu hợp lệ -> xác nhận đơn đã thanh toán + mở quyền học.
 *
 * Cấu hình URL webhook trong dashboard payOS: https://<domain>/api/webhooks/payos
 */
export async function POST(request: Request) {
  if (!isPayosConfigured) {
    // Chưa nối payOS -> không xử lý (chế độ mock dùng luồng checkout).
    return NextResponse.json({ received: true, mock: true });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    // verify ném lỗi nếu chữ ký không hợp lệ.
    const data = await getPayos().webhooks.verify(
      body as Parameters<ReturnType<typeof getPayos>["webhooks"]["verify"]>[0],
    );
    if (data?.orderCode) {
      await confirmOrderPaid(Number(data.orderCode));
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[payos webhook] verify failed", e);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "payos webhook endpoint" });
}
