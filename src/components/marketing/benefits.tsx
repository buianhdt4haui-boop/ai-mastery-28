import { Section, SectionHeading } from "@/components/layout/section";
import { Zap, PenLine, Image as ImageIcon, Video, Bot, Package } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Tiết kiệm thời gian mỗi ngày",
    text: "Để AI lo phần nháp email, tài liệu và việc lặp lại — bạn dành thời gian cho việc quan trọng hơn.",
  },
  {
    icon: PenLine,
    title: "Viết nội dung nhanh và đều hơn",
    text: "Tạo content đúng giọng thương hiệu, đúng nền tảng, đỡ tốn công nghĩ ý từ đầu mỗi lần.",
  },
  {
    icon: ImageIcon,
    title: "Tự tạo hình ảnh chỉn chu",
    text: "Làm visual, ảnh sản phẩm và thiết kế gọn gàng mà không cần biết Photoshop.",
  },
  {
    icon: Video,
    title: "Làm video kể cả khi ngại lên hình",
    text: "Từ kịch bản, giọng đọc đến dựng video ngắn — làm được với sự hỗ trợ của AI.",
  },
  {
    icon: Bot,
    title: "Tự động hóa việc lặp lại",
    text: "Dựng vài luồng tự động đơn giản để bớt các thao tác thủ công mỗi ngày.",
  },
  {
    icon: Package,
    title: "Tạo sản phẩm số đầu tiên",
    text: "Đóng gói kiến thức của bạn thành một sản phẩm số hoàn chỉnh để chia sẻ hoặc kinh doanh.",
  },
];

export function Benefits() {
  return (
    <Section id="benefits" className="bg-card/30">
      <SectionHeading
        eyebrow="Bạn sẽ nhận được gì"
        title="Những kỹ năng dùng được ngay"
        subtitle="Mỗi kỹ năng đều đi kèm bài thực hành để bạn áp dụng vào công việc thật."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group rounded-2xl border border-white/10 bg-card/40 p-6 transition-colors hover:border-primary/40"
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
              <b.icon className="h-5 w-5" />
            </span>
            <h3 className="mb-2 font-semibold">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
