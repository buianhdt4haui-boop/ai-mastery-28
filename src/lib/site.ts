/**
 * Central brand & site configuration for AI Mastery 28 Ngày.
 * Keep all marketing-facing copy/constants here so pages stay consistent.
 */
export const siteConfig = {
  name: "AI Mastery 28 Ngày",
  tagline: "Làm chủ công cụ AI trong 28 ngày",
  description:
    "Khóa học AI tổng hợp cho người Việt: mỗi ngày 15–20 phút để dùng thành thạo các công cụ AI phổ biến phục vụ công việc, content, marketing và sản phẩm số.",
  bigPromise:
    "Mỗi ngày 15–20 phút, bạn nắm được cách dùng các công cụ AI phổ biến để làm việc nhanh hơn, tạo nội dung tốt hơn, tự động hóa việc lặp lại và xây sản phẩm số đầu tiên.",
  totalDays: 28,
  minutesPerDay: "15–20 phút",
  /** Disclaimer dùng xuyên suốt để đảm bảo compliance, không hứa hẹn quá mức. */
  disclaimer:
    "Kết quả học tập phụ thuộc vào nỗ lực và bối cảnh của từng người. Khóa học cung cấp kiến thức và công cụ thực hành, không cam kết hay đảm bảo về thu nhập. Đây không phải chứng chỉ nghề nghiệp hoặc chứng chỉ do cơ quan nhà nước công nhận.",
  contactEmail: "hotro@aimastery28.vn",
  /** Thông tin chuyển khoản thủ công (mock — thay bằng số thật khi go-live). */
  bankTransfer: {
    bankName: "Vietcombank",
    accountName: "CONG TY AI MASTERY",
    accountNumber: "0123456789",
    branch: "Chi nhánh Hà Nội",
  },
} as const;

export const mainNav = [
  { label: "Khóa học", href: "/#curriculum" },
  { label: "Học phí", href: "/#pricing" },
  { label: "Câu hỏi", href: "/#faq" },
] as const;
