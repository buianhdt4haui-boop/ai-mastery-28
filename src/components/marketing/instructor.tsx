import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { instructor } from "@/data/instructor";

/** Mục "Về giảng viên" — chỉ hiển thị khi instructor.enabled = true. */
export function Instructor() {
  if (!instructor.enabled) return null;

  const initials = instructor.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <Section id="instructor" className="bg-card/30">
      <div className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
        {/* Ảnh / avatar */}
        <div className="mx-auto w-full max-w-[280px]">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 glow">
            {instructor.photo ? (
              <Image
                src={instructor.photo}
                alt={instructor.name}
                fill
                className="object-cover"
                sizes="280px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/15 text-5xl font-bold text-primary">
                {initials}
              </div>
            )}
          </div>
        </div>

        {/* Nội dung */}
        <div>
          <Badge className="mb-4 bg-primary/15 text-primary">Về giảng viên</Badge>
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
