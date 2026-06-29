export interface FinalTestQuestion {
  id: string;
  question: string;
  options: string[];
  /** Index của đáp án đúng trong mảng options. */
  correct: number;
  explanation: string;
}

/** Tỉ lệ đúng tối thiểu để đạt (pass). */
export const PASS_RATIO = 0.7;

export const finalTestQuestions: FinalTestQuestion[] = [
  {
    id: "q1",
    question: "Cấu trúc prompt R-T-C-F bao gồm những thành phần nào?",
    options: [
      "Result – Time – Cost – Format",
      "Role – Task – Context – Format",
      "Read – Think – Create – Finish",
      "Reason – Test – Compare – Fix",
    ],
    correct: 1,
    explanation:
      "R-T-C-F là Role (vai trò) – Task (nhiệm vụ) – Context (ngữ cảnh) – Format (định dạng đầu ra).",
  },
  {
    id: "q2",
    question: "'Ảo giác' (hallucination) của AI nghĩa là gì?",
    options: [
      "AI từ chối trả lời",
      "AI trả lời bằng hình ảnh",
      "AI đưa ra thông tin nghe hợp lý nhưng sai sự thật",
      "AI trả lời quá chậm",
    ],
    correct: 2,
    explanation:
      "Hallucination là khi AI tạo ra thông tin nghe có vẻ đúng nhưng thực chất sai — vì vậy cần kiểm chứng.",
  },
  {
    id: "q3",
    question: "Để AI viết đúng giọng thương hiệu, cách hiệu quả nhất là?",
    options: [
      "Yêu cầu 'viết hay vào'",
      "Cung cấp ví dụ mẫu và mô tả tông giọng cụ thể",
      "Viết prompt thật dài",
      "Dùng nhiều dấu chấm than",
    ],
    correct: 1,
    explanation:
      "Cung cấp ví dụ mẫu + mô tả tông giọng (style guide) giúp AI bắt chước phong cách nhất quán.",
  },
  {
    id: "q4",
    question: "Khi tạo hình ảnh bằng AI, yếu tố nào nên có trong prompt?",
    options: [
      "Chỉ tên chủ thể",
      "Chủ thể, phong cách, ánh sáng, bố cục",
      "Chỉ màu sắc",
      "Số điện thoại",
    ],
    correct: 1,
    explanation:
      "Một prompt hình ảnh tốt mô tả chủ thể, phong cách, ánh sáng, bố cục và tỉ lệ.",
  },
  {
    id: "q5",
    question: "Trong tự động hóa, mô hình cơ bản 'trigger – action' nghĩa là?",
    options: [
      "Một sự kiện kích hoạt một hành động tự động",
      "Hai người cùng làm một việc",
      "Một loại quảng cáo",
      "Một công cụ tạo video",
    ],
    correct: 0,
    explanation:
      "Tự động hóa hoạt động theo nguyên tắc: khi có 'trigger' (sự kiện) thì thực hiện 'action' (hành động).",
  },
  {
    id: "q6",
    question: "Hook trong video ngắn có vai trò gì?",
    options: [
      "Kết thúc video",
      "Giữ chân người xem trong vài giây đầu",
      "Thêm nhạc nền",
      "Chèn logo",
    ],
    correct: 1,
    explanation: "Hook là phần mở đầu, nhiệm vụ là giữ chân người xem ngay trong 3 giây đầu.",
  },
  {
    id: "q7",
    question: "Một trang đích (landing page) thuyết phục thường có cấu trúc nào?",
    options: [
      "Chỉ một nút mua hàng",
      "Hook – vấn đề – giải pháp – lợi ích – bằng chứng – kêu gọi hành động",
      "Một đoạn văn dài duy nhất",
      "Chỉ hình ảnh",
    ],
    correct: 1,
    explanation:
      "Trang đích hiệu quả dẫn dắt từ hook → vấn đề → giải pháp → lợi ích → bằng chứng → CTA.",
  },
  {
    id: "q8",
    question: "Khi dùng công cụ tìm kiếm AI để nghiên cứu, bạn nên làm gì?",
    options: [
      "Tin tuyệt đối mọi câu trả lời",
      "Kiểm chứng thông tin qua nguồn tham khảo",
      "Bỏ qua nguồn",
      "Chỉ dùng cho giải trí",
    ],
    correct: 1,
    explanation: "Luôn kiểm chứng thông tin và xem nguồn tham khảo để tránh dùng dữ liệu sai.",
  },
  {
    id: "q9",
    question: "Lợi ích chính của việc tạo một 'trợ lý AI tùy chỉnh' là gì?",
    options: [
      "Để khoe với bạn bè",
      "Tái sử dụng hướng dẫn, kiến thức và giọng văn riêng cho công việc lặp lại",
      "Làm AI chạy nhanh hơn",
      "Thay thế hoàn toàn con người",
    ],
    correct: 1,
    explanation:
      "Trợ lý AI tùy chỉnh giúp bạn đóng gói hướng dẫn/kiến thức/giọng văn để tái sử dụng mỗi ngày.",
  },
  {
    id: "q10",
    question: "Quan điểm đúng đắn về kết quả khi học và dùng AI là gì?",
    options: [
      "AI đảm bảo chắc chắn giúp bạn giàu",
      "Kết quả phụ thuộc vào nỗ lực, lĩnh vực và cách áp dụng của mỗi người",
      "Chỉ cần xem là giỏi",
      "Không cần thực hành",
    ],
    correct: 1,
    explanation:
      "AI là công cụ hỗ trợ; kết quả thực tế phụ thuộc vào nỗ lực và cách bạn áp dụng — không có đảm bảo.",
  },
];
