import type { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 299_000,
    description: "Hợp lý để bắt đầu và xây thói quen dùng AI mỗi ngày.",
    features: [
      "Toàn bộ 28 bài học theo lộ trình",
      "Bài tập thực hành mỗi ngày",
      "Bộ prompt mẫu cơ bản",
      "Truy cập trọn đời nội dung khóa học",
      "Chứng nhận hoàn thành",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 499_000,
    recommended: true,
    description: "Được chọn nhiều nhất — học sâu hơn và có đủ tài nguyên để áp dụng thực tế.",
    features: [
      "Tất cả quyền lợi gói Starter",
      "Bộ template content & checklist đầy đủ",
      "Thư viện prompt nâng cao theo ngành",
      "Bài kiểm tra cuối khóa & lộ trình cá nhân hóa",
      "Cập nhật nội dung mới trong 12 tháng",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 999_000,
    description: "Cho người muốn học trọn vẹn nhất, kèm hỗ trợ và tài nguyên mở rộng.",
    features: [
      "Tất cả quyền lợi gói Pro",
      "Bộ tài nguyên mở rộng (template sản phẩm số)",
      "Hướng dẫn xây sản phẩm số & trợ lý AI riêng",
      "Ưu tiên hỗ trợ qua email",
      "Cập nhật nội dung trọn đời",
    ],
  },
];

export function getPlan(id: string): PricingPlan | undefined {
  return pricingPlans.find((p) => p.id === id);
}

/** Định dạng tiền VND. */
export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}
