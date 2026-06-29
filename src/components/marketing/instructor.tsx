import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles } from "lucide-react";
import { instructor } from "@/data/instructor";

/** Mục "Về chúng tôi" / "Về giảng viên" — chỉ hiển thị khi instructor.enabled = true. */
export function Instructor() {
  if (!instructor.enabled) return null;

  return (
    <Section id="instructor" className="bg-card/30">
      <div className="grid items-center gap-10 md:grid-cols-[300px_1fr]">
        {/* Logo / ảnh */}
        <div className="mx-auto w-full max-w-[300px]">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 glow">
            {instructor.photo ? (
              <Image
                src={instructor.photo}
                alt={instructor.name}
                fill
                className="object-cover"
                sizes="300px"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/20 to-[oklch(0.78_0.16_215)]/15 p-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary glow">
                  <Sparkles className="h-8 w-8" />
                </span>
                <span className="text-lg font-bold leading-tight">
                  {instructor.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Nội dung */}
        <div>
          <Badge className="mb-4 bg-primary/15 text-primary">
            {instructor.sectionLabel}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">{instructor.name}</h2>
          <p className="mt-1 text-muted-foreground">{instructor.title}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{instructor.bio}</p>

          <ul className="mt-6 space-y-2">
            {instructor.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{h}</span>
              </li>
            ))}
          </ul>

          {instructor.quote && (
            <blockquote className="mt-6 border-l-2 border-primary/50 pl-4 text-sm italic text-muted-foreground">
              “{instructor.quote}”
            </blockquote>
          )}

          {instructor.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {instructor.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
