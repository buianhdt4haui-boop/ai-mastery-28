import { ArrowRight, Sparkles, Clock, CalendarDays, BookOpen } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";
import { curriculum } from "@/data/curriculum";
import { heroVariants, type HeroVariant } from "@/data/hero-variants";

export function Hero({ variant = heroVariants[0] }: { variant?: HeroVariant }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <Container className="flex flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {variant.eyebrow}
        </span>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          <span className="text-gradient">{variant.headlineHighlight}</span>{" "}
          {variant.headlineRest}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {variant.subheadline}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/quiz" size="lg" className="glow h-12 px-8 text-base">
            {variant.primaryCta}
            <ArrowRight className="ml-1 h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href="#curriculum"
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base"
          >
            {variant.secondaryCta}
          </ButtonLink>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">{variant.microcopy}</p>

        {/* Stats */}
        <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4">
          {[
            { icon: CalendarDays, value: `${siteConfig.totalDays} ngày`, label: "Lộ trình có cấu trúc" },
            { icon: Clock, value: siteConfig.minutesPerDay, label: "Mỗi ngày" },
            { icon: BookOpen, value: `${curriculum.length} bài`, label: "Học & thực hành" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass flex flex-col items-center gap-1 rounded-2xl px-3 py-5"
            >
              <stat.icon className="mb-1 h-5 w-5 text-primary" />
              <span className="text-xl font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
