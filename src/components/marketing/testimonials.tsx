import { Section, SectionHeading } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials, testimonialsAreReal } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-card/30">
      <SectionHeading
        eyebrow="Cảm nhận"
        title="Trải nghiệm học viên"
        subtitle={
          testimonialsAreReal
            ? "Cảm nhận từ những người đã và đang học."
            : "Nội dung dưới đây là ví dụ minh họa cho định dạng đánh giá, sẽ được thay bằng cảm nhận thật khi khóa học chính thức mở."
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {testimonials.map((t) => (
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
      {!testimonialsAreReal && (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          * Nội dung minh họa, không phải đánh giá thật của người dùng.
        </p>
      )}
    </Section>
  );
}
