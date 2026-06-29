import type { Metadata } from "next";
import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Bảng học tập",
  description: "Theo dõi tiến độ và truy cập các bài học của bạn.",
};

export default function DashboardPage() {
  return (
    <>
      <AppHeader />
      <main className="flex-1">
        <DashboardClient />
      </main>
      <SiteFooter />
    </>
  );
}
