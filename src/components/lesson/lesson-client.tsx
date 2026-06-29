"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Target,
  BookOpen,
  ListOrdered,
  Sparkles,
  Copy,
  Dumbbell,
  ListChecks,
  AlertTriangle,
  MapPin,
  Download,
  CheckCircle2,
  Circle,
  Lock,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CurriculumDay } from "@/types";
import type { LessonContent } from "@/data/lesson-content";
import { curriculum, weekThemes } from "@/data/curriculum";
import { useStore } from "@/lib/use-store";
import { isDayCompleted, setDayCompleted } from "@/lib/progress";

export function LessonClient({
  day,
  content,
  preview = false,
}: {
  day: CurriculumDay;
  content?: LessonContent;
  /** Chế độ xem thử miễn phí (khách chưa đăng nhập): ẩn điều khiển học, hiện CTA. */
  preview?: boolean;
}) {
  const completed = useStore(() => isDayCompleted(day.day), false);

  const prev = curriculum.find((d) => d.day === day.day - 1);
  const next = curriculum.find((d) => d.day === day.day + 1);

  function toggleComplete() {
    const willComplete = !completed;
    setDayCompleted(day.day, willComplete);
    if (willComplete) toast.success(`Hoàn thành ngày ${day.day}! 🎉`);
  }

  function copyPrompt(text: string) {
    navigator.clipboard?.writeText(text).then(
      () => toast.success("Đã copy prompt"),
      () => toast.error("Không copy được, hãy bôi đen thủ công."),
    );
  }

  return (
    <Container className="max-w-3xl py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={preview ? "/" : "/dashboard"} className="hover:text-foreground">
          {preview ? "Trang chủ" : "Bảng học tập"}
        </Link>
        <span>/</span>
        <span>{preview ? "Học thử miễn phí" : `Tuần ${day.week}`}</span>
      </div>

      {preview && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          Bài học miễn phí — trải nghiệm thử Ngày 1 của lộ trình 28 ngày.
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-lg font-bold text-primary">
          {day.day}
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Ngày {day.day} · {weekThemes[day.week]}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{day.title}</h1>
            <Badge variant="secondary">{day.tool}</Badge>
          </div>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" /> Khoảng {day.estimatedMinutes} phút
      </p>

      {/* Mục tiêu */}
      <Card className="mt-8 border-primary/30 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-5">
          <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Mục tiêu bài học</p>
            <p className="mt-1 text-sm text-muted-foreground">{day.objective}</p>
          </div>
        </CardContent>
      </Card>

      {/* Lý thuyết */}
      <Section icon={BookOpen} title="Nội dung lý thuyết">
        <p className="leading-relaxed text-muted-foreground">
          {content?.theory ?? day.lessonSummary}
        </p>
      </Section>

      {/* Thực hành từng bước */}
      {content && (
        <Section icon={ListOrdered} title="Hướng dẫn thực hành">
          <ol className="space-y-3">
            {content.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* 3 prompt mẫu */}
      {content && (
        <Section icon={Sparkles} title="3 prompt mẫu">
          <div className="grid gap-3">
            {content.prompts.map((p, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-white/10 bg-card/50 p-4 pr-12"
              >
                <p className="text-sm text-foreground/90">{p}</p>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-2 top-2"
                  onClick={() => copyPrompt(p)}
                  aria-label="Copy prompt"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Bài tập ứng dụng */}
      <Card className="mt-8 border-white/10 bg-card/50">
        <CardContent className="flex items-start gap-3 p-5">
          <Dumbbell className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Bài tập ứng dụng</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {content?.exercise ?? day.assignment}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      {content && (
        <Section icon={ListChecks} title="Checklist hoàn thành">
          <ul className="space-y-2">
            {content.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Lỗi thường gặp + Ví dụ VN */}
      {content && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="flex items-start gap-3 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div>
                <p className="text-sm font-medium">Lỗi người mới thường gặp</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {content.commonMistake}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[oklch(0.78_0.16_215)]/30 bg-[oklch(0.78_0.16_215)]/5">
            <CardContent className="flex items-start gap-3 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.78_0.16_215)]" />
              <div>
                <p className="text-sm font-medium">Ví dụ tại Việt Nam</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {content.vietnamExample}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tài nguyên */}
      <div className="mt-8 flex items-center justify-between rounded-xl border border-dashed border-white/20 p-4">
        <div className="flex items-center gap-3">
          <Download className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{day.resourceName}</p>
            <p className="text-xs text-muted-foreground">Tài nguyên đi kèm (demo)</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.info(
              preview
                ? "Đăng ký để tải tài nguyên này."
                : "Tài nguyên mẫu — sẽ có file thật khi go-live.",
            )
          }
        >
          Tải về
        </Button>
      </div>

      {preview ? (
        /* CTA chuyển đổi cho khách học thử */
        <div className="glass mt-10 rounded-2xl p-6 text-center sm:p-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary glow">
            <Lock className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-xl font-bold sm:text-2xl">
            Đây mới là Ngày 1 trong lộ trình 28 ngày
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Đăng ký để mở khóa 27 ngày còn lại, bộ prompt &amp; template, bài kiểm
            tra và chứng nhận hoàn thành.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg" className="glow h-12 px-8 text-base">
              Làm bài test miễn phí <ArrowRight className="ml-1 h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="/#pricing"
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
            >
              Xem các gói học
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      ) : (
        <>
          {/* Hoàn thành */}
          <div className="mt-10">
            <Button
              onClick={toggleComplete}
              size="lg"
              variant={completed ? "outline" : "default"}
              className={cn("w-full", !completed && "glow")}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="mr-1 h-5 w-5 text-primary" /> Đã hoàn thành
                  — bỏ đánh dấu
                </>
              ) : (
                <>
                  <Circle className="mr-1 h-5 w-5" /> Đánh dấu hoàn thành
                </>
              )}
            </Button>
          </div>

          {/* Điều hướng */}
          <div className="mt-8 flex items-center justify-between gap-4">
            {prev ? (
              <ButtonLink href={`/lesson/${prev.day}`} variant="ghost">
                <ArrowLeft className="mr-1 h-4 w-4" /> Ngày {prev.day}
              </ButtonLink>
            ) : (
              <span />
            )}
            {next ? (
              <ButtonLink href={`/lesson/${next.day}`} variant="ghost">
                Ngày {next.day} <ArrowRight className="ml-1 h-4 w-4" />
              </ButtonLink>
            ) : (
              <ButtonLink href="/final-test" className="glow">
                Tới bài kiểm tra cuối <ArrowRight className="ml-1 h-4 w-4" />
              </ButtonLink>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

/** Khối nội dung có tiêu đề + icon, dùng lại trong trang bài học. */
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        <Icon className="h-5 w-5 text-primary" /> {title}
      </h2>
      {children}
    </section>
  );
}
