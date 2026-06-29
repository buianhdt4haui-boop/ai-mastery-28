"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Clock,
  Lock,
  PlayCircle,
  Award,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { curriculum, weekThemes } from "@/data/curriculum";
import { useStore } from "@/lib/use-store";
import {
  getCompletedDays,
  getProfile,
  getEnrollment,
  getFinalResult,
  resetAll,
} from "@/lib/progress";

const weeks = [1, 2, 3, 4];

export function DashboardClient() {
  const completed = useStore(getCompletedDays, [] as number[]);
  const profile = useStore(getProfile, null);
  const enrollment = useStore(getEnrollment, null);
  const finalResult = useStore(getFinalResult, null);

  const completedSet = new Set(completed);
  const total = curriculum.length;
  const done = completed.length;
  const percent = Math.round((done / total) * 100);
  const allDone = done >= total;

  const nextDay =
    curriculum.find((d) => !completedSet.has(d.day))?.day ?? total;

  return (
    <Container className="py-10">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Xin chào{profile?.fullName ? `, ${profile.fullName}` : ""} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            {allDone
              ? "Bạn đã hoàn thành toàn bộ bài học. Hãy làm bài kiểm tra cuối!"
              : "Tiếp tục hành trình 28 ngày của bạn."}
          </p>
        </div>
        {enrollment && (
          <Badge variant="secondary" className="capitalize">
            Gói {enrollment.planId}
          </Badge>
        )}
      </div>

      {/* Progress + continue */}
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Tiến độ của bạn</h2>
              <span className="text-sm text-muted-foreground">
                {done}/{total} bài
              </span>
            </div>
            <Progress value={percent} className="mt-4 h-3" />
            <p className="mt-2 text-sm text-muted-foreground">
              Hoàn thành {percent}% chương trình
            </p>
            <div className="mt-5">
              <ButtonLink href={`/lesson/${nextDay}`} className="glow">
                <PlayCircle className="mr-1 h-4 w-4" />
                {done === 0 ? "Bắt đầu ngày 1" : `Tiếp tục ngày ${nextDay}`}
              </ButtonLink>
            </div>
          </CardContent>
        </Card>

        {/* Final test / certificate card */}
        <Card
          className={cn(
            "border-white/10 bg-card/60",
            allDone && "border-primary/40 glow",
          )}
        >
          <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
            <div className="flex items-center gap-2 font-semibold">
              {finalResult?.passed ? (
                <Trophy className="h-5 w-5 text-primary" />
              ) : allDone ? (
                <Award className="h-5 w-5 text-primary" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
              Bài kiểm tra cuối khóa
            </div>
            {finalResult?.passed ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Bạn đã đạt {finalResult.score}/{finalResult.total} điểm. Nhận chứng
                  nhận của bạn ngay!
                </p>
                <ButtonLink href="/certificate" className="glow w-full">
                  Xem chứng nhận
                </ButtonLink>
              </>
            ) : allDone ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Bạn đã sẵn sàng! Hoàn thành bài kiểm tra để nhận chứng nhận.
                </p>
                <ButtonLink href="/final-test" className="glow w-full">
                  Làm bài kiểm tra
                </ButtonLink>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Hoàn thành tất cả {total} bài học để mở khóa bài kiểm tra cuối.
                </p>
                <Button disabled className="w-full" variant="outline">
                  <Lock className="mr-1 h-4 w-4" /> Chưa mở khóa
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lesson list */}
      <div className="mt-12 space-y-10">
        {weeks.map((w) => {
          const days = curriculum.filter((d) => d.week === w);
          const weekDone = days.filter((d) => completedSet.has(d.day)).length;
          return (
            <section key={w}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Tuần {w}</h3>
                  <p className="text-sm text-muted-foreground">{weekThemes[w]}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {weekDone}/{days.length}
                </span>
              </div>
              <div className="grid gap-2">
                {days.map((d) => {
                  const isDone = completedSet.has(d.day);
                  return (
                    <Link
                      key={d.day}
                      href={`/lesson/${d.day}`}
                      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-card/40 p-4 transition-all hover:border-primary/40 hover:bg-card"
                    >
                      <span className="shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="h-6 w-6 text-primary" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground/50" />
                        )}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                        {d.day}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{d.title}</span>
                          <Badge variant="secondary" className="text-[10px]">
                            {d.tool}
                          </Badge>
                        </div>
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                          {d.objective}
                        </p>
                      </div>
                      <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
                        <Clock className="h-3 w-3" /> {d.estimatedMinutes}′
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Reset demo */}
      <div className="mt-12 border-t border-white/10 pt-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => {
            resetAll();
          }}
        >
          <RotateCcw className="mr-1 h-3.5 w-3.5" /> Đặt lại tiến độ (demo)
        </Button>
      </div>
    </Container>
  );
}
