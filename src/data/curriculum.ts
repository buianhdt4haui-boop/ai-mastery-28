import type { CurriculumDay } from "@/types";

/**
 * Seed dữ liệu 28 ngày học. Local-first để app chạy được ngay.
 * 4 tuần: (1) Nền tảng & prompting, (2) Content & hình ảnh,
 * (3) Video, năng suất & tự động hóa, (4) Marketing, bán hàng & sản phẩm số.
 */
export const weekThemes: Record<number, string> = {
  1: "Nền tảng AI & nghệ thuật ra lệnh (prompting)",
  2: "Sáng tạo nội dung & hình ảnh",
  3: "Video, năng suất & tự động hóa",
  4: "Marketing, bán hàng & sản phẩm số",
};

export const curriculum: CurriculumDay[] = [
  // ---- Tuần 1 ----
  {
    day: 1,
    week: 1,
    title: "Bức tranh toàn cảnh về AI hiện nay",
    tool: "Tổng quan",
    objective: "Hiểu AI tạo sinh là gì và có thể giúp gì cho công việc của bạn.",
    lessonSummary:
      "Phân biệt các loại công cụ AI (chat, hình ảnh, video, tự động hóa), cách chúng hoạt động ở mức cơ bản và bạn nên bắt đầu từ đâu để không bị ngợp.",
    assignment: "Liệt kê 3 đầu việc lặp lại trong tuần của bạn mà AI có thể hỗ trợ.",
    resourceName: "Bản đồ công cụ AI 2025 (PDF)",
    estimatedMinutes: 18,
  },
  {
    day: 2,
    week: 1,
    title: "Làm quen với trợ lý chat AI",
    tool: "ChatGPT / Gemini",
    objective: "Tạo tài khoản, làm quen giao diện và gửi prompt đầu tiên hiệu quả.",
    lessonSummary:
      "Cách đặt câu hỏi rõ ràng, cung cấp ngữ cảnh và yêu cầu định dạng đầu ra. Những lỗi phổ biến khiến AI trả lời chung chung.",
    assignment: "Dùng AI viết lại một email công việc của bạn theo 2 giọng văn khác nhau.",
    resourceName: "Checklist 'prompt rõ ràng' (PDF)",
    estimatedMinutes: 16,
  },
  {
    day: 3,
    week: 1,
    title: "Công thức prompt hiệu quả",
    tool: "Prompting",
    objective: "Nắm cấu trúc prompt: vai trò – nhiệm vụ – ngữ cảnh – định dạng.",
    lessonSummary:
      "Áp dụng công thức R-T-C-F để biến yêu cầu mơ hồ thành prompt cho kết quả chất lượng, ổn định và đúng ý.",
    assignment: "Viết 3 prompt theo công thức R-T-C-F cho 3 tình huống công việc của bạn.",
    resourceName: "Bộ 30 prompt mẫu theo ngành (PDF)",
    estimatedMinutes: 20,
  },
  {
    day: 4,
    week: 1,
    title: "AI làm trợ lý tư duy",
    tool: "ChatGPT",
    objective: "Dùng AI để brainstorm, phản biện và ra quyết định nhanh hơn.",
    lessonSummary:
      "Kỹ thuật yêu cầu AI đóng nhiều vai, đặt câu hỏi ngược và đưa ra các góc nhìn đối lập để bạn suy nghĩ sâu hơn.",
    assignment: "Nhờ AI phản biện một kế hoạch bạn đang ấp ủ và ghi lại 3 insight.",
    resourceName: "Khung tư duy 'AI phản biện' (PDF)",
    estimatedMinutes: 17,
  },
  {
    day: 5,
    week: 1,
    title: "Tóm tắt & xử lý tài liệu dài",
    tool: "ChatGPT / NotebookLM",
    objective: "Biến tài liệu, bài báo dài thành bản tóm tắt dùng được ngay.",
    lessonSummary:
      "Cách đưa văn bản vào AI, yêu cầu tóm tắt theo nhiều cấp độ, trích xuất ý chính và lập danh sách hành động.",
    assignment: "Tóm tắt một tài liệu công việc thành 5 gạch đầu dòng và 3 việc cần làm.",
    resourceName: "Mẫu prompt tóm tắt tài liệu (PDF)",
    estimatedMinutes: 16,
  },
  {
    day: 6,
    week: 1,
    title: "AI hỗ trợ học và tra cứu",
    tool: "Perplexity",
    objective: "Tìm kiếm có trích nguồn và học kiến thức mới nhanh hơn.",
    lessonSummary:
      "Khác biệt giữa chat AI và công cụ tìm kiếm AI; cách kiểm chứng thông tin và tránh 'ảo giác' (hallucination).",
    assignment: "Dùng công cụ tìm kiếm AI nghiên cứu 1 chủ đề và ghi lại nguồn tham khảo.",
    resourceName: "Checklist kiểm chứng thông tin AI (PDF)",
    estimatedMinutes: 15,
  },
  {
    day: 7,
    week: 1,
    title: "Tổng kết tuần 1 & xây thói quen",
    tool: "Ôn tập",
    objective: "Hệ thống lại kiến thức và thiết lập thói quen dùng AI mỗi ngày.",
    lessonSummary:
      "Nhìn lại những gì đã học, xây 'thư viện prompt' cá nhân và lên kế hoạch áp dụng AI vào công việc thật.",
    assignment: "Tạo file thư viện prompt cá nhân với ít nhất 10 prompt yêu thích.",
    resourceName: "Template thư viện prompt (Notion/PDF)",
    estimatedMinutes: 18,
  },

  // ---- Tuần 2 ----
  {
    day: 8,
    week: 2,
    title: "Viết content nhanh với AI",
    tool: "ChatGPT",
    objective: "Sản xuất nội dung mạng xã hội đúng giọng thương hiệu.",
    lessonSummary:
      "Quy trình từ ý tưởng đến bài đăng: xác định đối tượng, chọn góc nhìn, viết nháp và biên tập lại cho tự nhiên.",
    assignment: "Viết 5 caption cho một sản phẩm/dịch vụ bạn chọn.",
    resourceName: "Bộ khung content 7 ngày (PDF)",
    estimatedMinutes: 18,
  },
  {
    day: 9,
    week: 2,
    title: "Xây giọng văn thương hiệu",
    tool: "Prompting",
    objective: "Huấn luyện AI viết đúng phong cách của bạn/thương hiệu.",
    lessonSummary:
      "Cách mô tả tông giọng, cung cấp ví dụ mẫu và tạo 'style guide' để mọi nội dung nhất quán.",
    assignment: "Tạo một style guide giọng văn và yêu cầu AI viết thử 2 đoạn theo đó.",
    resourceName: "Template style guide thương hiệu (PDF)",
    estimatedMinutes: 17,
  },
  {
    day: 10,
    week: 2,
    title: "Viết bài chuẩn SEO căn bản",
    tool: "ChatGPT",
    objective: "Lên dàn ý và viết bài blog thân thiện với tìm kiếm.",
    lessonSummary:
      "Nghiên cứu từ khóa cơ bản, xây dàn ý theo ý định tìm kiếm và biên tập để bài đọc tự nhiên, không 'máy móc'.",
    assignment: "Viết dàn ý + đoạn mở đầu cho 1 bài blog theo chủ đề bạn chọn.",
    resourceName: "Template dàn ý bài SEO (PDF)",
    estimatedMinutes: 20,
  },
  {
    day: 11,
    week: 2,
    title: "Tạo hình ảnh bằng AI",
    tool: "Midjourney / Ideogram",
    objective: "Tạo hình minh họa, ảnh sản phẩm và visual mạng xã hội.",
    lessonSummary:
      "Cấu trúc prompt hình ảnh: chủ thể, phong cách, ánh sáng, bố cục, tỉ lệ. Cách lặp để ra đúng ý.",
    assignment: "Tạo 3 hình ảnh cho thương hiệu của bạn với phong cách nhất quán.",
    resourceName: "Bộ prompt hình ảnh theo phong cách (PDF)",
    estimatedMinutes: 19,
  },
  {
    day: 12,
    week: 2,
    title: "Thiết kế nhanh với AI",
    tool: "Canva AI",
    objective: "Tạo ấn phẩm (post, banner, slide) đẹp mà không cần biết design.",
    lessonSummary:
      "Dùng các tính năng AI trong công cụ thiết kế: tạo nội dung, đổi nền, mở rộng ảnh và áp template thương hiệu.",
    assignment: "Thiết kế 1 bộ 3 post mạng xã hội đồng bộ màu sắc.",
    resourceName: "Bộ template thiết kế cơ bản (link)",
    estimatedMinutes: 18,
  },
  {
    day: 13,
    week: 2,
    title: "Biên tập & nâng cấp nội dung",
    tool: "ChatGPT",
    objective: "Dùng AI như một biên tập viên để nội dung sắc và rõ hơn.",
    lessonSummary:
      "Kỹ thuật yêu cầu AI rút gọn, làm rõ, đổi giọng, kiểm tra lỗi và đề xuất tiêu đề hấp dẫn.",
    assignment: "Đưa 1 bài viết cũ cho AI biên tập và so sánh trước/sau.",
    resourceName: "Checklist biên tập nội dung (PDF)",
    estimatedMinutes: 16,
  },
  {
    day: 14,
    week: 2,
    title: "Tổng kết tuần 2 & bộ sưu tập nội dung",
    tool: "Ôn tập",
    objective: "Gom toàn bộ kỹ năng content thành quy trình lặp lại được.",
    lessonSummary:
      "Xây quy trình sản xuất nội dung cá nhân từ ý tưởng đến đăng tải, kèm bộ tài sản (prompt, template) của riêng bạn.",
    assignment: "Lập kế hoạch nội dung 1 tuần (7 bài) bằng quy trình đã học.",
    resourceName: "Template kế hoạch nội dung tuần (PDF)",
    estimatedMinutes: 18,
  },

  // ---- Tuần 3 ----
  {
    day: 15,
    week: 3,
    title: "Viết kịch bản video ngắn",
    tool: "ChatGPT",
    objective: "Viết kịch bản hook – nội dung – CTA cho video ngắn.",
    lessonSummary:
      "Công thức kịch bản giữ chân người xem, cách tạo hook trong 3 giây đầu và lời kêu gọi hành động tự nhiên.",
    assignment: "Viết 3 kịch bản video ngắn (dưới 60 giây) cho chủ đề của bạn.",
    resourceName: "Bộ 20 mẫu hook video (PDF)",
    estimatedMinutes: 18,
  },
  {
    day: 16,
    week: 3,
    title: "Giọng đọc & lồng tiếng AI",
    tool: "ElevenLabs",
    objective: "Tạo giọng đọc tự nhiên cho video không cần lộ mặt.",
    lessonSummary:
      "Cách chọn giọng, điều chỉnh tốc độ – ngữ điệu và xuất file âm thanh để ghép vào video.",
    assignment: "Tạo 1 đoạn voiceover 30 giây từ kịch bản đã viết ở ngày 15.",
    resourceName: "Hướng dẫn voiceover không lộ mặt (PDF)",
    estimatedMinutes: 17,
  },
  {
    day: 17,
    week: 3,
    title: "Dựng video bằng AI",
    tool: "CapCut AI",
    objective: "Dựng video ngắn nhanh với phụ đề và hiệu ứng tự động.",
    lessonSummary:
      "Quy trình dựng cơ bản: cắt ghép, tạo phụ đề tự động, thêm nhạc và chuyển cảnh để video chỉn chu.",
    assignment: "Dựng hoàn chỉnh 1 video ngắn từ kịch bản + voiceover đã có.",
    resourceName: "Checklist dựng video ngắn (PDF)",
    estimatedMinutes: 20,
  },
  {
    day: 18,
    week: 3,
    title: "Tự động hóa việc lặp lại",
    tool: "Zapier / Make",
    objective: "Hiểu khái niệm tự động hóa và dựng luồng đơn giản đầu tiên.",
    lessonSummary:
      "Tư duy 'trigger – action', các tình huống tự động hóa phổ biến (lưu lead, gửi email, nhắc việc) cho người không code.",
    assignment: "Phác thảo 1 luồng tự động hóa giải quyết một việc lặp của bạn.",
    resourceName: "Bộ 10 luồng tự động hóa mẫu (PDF)",
    estimatedMinutes: 19,
  },
  {
    day: 19,
    week: 3,
    title: "Bảng tính thông minh với AI",
    tool: "Google Sheets AI",
    objective: "Dùng AI để xử lý, phân loại và phân tích dữ liệu nhanh.",
    lessonSummary:
      "Tạo công thức bằng ngôn ngữ tự nhiên, phân loại dữ liệu, tóm tắt bảng số liệu và rút ra nhận định.",
    assignment: "Dùng AI phân tích 1 bảng dữ liệu nhỏ và rút ra 3 nhận định.",
    resourceName: "Template bảng tính + prompt (link)",
    estimatedMinutes: 17,
  },
  {
    day: 20,
    week: 3,
    title: "Trợ lý AI cho công việc hàng ngày",
    tool: "ChatGPT / Notion AI",
    objective: "Xây quy trình dùng AI cho email, họp và quản lý công việc.",
    lessonSummary:
      "Soạn email nhanh, tóm tắt biên bản họp, lập kế hoạch ngày và quản lý đầu việc với sự hỗ trợ của AI.",
    assignment: "Thiết lập 1 quy trình AI cho 1 đầu việc hàng ngày của bạn.",
    resourceName: "Bộ prompt năng suất văn phòng (PDF)",
    estimatedMinutes: 16,
  },
  {
    day: 21,
    week: 3,
    title: "Tổng kết tuần 3 & hệ thống cá nhân",
    tool: "Ôn tập",
    objective: "Kết hợp video, tự động hóa và năng suất thành hệ thống.",
    lessonSummary:
      "Nhìn lại các công cụ đã học và ghép chúng thành một 'hệ điều hành cá nhân' giúp bạn làm việc nhẹ nhàng hơn.",
    assignment: "Vẽ sơ đồ hệ thống công cụ AI bạn sẽ dùng thường xuyên.",
    resourceName: "Template sơ đồ hệ thống AI cá nhân (PDF)",
    estimatedMinutes: 18,
  },

  // ---- Tuần 4 ----
  {
    day: 22,
    week: 4,
    title: "Nghiên cứu thị trường & khách hàng",
    tool: "ChatGPT / Perplexity",
    objective: "Dùng AI để hiểu khách hàng và xác định cơ hội.",
    lessonSummary:
      "Xây chân dung khách hàng, tìm 'nỗi đau' và kiểm tra nhu cầu trước khi làm sản phẩm hay chiến dịch.",
    assignment: "Tạo 1 chân dung khách hàng chi tiết cho sản phẩm/dịch vụ của bạn.",
    resourceName: "Template chân dung khách hàng (PDF)",
    estimatedMinutes: 19,
  },
  {
    day: 23,
    week: 4,
    title: "Phễu bán hàng & trang đích",
    tool: "ChatGPT",
    objective: "Viết nội dung trang bán hàng theo cấu trúc thuyết phục.",
    lessonSummary:
      "Cấu trúc một trang đích: hook, vấn đề, giải pháp, lợi ích, bằng chứng, lời kêu gọi — và cách viết trung thực.",
    assignment: "Viết bản nháp nội dung 1 trang đích cho sản phẩm của bạn.",
    resourceName: "Khung copywriting trang đích (PDF)",
    estimatedMinutes: 20,
  },
  {
    day: 24,
    week: 4,
    title: "Quảng cáo & nội dung chuyển đổi",
    tool: "ChatGPT",
    objective: "Viết nhiều biến thể quảng cáo để thử nghiệm.",
    lessonSummary:
      "Tạo nhanh biến thể tiêu đề, mô tả và góc tiếp cận khác nhau; nguyên tắc thử nghiệm A/B cơ bản.",
    assignment: "Viết 5 biến thể quảng cáo cho cùng 1 sản phẩm.",
    resourceName: "Bộ khung mẫu quảng cáo (PDF)",
    estimatedMinutes: 17,
  },
  {
    day: 25,
    week: 4,
    title: "Email marketing với AI",
    tool: "ChatGPT",
    objective: "Soạn chuỗi email chăm sóc và bán hàng.",
    lessonSummary:
      "Lên ý tưởng chuỗi email, viết tiêu đề mở được, nội dung giá trị và lời mời hành động nhẹ nhàng.",
    assignment: "Viết chuỗi 3 email chào mừng cho khách hàng mới.",
    resourceName: "Template chuỗi email chào mừng (PDF)",
    estimatedMinutes: 18,
  },
  {
    day: 26,
    week: 4,
    title: "Xây sản phẩm số đầu tiên",
    tool: "ChatGPT / Canva",
    objective: "Lên ý tưởng và đóng gói một sản phẩm số đơn giản.",
    lessonSummary:
      "Chọn dạng sản phẩm (ebook, template, mini-course), phác thảo nội dung và đóng gói để có thể chia sẻ/bán.",
    assignment: "Phác thảo cấu trúc 1 sản phẩm số bạn có thể tạo trong tuần tới.",
    resourceName: "Template kế hoạch sản phẩm số (PDF)",
    estimatedMinutes: 20,
  },
  {
    day: 27,
    week: 4,
    title: "Xây 'trợ lý AI' riêng",
    tool: "Custom GPT",
    objective: "Tạo một trợ lý AI tùy chỉnh cho công việc của bạn.",
    lessonSummary:
      "Cách cấu hình một trợ lý chuyên biệt với hướng dẫn, kiến thức và giọng văn riêng để tái sử dụng mỗi ngày.",
    assignment: "Tạo 1 trợ lý AI tùy chỉnh phục vụ một nhiệm vụ cụ thể của bạn.",
    resourceName: "Hướng dẫn cấu hình trợ lý AI (PDF)",
    estimatedMinutes: 19,
  },
  {
    day: 28,
    week: 4,
    title: "Dự án tổng kết & bước tiếp theo",
    tool: "Capstone",
    objective: "Hoàn thiện một sản phẩm thực tế và lập kế hoạch dài hạn.",
    lessonSummary:
      "Tổng hợp mọi kỹ năng vào 1 dự án nhỏ trọn vẹn, tự đánh giá và vạch lộ trình tiếp tục phát triển cùng AI.",
    assignment: "Hoàn thành và nộp dự án tổng kết của bạn, sau đó làm bài kiểm tra cuối khóa.",
    resourceName: "Bộ checklist dự án tổng kết (PDF)",
    estimatedMinutes: 20,
  },
];

export const totalEstimatedMinutes = curriculum.reduce(
  (sum, d) => sum + d.estimatedMinutes,
  0,
);

export function getDay(day: number): CurriculumDay | undefined {
  return curriculum.find((d) => d.day === day);
}
