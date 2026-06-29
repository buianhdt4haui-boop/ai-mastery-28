"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { quizQuestions } from "@/data/quiz";
import type { QuizAnswers } from "@/types";
import { saveQuizAnswers } from "@/lib/progress";

export function QuizClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = quizQuestions[step];
  const total = quizQuestions.length;
  const progress = Math.round((step / total) * 100);
  const current = answers[question.id];

  function selectSingle(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    // Tự động sang câu kế cho câu chọn 1 đáp án.
    advance(next);
  }

  function toggleMulti(value: string) {
    const prev = (answers[question.id] as string[]) ?? [];
    const exists = prev.includes(value);
    const updated = exists ? prev.filter((v) => v !== value) : [...prev, value];
    setAnswers({ ...answers, [question.id]: updated });
  }

  function advance(currentAnswers: QuizAnswers) {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      saveQuizAnswers(currentAnswers);
      router.push("/result");
    }
  }

  function isSelected(value: string): boolean {
    if (question.type === "multi") {
      return ((current as string[]) ?? []).includes(value);
    }
    return current === value;
  }

  const canContinue =
    question.type === "multi"
      ? ((current as string[]) ?? []).length > 0
      : Boolean(current);

  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Câu {step + 1} / {total}
          </span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div key={question.id} className="animate-in fade-in-50 duration-300">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {question.question}
        </h1>
        {question.helper && (
          <p className="mt-2 text-sm text-muted-foreground">{question.helper}</p>
        )}

        <div className="mt-8 grid gap-3">
          {question.options.map((opt) => {
            const selected = isSelected(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  question.type === "multi"
                    ? toggleMulti(opt.value)
                    : selectSingle(opt.value)
                }
                className={cn(
                  "group flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                  selected
                    ? "border-primary/60 bg-primary/10 glow"
                    : "border-white/10 bg-card/50 hover:border-primary/40 hover:bg-card",
                )}
              >
                {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                <span className="flex-1 font-medium">{opt.label}</span>
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-white/20",
                  )}
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Quay lại
          </Button>

          {question.type === "multi" && (
            <Button
              onClick={() => advance(answers)}
              disabled={!canContinue}
              className="glow"
            >
              {step === total - 1 ? "Xem kết quả" : "Tiếp tục"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
