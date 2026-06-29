import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Container } from "./container";
import { siteConfig } from "@/lib/site";
import { AppAuthButton } from "@/components/auth/auth-buttons";

const appNav = [
  { label: "Bảng học tập", href: "/dashboard" },
  { label: "Kiểm tra cuối", href: "/final-test" },
  { label: "Chứng nhận", href: "/certificate" },
];

/** Header dùng cho khu vực học viên (dashboard, lesson, test, certificate). */
export async function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {appNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <AppAuthButton />
      </Container>
    </header>
  );
}
