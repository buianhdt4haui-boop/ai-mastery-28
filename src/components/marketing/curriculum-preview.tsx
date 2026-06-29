import Link from "next/link";
import { Section, SectionHeading } from "@/components/layout/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Clock, PlayCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { curriculum, weekThemes } from "@/data/curriculum";
import { isFreePreviewDay } from "@/lib/preview";

const weeks = [1, 2, 3, 4];

export function CurriculumPreview() {
  return (
    <Section id="curriculum">
      <SectionHeading
        eyebrow="Lộ trình 28 ngày"
        title="Toàn bộ chương trình, công khai minh bạch"
        subtitle="4 tuần — mỗi tuần một chủ đề. Bạn biết chính xác mình sẽ học gì mỗi ngày."
      />

      {/* CTA học thử miễn phí */}
      <div className="mb-10 flex justify-center">
        <ButtonLink href="/lesson/1" size="lg" variant="outline" className="glow-neon">
          <PlayCircle className="mr-1 h-4 w-4" /> Học thử miễn phí Ngày 1
          <ArrowRight className="ml-1 h-4 w-4" />
        </ButtonLink>
      </div>

      <Tabs defaultValue="1" className="w-full">
        <TabsList className="mx-auto mb-8 flex h-auto w-full max-w-2xl flex-wrap justify-center gap-2 bg-transparent p-0">
          {weeks.map((w) => (
            <TabsTrigger
              key={w}
              value={String(w)}
              className="flex-none rounded-full border border-white/10 px-4 py-2 data-active:border-primary/50 data-active:bg-primary/15 data-active:text-primary"
            >
              Tuần {w}
            </TabsTrigger>
          ))}
        </TabsList>

        {weeks.map((w) => (
          <TabsContent key={w} value={String(w)} className="mt-0">
            <p className="mb-6 text-center text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Chủ đề tuần {w}:</span>{" "}
              {weekThemes[w]}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {curriculum
                .filter((d) => d.week === w)
                .map((d) => {
                  const free = isFreePreviewDay(d.day);
                  const inner = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
                        {d.day}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-medium">{d.title}</h4>
                          <Badge variant="secondary" className="text-[10px]">
                            {d.tool}
                          </Badge>
                          {free && (
                            <Badge className="bg-[oklch(0.78_0.16_215)]/20 text-[10px] text-[oklch(0.78_0.16_215)]">
                              Học thử miễn phí
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {d.objective}
                        </p>
                        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {d.estimatedMinutes} phút
                        </p>
                      </div>
                    </>
                  );

                  const base =
                    "flex items-start gap-4 rounded-xl border p-4 transition-colors";
                  return free ? (
                    <Link
                      key={d.day}
                      href="/lesson/1"
                      className={cn(
                        base,
                        "border-[oklch(0.78_0.16_215)]/40 bg-card/40 hover:border-[oklch(0.78_0.16_215)]/70 hover:bg-card",
                      )}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div
                      key={d.day}
                      className={cn(base, "border-white/10 bg-card/40")}
                    >
                      {inner}
                    </div>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
