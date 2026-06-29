"use client";

import { ArrowRight, Sparkles, Target, CalendarClock, Compass } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getQuizResult } from "@/lib/progress";
import { useHydrated } from "@/lib/use-store";
import { getPersona } from "@/data/personas";
import { getPlan, formatVnd } from "@/data/pricing";
import { siteConfig } from "@/lib/site";

export function ResultClient() {
  const hydrated = useHydrated();
  const result = hydrated ? getQuizResult() : null;

  if (!hydrated) {
    return (
      <Container className="py-24 text-center text-muted-foreground">
        Đang tải kết quả…
      </Container>
    );
  }

  if (!result) {
    return (
      <Container className="max-w-xl py-24 text-center">
        <h1 className="text-2xl font-bold">Chưa có kết quả</h1>
        <p className="mt-3 text-muted-foreground">
          Bạn cần hoàn thành bài test ngắn để nhận lộ trình cá nhân hóa.
        </p>
        <ButtonLink href="/quiz" className="glow mt-6">
          Làm bài test miễn phí <ArrowRight className="ml-1 h-4 w-4" />
        </ButtonLink>
      </Container>
    );
  }

  const persona = getPersona(result.personaId);
  const plan = getPlan(result.recommendedPlan);
  if (!persona || !plan) return null;

  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <div className="text-center">
        <Badge className="mb-4 gap-1 bg-primary/15 text-primary">
          <Sparkles className="h-3 w-3" /> Kết quả của bạn
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Lộ trình AI dành riêng cho bạn
        </h1>
      </div>

      {/* Persona */}
      <Card className="mt-10 border-primary/30 bg-card/60 glow">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <span className="text-6xl">{persona.emoji}</span>
          <div>
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Hồ sơ học viên
            </p>
            <h2 className="text-2xl font-bold">{persona.title}</h2>
            <p className="mt-2 text-muted-foreground">{persona.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Path + focus + pace */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="border-white/10 bg-card/50">
          <CardContent className="p-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <Compass className="h-4 w-4 text-primary" /> Lộ trình phù hợp
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {persona.path.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-white/10 bg-card/50">
            <CardContent className="p-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <Target className="h-4 w-4 text-primary" /> Trọng tâm của bạn
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.focusAreas.map((f) => (
                  <Badge key={f} variant="secondary">
                    {f}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-card/50">
            <CardContent className="flex items-start gap-2 p-6 text-sm text-muted-foreground">
              <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {result.pace}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended plan */}
      <Card className="mt-8 overflow-hidden border-primary/40 bg-card/60">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm text-muted-foreground">Gói học gợi ý cho bạn</p>
            <p className="text-2xl font-bold">
              {plan.name} —{" "}
              <span className="text-gradient">{formatVnd(plan.price)}</span>
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {plan.description}
            </p>
          </div>
          <ButtonLink
            href={`/checkout?plan=${plan.id}`}
            size="lg"
            className="glow h-12 shrink-0 px-8 text-base"
          >
            Nhận lộ trình 28 ngày <ArrowRight className="ml-1 h-4 w-4" />
          </ButtonLink>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <ButtonLink href="/#pricing" variant="ghost">
          So sánh tất cả các gói
        </ButtonLink>
        <ButtonLink href="/quiz" variant="ghost">
          Làm lại bài test
        </ButtonLink>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        {siteConfig.disclaimer}
      </p>
    </Container>
  );
}
