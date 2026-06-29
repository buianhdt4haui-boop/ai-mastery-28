/**
 * 5 biến thể hero section để A/B test.
 * Dùng qua URL: /?hero=1 ... /?hero=5 (gắn vào từng creative quảng cáo).
 * Mặc định là biến thể 1.
 *
 * Nguyên tắc copy (compliance):
 * - Không cam kết/đảm bảo kiếm tiền, không hứa kết quả chắc chắn.
 * - Không ám chỉ người xem nghèo/thất bại/tụt hậu.
 * - Tập trung lợi ích: tiết kiệm thời gian, làm việc nhanh hơn, hiểu công cụ AI,
 *   tạo sản phẩm số đầu tiên, xây workflow cá nhân.
 */
export interface HeroVariant {
  /** Nhãn nội bộ để phân tích A/B (không hiển thị). */
  angle: string;
  eyebrow: string;
  /** Phần tiêu đề được tô gradient. */
  headlineHighlight: string;
  /** Phần tiêu đề còn lại. */
  headlineRest: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  microcopy: string;
}

export const heroVariants: HeroVariant[] = [
  {
    // V1 — Năng lực / làm chủ công cụ (mặc định)
    angle: "capability",
    eyebrow: "Lộ trình học AI 28 ngày cho người Việt",
    headlineHighlight: "Làm chủ công cụ AI",
    headlineRest: "trong 28 ngày, mỗi ngày 15 phút",
    subheadline:
      "Học cách dùng ChatGPT và các công cụ AI phổ biến để làm việc nhanh hơn, tạo nội dung tốt hơn và xây sản phẩm số đầu tiên của bạn.",
    primaryCta: "Làm bài test miễn phí",
    secondaryCta: "Xem lộ trình 28 ngày",
    microcopy: "Miễn phí, không cần thẻ • Nhận lộ trình cá nhân hóa trong 2 phút",
  },
  {
    // V2 — Tiết kiệm thời gian
    angle: "time-saving",
    eyebrow: "Mỗi ngày chỉ 15–20 phút",
    headlineHighlight: "Biến AI thành trợ lý",
    headlineRest: "cho công việc mỗi ngày của bạn",
    subheadline:
      "28 bài học ngắn giúp bạn tiết kiệm thời gian cho email, nội dung, hình ảnh và những việc lặp lại — bằng các công cụ AI bạn có thể dùng ngay hôm nay.",
    primaryCta: "Bắt đầu miễn phí",
    secondaryCta: "Xem bạn sẽ học gì",
    microcopy: "Học theo nhịp của bạn • Truy cập nội dung lâu dài",
  },
  {
    // V3 — Chống ngợp / lộ trình rõ ràng
    angle: "clarity",
    eyebrow: "Một lộ trình rõ ràng, dễ theo",
    headlineHighlight: "Một lộ trình AI rõ ràng",
    headlineRest: "thay cho hàng trăm video rời rạc",
    subheadline:
      "Thay vì tự mò mẫm giữa quá nhiều công cụ, bạn đi theo 28 bước có cấu trúc — mỗi ngày học một công cụ và áp dụng được ngay vào công việc.",
    primaryCta: "Làm bài test miễn phí",
    secondaryCta: "Xem lộ trình 28 ngày",
    microcopy: "Lộ trình cá nhân hóa theo mục tiêu của bạn • Miễn phí",
  },
  {
    // V4 — Học bằng cách làm
    angle: "learn-by-doing",
    eyebrow: "Học bằng cách làm thật",
    headlineHighlight: "28 ngày, 28 bước thực hành",
    headlineRest: "bạn áp dụng được ngay",
    subheadline:
      "Mỗi bài đi kèm prompt mẫu và bài tập ứng dụng, để bạn không chỉ hiểu lý thuyết mà còn tạo ra kết quả thật cho công việc mỗi ngày.",
    primaryCta: "Làm bài test miễn phí",
    secondaryCta: "Xem chương trình học",
    microcopy: "Có prompt mẫu, checklist và bài tập • Bắt đầu miễn phí",
  },
  {
    // V5 — Kết quả: sản phẩm số & workflow
    angle: "outcome",
    eyebrow: "Phù hợp cho người mới bắt đầu",
    headlineHighlight: "Dùng AI thành thạo",
    headlineRest: "và xây sản phẩm số đầu tiên trong 28 ngày",
    subheadline:
      "Từ nền tảng ra lệnh (prompting) đến content, hình ảnh, video và tự động hóa — khép lại bằng một sản phẩm số và workflow AI của riêng bạn.",
    primaryCta: "Làm bài test miễn phí",
    secondaryCta: "Xem lộ trình 28 ngày",
    microcopy: "Đi từ con số 0 • Nhận lộ trình phù hợp trong 2 phút",
  },
];

/** Lấy biến thể theo tham số ?hero= (1-based). Mặc định biến thể đầu tiên. */
export function getHeroVariant(param?: string): HeroVariant {
  const index = Number(param) - 1;
  if (Number.isInteger(index) && index >= 0 && index < heroVariants.length) {
    return heroVariants[index];
  }
  return heroVariants[0];
}
