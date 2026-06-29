import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LessonClient } from "@/components/lesson/lesson-client";
import { curriculum, getDay } from "@/data/curriculum";
import { getLessonContent } from "@/data/lesson-content";

export function generateStaticParams() {
  return curriculum.map((d) => ({ day: String(d.day) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>;
}): Promise<Metadata> {
  const { day } = await params;
  const lesson = getDay(Number(day));
  if (!lesson) return { title: "Không tìm thấy bài học" };
  return {
    title: `Ngày ${lesson.day}: ${lesson.title}`,
    description: lesson.objective,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const lesson = getDay(Number(day));
  if (!lesson) notFound();
  const content = getLessonContent(lesson.day);

  return (
    <>
      <AppHeader />
      <main className="flex-1">
        <LessonClient day={lesson} content={content} />
      </main>
      <SiteFooter />
    </>
  );
}
