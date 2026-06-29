/**
 * Cảm nhận học viên.
 *
 * 👉 Khi có review THẬT (đã xin phép học viên): thay nội dung bên dưới và đặt
 *    `testimonialsAreReal = true` để BỎ nhãn "minh họa".
 *    Trước khi có review thật, giữ `false` để hiển thị trung thực (gắn nhãn minh họa).
 */
export interface Testimonial {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

export const testimonialsAreReal = false;

export const testimonials: Testimonial[] = [
  {
    initials: "NH",
    name: "Học viên minh họa A",
    role: "Chủ shop online",
    quote:
      "Mình thích cách chia nhỏ mỗi ngày 15 phút. Dễ theo và không bị bỏ cuộc giữa chừng.",
  },
  {
    initials: "TM",
    name: "Học viên minh họa B",
    role: "Nhân viên văn phòng",
    quote:
      "Phần tóm tắt tài liệu và soạn email bằng AI giúp mình tiết kiệm kha khá thời gian mỗi ngày.",
  },
  {
    initials: "PL",
    name: "Học viên minh họa C",
    role: "Freelancer",
    quote:
      "Lộ trình rõ ràng nên mình biết hôm nay học gì, làm gì. Bài tập sát thực tế.",
  },
];
