import type { Metadata } from "next";
import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FinalTestClient } from "@/components/final-test/final-test-client";

export const metadata: Metadata = {
  title: "Bài kiểm tra cuối khóa",
  description: "Hoàn thành bài kiểm tra để nhận chứng nhận hoàn thành chương trình.",
};

export default function FinalTestPage() {
  return (
    <>
      <AppHeader />
      <main className="flex-1">
        <FinalTestClient />
      </main>
      <SiteFooter />
    </>
  );
}
