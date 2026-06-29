/**
 * Thông tin đơn vị phát triển hiển thị ở mục "Về chúng tôi" trên landing.
 * Đặt `enabled: false` để ẩn mục này.
 * Ảnh/logo: đặt file vào thư mục `public/` rồi điền đường dẫn, vd "/logo.png".
 */
export interface InstructorSocial {
  label: string;
  href: string;
}

export interface Instructor {
  enabled: boolean;
  /** Nhãn hiển thị của section (vd "Về chúng tôi" / "Về giảng viên"). */
  sectionLabel: string;
  name: string;
  title: string;
  /** Đường dẫn ảnh/logo trong public/ (để trống sẽ hiển thị logo thương hiệu). */
  photo: string;
  bio: string;
  /** Vài điểm nổi bật / lý do chọn (trung thực, không phóng đại). */
  highlights: string[];
  /** Câu quote thương hiệu (tùy chọn). */
  quote?: string;
  socials: InstructorSocial[];
}

export const instructor: Instructor = {
  enabled: true,
  sectionLabel: "Về chúng tôi",
  name: "ROAS Lab Ads Academy",
  title:
    "Đội ngũ nghiên cứu & đào tạo AI thực chiến cho content, marketing, bán hàng và kinh doanh số.",
  photo: "",
  bio: "AI Mastery 28 Ngày được phát triển bởi ROAS Lab Ads Academy. Thay vì dạy AI nặng lý thuyết hay liệt kê hàng trăm công cụ khiến người mới bị ngợp, chúng tôi chọn ra những kỹ năng AI quan trọng nhất và sắp xếp thành lộ trình 28 ngày dễ học, dễ làm, dễ áp dụng cho người Việt.",
  highlights: [
    "Không dạy lan man công cụ — bắt đầu từ vấn đề cần giải quyết rồi mới chọn công cụ phù hợp",
    "Lộ trình rõ ràng cho người mới: mỗi ngày biết học gì, làm gì, ra kết quả gì",
    "Học để ứng dụng thật: content, hình ảnh, video, nghiên cứu khách hàng, marketing, sản phẩm số",
    "Thiết kế cho thị trường Việt Nam, không cần biết code",
  ],
  quote:
    "Chúng tôi tin AI không thay thế con người — AI khuếch đại năng lực của những người biết đặt câu hỏi đúng và dùng công cụ đúng cách.",
  socials: [],
};
