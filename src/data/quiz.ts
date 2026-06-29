import type { QuizQuestion } from "@/types";

/** Bộ câu hỏi quiz cá nhân hóa (14 câu). Câu đầu (role) quyết định persona chính. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "role",
    question: "Bạn đang là ai?",
    helper: "Chọn vai trò gần nhất với bạn hiện tại.",
    type: "single",
    options: [
      { value: "seller", label: "Chủ shop / Bán hàng online", emoji: "🛍️" },
      { value: "marketer", label: "Marketer", emoji: "📈" },
      { value: "creator", label: "Content creator", emoji: "🎬" },
      { value: "freelancer", label: "Freelancer", emoji: "💼" },
      { value: "office", label: "Nhân viên văn phòng", emoji: "🧑‍💻" },
      { value: "student", label: "Sinh viên", emoji: "🎓" },
    ],
  },
  {
    id: "goal",
    question: "Mục tiêu chính của bạn với AI là gì?",
    type: "single",
    options: [
      { value: "productivity", label: "Tăng năng suất công việc", emoji: "⚡" },
      { value: "video", label: "Làm video", emoji: "🎥" },
      { value: "sales", label: "Bán hàng tốt hơn", emoji: "💰" },
      { value: "ads", label: "Chạy quảng cáo / marketing", emoji: "📣" },
      { value: "automation", label: "Tự động hóa việc lặp lại", emoji: "🤖" },
      { value: "income", label: "Kiếm thêm thu nhập", emoji: "🌱" },
    ],
  },
  {
    id: "level",
    question: "Trình độ AI hiện tại của bạn?",
    type: "single",
    options: [
      { value: "beginner", label: "Mới hoàn toàn, chưa dùng bao giờ", emoji: "🐣" },
      { value: "basic", label: "Đã thử vài lần cho vui", emoji: "🙂" },
      { value: "intermediate", label: "Dùng khá thường xuyên", emoji: "🚀" },
    ],
  },
  {
    id: "tools_used",
    question: "Bạn đã từng dùng công cụ nào?",
    helper: "Có thể chọn nhiều.",
    type: "multi",
    options: [
      { value: "chatgpt", label: "ChatGPT / Gemini", emoji: "💬" },
      { value: "image", label: "Tạo ảnh AI (Midjourney, Canva...)", emoji: "🎨" },
      { value: "video", label: "Công cụ video AI (CapCut...)", emoji: "🎞️" },
      { value: "automation", label: "Tự động hóa (Zapier, Make...)", emoji: "🔗" },
      { value: "none", label: "Chưa dùng công cụ nào", emoji: "🆕" },
    ],
  },
  {
    id: "time_per_day",
    question: "Mỗi ngày bạn dành được bao nhiêu thời gian để học?",
    type: "single",
    options: [
      { value: "15", label: "Khoảng 15 phút", emoji: "⏱️" },
      { value: "30", label: "Khoảng 30 phút", emoji: "⏰" },
      { value: "60", label: "Từ 1 tiếng trở lên", emoji: "🔥" },
    ],
  },
  {
    id: "show_face",
    question: "Bạn có muốn lộ mặt khi làm video không?",
    type: "single",
    options: [
      { value: "yes", label: "Có, tôi sẵn sàng lên hình", emoji: "😄" },
      { value: "no", label: "Không, tôi muốn ẩn danh", emoji: "🥷" },
      { value: "unsure", label: "Chưa chắc / Không làm video", emoji: "🤔" },
    ],
  },
  {
    id: "field",
    question: "Bạn muốn ứng dụng AI cho lĩnh vực nào?",
    helper: "Có thể chọn nhiều.",
    type: "multi",
    options: [
      { value: "marketing", label: "Marketing", emoji: "📊" },
      { value: "sales", label: "Bán hàng / TMĐT", emoji: "🛒" },
      { value: "creative", label: "Sáng tạo nội dung", emoji: "✨" },
      { value: "education", label: "Học tập / Giảng dạy", emoji: "📚" },
      { value: "office", label: "Công việc văn phòng", emoji: "🗂️" },
    ],
  },
  {
    id: "struggle",
    question: "Khó khăn lớn nhất của bạn với AI là gì?",
    type: "single",
    options: [
      { value: "overwhelmed", label: "Quá nhiều công cụ, không biết chọn gì", emoji: "😵" },
      { value: "dont_know_start", label: "Không biết bắt đầu từ đâu", emoji: "🧭" },
      { value: "quality", label: "Dùng rồi nhưng kết quả chưa tốt", emoji: "🪫" },
      { value: "no_time", label: "Không có thời gian học bài bản", emoji: "⌛" },
    ],
  },
  {
    id: "learning_style",
    question: "Bạn thích học theo cách nào?",
    type: "single",
    options: [
      { value: "step_by_step", label: "Hướng dẫn từng bước rõ ràng", emoji: "🪜" },
      { value: "examples", label: "Học qua ví dụ mẫu có sẵn", emoji: "📋" },
      { value: "practice", label: "Vừa học vừa làm bài tập", emoji: "🛠️" },
    ],
  },
  {
    id: "output",
    question: "Sau khóa học bạn muốn có được gì?",
    type: "single",
    options: [
      { value: "content", label: "Sản xuất nội dung đều và nhanh", emoji: "📝" },
      { value: "product", label: "Một sản phẩm số đầu tiên", emoji: "📦" },
      { value: "service", label: "Kỹ năng để nhận việc / dịch vụ", emoji: "🤝" },
      { value: "skill", label: "Nền tảng AI vững để dùng lâu dài", emoji: "🧠" },
    ],
  },
  {
    id: "consistency",
    question: "Bạn dự định học với nhịp độ nào?",
    type: "single",
    options: [
      { value: "daily", label: "Đều đặn mỗi ngày", emoji: "📅" },
      { value: "few_times_week", label: "Vài buổi mỗi tuần", emoji: "🗓️" },
      { value: "weekend", label: "Tập trung vào cuối tuần", emoji: "🛋️" },
    ],
  },
  {
    id: "interest",
    question: "Bạn hứng thú nhất với mảng nào?",
    helper: "Có thể chọn nhiều.",
    type: "multi",
    options: [
      { value: "writing", label: "Viết & nội dung", emoji: "✍️" },
      { value: "image", label: "Hình ảnh & thiết kế", emoji: "🖼️" },
      { value: "video", label: "Video & âm thanh", emoji: "🎬" },
      { value: "automation", label: "Tự động hóa & dữ liệu", emoji: "⚙️" },
    ],
  },
  {
    id: "device",
    question: "Bạn sẽ học chủ yếu trên thiết bị nào?",
    type: "single",
    options: [
      { value: "phone", label: "Điện thoại", emoji: "📱" },
      { value: "laptop", label: "Máy tính / Laptop", emoji: "💻" },
      { value: "both", label: "Cả hai", emoji: "🔁" },
    ],
  },
  {
    id: "motivation",
    question: "Điều gì thúc đẩy bạn học AI lúc này?",
    type: "single",
    options: [
      { value: "career", label: "Phát triển sự nghiệp", emoji: "🚀" },
      { value: "business", label: "Phục vụ kinh doanh", emoji: "🏪" },
      { value: "side_income", label: "Tạo nguồn thu thêm", emoji: "💸" },
      { value: "curiosity", label: "Tò mò và muốn không bị tụt lại", emoji: "🔭" },
    ],
  },
];

export const totalQuizQuestions = quizQuestions.length;
