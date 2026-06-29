import { Section, SectionHeading } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";

/**
 * LƯU Ý COMPLIANCE: đây là nội dung minh họa (placeholder), KHÔNG phải
 * đánh giá thật của học viên. Được gắn nhãn rõ ràng để tránh gây hiểu nhầm.
 * Thay bằng review thật (có sự đồng ý) trước khi go-live.
 */
const placeholders = [
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

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-card/30">
      <SectionHeading
        eyebrow="Cảm nhận"
        title="Trải nghiệm học viên"
        subtitle="Nội dung dưới đây là ví dụ minh họa cho định dạng đánh giá, sẽ được thay bằng cảm nhận thật khi khóa học chính thức mở."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {placeholders.map((t) => (
          <Card key={t.name} className="border-white/10 bg-card/50">
            <CardContent className="flex flex-col gap-4 p-6">
              <p className="text-sm text-muted-foreground">“{t.quote}”</p>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        * Nội dung minh họa, không phải đánh giá thật của người dùng.
      </p>
    </Section>
  );
}
