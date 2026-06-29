import type { Metadata } from "next";
import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CertificateClient } from "@/components/certificate/certificate-client";

export const metadata: Metadata = {
  title: "Chứng nhận hoàn thành",
  description: "Chứng nhận hoàn thành chương trình AI Mastery 28 Ngày.",
};

export default function CertificatePage() {
  return (
    <>
      <AppHeader />
      <main className="flex-1">
        <CertificateClient />
      </main>
      <SiteFooter />
    </>
  );
}
