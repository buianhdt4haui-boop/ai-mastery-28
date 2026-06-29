import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LessonClient } from "@/components/lesson/lesson-client";
import { curriculum, getDay } from "@/data/curriculum";
import { getLessonContent } from "@/data/lesson-content";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isFreePreviewDay } from "@/lib/preview";

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

  // Chế độ xem thử: đã bật Supabase, chưa đăng nhập, và là ngày học thử miễn phí.
  // (Các ngày khác đã bị middleware chặn nếu chưa đăng nhập.)
  const user = isSupabaseConfigured ? await getCurrentUser() : null;
  const isPreview = isSupabaseConfigured && !user && isFreePreviewDay(lesson.day);

  return (
    <>
      {isPreview ? <SiteHeader /> : <AppHeader />}
      <main className="flex-1">
        <LessonClient day={lesson} content={content} preview={isPreview} />
      </main>
      <SiteFooter />
    </>
  );
}
