/**
 * Thông tin giảng viên hiển thị ở mục "Về giảng viên" trên landing.
 *
 * 👉 CÁCH BẬT: điền thông tin THẬT bên dưới rồi đặt `enabled: true`.
 *    Khi `enabled: false`, mục này KHÔNG hiển thị (tránh đăng thông tin chưa thật).
 *    Ảnh: đặt file vào thư mục `public/` rồi điền đường dẫn, vd "/instructor.jpg".
 */
export interface InstructorSocial {
  label: string;
  href: string;
}

export interface Instructor {
  enabled: boolean;
  name: string;
  title: string;
  /** Đường dẫn ảnh trong public/ (để trống sẽ hiển thị avatar chữ cái). */
  photo: string;
  bio: string;
  /** Vài điểm nổi bật / năng lực (3–4 ý, trung thực, không phóng đại). */
  highlights: string[];
  socials: InstructorSocial[];
}

export const instructor: Instructor = {
  enabled: false,
  name: "[Tên của bạn / thương hiệu]",
  title: "Người sáng lập & giảng viên — AI Mastery 28 Ngày",
  photo: "",
  bio: "Viết 2–3 câu: bạn là ai, đã ứng dụng AI vào công việc/lĩnh vực nào, và vì sao bạn tạo ra lộ trình 28 ngày này cho người Việt.",
  highlights: [
    "Kinh nghiệm ứng dụng AI vào công việc thực tế",
    "Đồng hành với người mới bắt đầu, giải thích dễ hiểu",
    "Tập trung vào kết quả thực chiến, áp dụng được ngay",
  ],
  socials: [],
};
