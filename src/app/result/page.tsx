import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResultClient } from "@/components/result/result-client";

export const metadata: Metadata = {
  title: "Kết quả lộ trình của bạn",
  description: "Lộ trình học AI 28 ngày được cá nhân hóa theo kết quả bài test.",
};

export default function ResultPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ResultClient />
      </main>
      <SiteFooter />
    </>
  );
}
