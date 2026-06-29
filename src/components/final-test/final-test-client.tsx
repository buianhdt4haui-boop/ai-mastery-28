"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Lock, CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { finalTestQuestions, PASS_RATIO } from "@/data/final-test";
import { curriculum } from "@/data/curriculum";
import { useStore } from "@/lib/use-store";
import {
  isFinalTestUnlocked,
  getCompletedDays,
  setDayCompleted,
  saveFinalResult,
  getFinalResult,
} from "@/lib/progress";

export function FinalTestClient() {
  const unlocked = useStore(isFinalTestUnlocked, false);
  const completedCount = useStore(getCompletedDays, [] as number[]).length;
  const existing = useStore(getFinalResult, null);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // --- Locked screen ---
  if (!unlocked && !submitted) {
    return (
      <Container className="max-w-xl py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Lock className="h-7 w-7 text-muted-foreground" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">Bài kiểm tra chưa mở khóa</h1>
        <p className="mt-3 text-muted-foreground">
          Hãy hoàn thành tất cả {curriculum.length} bài học để mở bài kiểm tra cuối
          khóa. Bạn đã hoàn thành {completedCount}/{curriculum.length} bài.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/dashboard">Về bảng học tập</ButtonLink>
          <Button
            variant="outline"
            onClick={() => {
              curriculum.forEach((d) => setDayCompleted(d.day, true));
              toast.success("Đã đánh dấu hoàn thành tất cả bài (demo).");
            }}
          >
            <RotateCcw className="mr-1 h-4 w-4" /> Hoàn thành nhanh (demo)
          </Button>
        </div>
      </Container>
    );
  }

  const total = finalTestQuestions.length;

  // --- Result screen ---
  if (submitted) {
    const passed = score / total >= PASS_RATIO;
    return (
      <Container className="max-w-2xl py-16">
        <div className="text-center">
          <span
            className={cn(
              "mx-auto flex h-20 w-20 items-center justify-center rounded-full",
              passed ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive",
            )}
          >
            {passed ? <Award className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
          </span>
          <h1 className="mt-6 text-3xl font-bold">
            {passed ? "Chúc mừng! Bạn đã đạt 🎉" : "Chưa đạt, cố lên!"}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Điểm của bạn: <span className="font-bold text-foreground">{score}/{total}</span>{" "}
            (cần {Math.ceil(total * PASS_RATIO)}/{total} để đạt)
          </p>
        </div>

        {/* Review */}
        <div className="mt-10 space-y-4">
          {finalTestQuestions.map((q, i) => {
            const chosen = answers[q.id];
            const correct = chosen === q.correct;
            return (
              <Card key={q.id} className="border-white/10 bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-start gap-2">
                    {correct ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    )}
                    <div>
                      <p className="font-medium">
                        {i + 1}. {q.question}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Đáp án đúng: {q.options[q.correct]}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground/80">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {passed ? (
            <ButtonLink href="/certificate" size="lg" className="glow h-12 px-8">
              <Award className="mr-1 h-5 w-5" /> Nhận chứng nhận
            </ButtonLink>
          ) : (
            <Button
              size="lg"
              className="glow h-12 px-8"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setScore(0);
              }}
            >
              <RotateCcw className="mr-1 h-5 w-5" /> Làm lại
            </Button>
          )}
          <ButtonLink href="/dashboard" size="lg" variant="outline" className="h-12 px-8">
            Về bảng học tập
          </ButtonLink>
        </div>
      </Container>
    );
  }

  // --- Test screen ---
  function handleSubmit() {
    if (Object.keys(answers).length < total) {
      toast.error("Vui lòng trả lời tất cả câu hỏi.");
      return;
    }
    const correctCount = finalTestQuestions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0),
      0,
    );
    setScore(correctCount);
    setSubmitted(true);
    saveFinalResult({
      score: correctCount,
      total,
      passed: correctCount / total >= PASS_RATIO,
      completedAt: new Date().toISOString(),
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <Container className="max-w-2xl py-12">
      <h1 className="text-3xl font-bold tracking-tight">Bài kiểm tra cuối khóa</h1>
      <p className="mt-2 text-muted-foreground">
        {total} câu hỏi · cần đúng {Math.ceil(total * PASS_RATIO)} câu để đạt
        {existing?.passed && " · bạn đã từng đạt bài này"}
      </p>

      <div className="mt-8 space-y-6">
        {finalTestQuestions.map((q, i) => (
          <Card key={q.id} className="border-white/10 bg-card/50">
            <CardContent className="p-5">
              <p className="font-medium">
                {i + 1}. {q.question}
              </p>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, idx) => {
                  const selected = answers[q.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                      className={cn(
                        "rounded-lg border px-4 py-2.5 text-left text-sm transition-all",
                        selected
                          ? "border-primary/60 bg-primary/10"
                          : "border-white/10 hover:border-primary/40 hover:bg-card",
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-4 mt-8">
        <Button onClick={handleSubmit} size="lg" className="glow w-full">
          Nộp bài ({answeredCount}/{total})
        </Button>
      </div>
    </Container>
  );
}
