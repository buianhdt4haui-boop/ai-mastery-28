import { Section, SectionHeading } from "@/components/layout/section";
import { CheckCircle2 } from "lucide-react";
import { weekThemes } from "@/data/curriculum";

const solutionPoints = [
  "Lộ trình rõ ràng từng ngày, không phải tự mò mẫm",
  "Mỗi bài chỉ 15–20 phút, vừa với người bận rộn",
  "Học đến đâu thực hành đến đó với bài tập cụ thể",
  "Đi từ nền tảng đến sản phẩm số thực tế",
];

export function Solution() {
  return (
    <Section id="solution" className="bg-card/30">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Giải pháp"
            title="Một lộ trình 28 ngày có cấu trúc, dễ theo"
            subtitle="Thay vì học lan man, bạn đi theo một con đường được thiết kế sẵn — mỗi tuần một chủ đề, mỗi ngày một bước tiến."
            className="mb-8"
          />
          <ul className="space-y-3">
            {solutionPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4">
          {Object.entries(weekThemes).map(([week, theme]) => (
            <div
              key={week}
              className="glass flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-lg font-bold text-primary">
                T{week}
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Tuần {week}
                </p>
                <p className="font-medium">{theme}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
