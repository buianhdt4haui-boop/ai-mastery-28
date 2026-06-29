import { Section, SectionHeading } from "@/components/layout/section";
import { Gift, FileText, ListChecks, LayoutTemplate, Dumbbell } from "lucide-react";

const bonuses = [
  {
    icon: FileText,
    title: "Bộ prompt mẫu",
    text: "Hàng chục prompt đã được tinh chỉnh theo từng tình huống và ngành nghề.",
  },
  {
    icon: ListChecks,
    title: "Checklist thực hành",
    text: "Checklist từng bước để bạn không bỏ sót khi áp dụng vào công việc.",
  },
  {
    icon: LayoutTemplate,
    title: "Template nội dung",
    text: "Khung sườn cho content, kịch bản, email và trang bán hàng — chỉ việc điền.",
  },
  {
    icon: Dumbbell,
    title: "Bài tập thực chiến",
    text: "Mỗi ngày một bài tập nhỏ giúp biến kiến thức thành kỹ năng thật.",
  },
];

export function Bonus() {
  return (
    <Section id="bonus">
      <div className="glass overflow-hidden rounded-3xl p-8 sm:p-12">
        <SectionHeading
          eyebrow="Tài nguyên đi kèm"
          title={
            <span className="inline-flex items-center gap-3">
              <Gift className="h-7 w-7 text-primary" /> Không chỉ là bài học
            </span>
          }
          subtitle="Bạn nhận thêm bộ tài nguyên thực hành để áp dụng nhanh hơn."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bonuses.map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-background/40 p-5">
              <b.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-semibold">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
