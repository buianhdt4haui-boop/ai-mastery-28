import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SyncProvider } from "@/components/sync-provider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "khóa học AI",
    "học AI tiếng Việt",
    "AI cho người mới",
    "ChatGPT",
    "công cụ AI",
    "lộ trình học AI 28 ngày",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn("dark", "h-full", geistMono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SyncProvider />
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
