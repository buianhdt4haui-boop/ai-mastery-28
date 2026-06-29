import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { QuizClient } from "@/components/quiz/quiz-client";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bài test cá nhân hóa",
  description:
    "Trả lời vài câu hỏi ngắn để nhận lộ trình học AI 28 ngày phù hợp với bạn.",
};

export default function QuizPage() {
  return (
    <>
      <header className="border-b border-white/10">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            {siteConfig.name}
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Thoát
          </Link>
        </Container>
      </header>
      <main className="flex-1">
        <QuizClient />
      </main>
    </>
  );
}
