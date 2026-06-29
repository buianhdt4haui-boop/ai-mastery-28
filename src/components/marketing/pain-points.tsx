import { Section, SectionHeading } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Compass, BatteryLow, Hourglass } from "lucide-react";

const pains = [
  {
    icon: Layers,
    title: "Quá nhiều công cụ",
    text: "Mỗi ngày lại có thêm công cụ AI mới. Bạn không biết nên dùng cái nào và bắt đầu từ đâu.",
  },
  {
    icon: Compass,
    title: "Không có lộ trình",
    text: "Xem video lẻ tẻ trên mạng nhưng kiến thức rời rạc, học xong vẫn không áp dụng được.",
  },
  {
    icon: BatteryLow,
    title: "Kết quả chưa tốt",
    text: "Đã thử dùng AI nhưng câu trả lời chung chung, hình ảnh xấu, nội dung nhạt nhẽo.",
  },
  {
    icon: Hourglass,
    title: "Không có thời gian",
    text: "Công việc bận rộn, không thể dành hàng giờ mỗi ngày để học một khóa dài dằng dặc.",
  },
];

export function PainPoints() {
  return (
    <Section id="pain">
      <SectionHeading
        eyebrow="Vấn đề"
        title="Người mới thường bị ngợp giữa 'rừng' công cụ AI"
        subtitle="Nếu bạn từng có những cảm giác dưới đây, bạn không hề đơn độc."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pains.map((pain) => (
          <Card key={pain.title} className="border-white/10 bg-card/50">
            <CardContent className="flex flex-col gap-3 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
                <pain.icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">{pain.title}</h3>
              <p className="text-sm text-muted-foreground">{pain.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
