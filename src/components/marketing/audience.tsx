import { Section, SectionHeading } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { personas } from "@/data/personas";

export function Audience() {
  return (
    <Section id="audience">
      <SectionHeading
        eyebrow="Dành cho ai"
        title="Khóa học này phù hợp với bạn nếu…"
        subtitle="Dù bạn ở vai trò nào, lộ trình sẽ được cá nhân hóa theo mục tiêu của bạn sau bài test."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((persona) => (
          <Card key={persona.id} className="border-white/10 bg-card/50 transition-colors hover:border-primary/40">
            <CardContent className="flex flex-col gap-2 p-6">
              <span className="text-3xl">{persona.emoji}</span>
              <h3 className="font-semibold">{persona.title}</h3>
              <p className="text-sm text-muted-foreground">{persona.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
