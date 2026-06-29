import type { Persona } from "@/types";

/** Các chân dung học viên — kết quả map từ câu trả lời quiz. */
export const personas: Persona[] = [
  {
    id: "creator",
    title: "Nhà sáng tạo nội dung",
    emoji: "🎬",
    description:
      "Bạn muốn sản xuất nội dung đều đặn và chất lượng hơn mà không kiệt sức. Lộ trình của bạn tập trung vào content, hình ảnh và video bằng AI.",
    path: [
      "Tuần 1: nền tảng prompting để ra ý tưởng nhanh",
      "Tuần 2: viết content & tạo hình ảnh đồng bộ thương hiệu",
      "Tuần 3: kịch bản, voiceover và dựng video ngắn",
      "Tuần 4: đóng gói nội dung thành sản phẩm số",
    ],
    recommendedPlan: "pro",
  },
  {
    id: "seller",
    title: "Chủ shop / Người bán hàng",
    emoji: "🛍️",
    description:
      "Bạn muốn bán hàng hiệu quả hơn với AI: từ mô tả sản phẩm, hình ảnh đến nội dung quảng cáo. Lộ trình ưu tiên content bán hàng và chuyển đổi.",
    path: [
      "Tuần 1: dùng AI soạn nội dung và trả lời khách nhanh",
      "Tuần 2: ảnh sản phẩm & bài đăng bán hàng",
      "Tuần 3: video sản phẩm và tự động hóa chăm sóc khách",
      "Tuần 4: trang bán hàng, quảng cáo và email",
    ],
    recommendedPlan: "pro",
  },
  {
    id: "marketer",
    title: "Marketer",
    emoji: "📈",
    description:
      "Bạn muốn tăng tốc toàn bộ quy trình marketing bằng AI. Lộ trình của bạn đi sâu vào nội dung, quảng cáo, email và phân tích.",
    path: [
      "Tuần 1: prompting nâng cao & nghiên cứu thị trường",
      "Tuần 2: sản xuất content quy mô và đúng giọng thương hiệu",
      "Tuần 3: video, tự động hóa và xử lý dữ liệu",
      "Tuần 4: phễu, quảng cáo, email và sản phẩm số",
    ],
    recommendedPlan: "premium",
  },
  {
    id: "freelancer",
    title: "Freelancer / Người muốn thu nhập thêm",
    emoji: "💼",
    description:
      "Bạn muốn dùng AI để nhận thêm việc hoặc tạo nguồn thu mới. Lộ trình tập trung vào kỹ năng tạo sản phẩm số và dịch vụ.",
    path: [
      "Tuần 1: nền tảng AI để làm việc nhanh hơn",
      "Tuần 2–3: kỹ năng content, hình ảnh, video có thể bán dịch vụ",
      "Tuần 4: xây sản phẩm số & trợ lý AI riêng",
      "Định hướng: đóng gói kỹ năng thành dịch vụ/sản phẩm",
    ],
    recommendedPlan: "premium",
  },
  {
    id: "office",
    title: "Nhân viên văn phòng",
    emoji: "🧑‍💻",
    description:
      "Bạn muốn làm việc nhanh và nhẹ nhàng hơn với AI. Lộ trình ưu tiên năng suất, xử lý tài liệu và tự động hóa việc lặp lại.",
    path: [
      "Tuần 1: trợ lý chat, tóm tắt tài liệu, tra cứu",
      "Tuần 2: soạn thảo & biên tập nội dung công việc",
      "Tuần 3: tự động hóa, bảng tính và quản lý công việc",
      "Tuần 4: xây trợ lý AI riêng cho công việc của bạn",
    ],
    recommendedPlan: "starter",
  },
  {
    id: "student",
    title: "Sinh viên / Người mới bắt đầu",
    emoji: "🎓",
    description:
      "Bạn muốn làm quen với AI từ gốc và xây nền tảng vững. Lộ trình đi chậm rãi, dễ hiểu và nhiều thực hành.",
    path: [
      "Tuần 1: hiểu AI và luyện prompting cơ bản",
      "Tuần 2: học và sáng tạo nội dung với AI",
      "Tuần 3: làm video đơn giản và tăng năng suất học tập",
      "Tuần 4: làm một dự án nhỏ để vào hồ sơ cá nhân",
    ],
    recommendedPlan: "starter",
  },
];

export function getPersona(id: string): Persona | undefined {
  return personas.find((p) => p.id === id);
}
