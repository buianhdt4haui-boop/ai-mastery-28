import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "./container";
import { mainNav, siteConfig } from "@/lib/site";
import { MarketingAuthButtons } from "@/components/auth/auth-buttons";

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary glow">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sm:hidden">AI Mastery</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MarketingAuthButtons />
          <ButtonLink href="/quiz" size="sm" className="glow">
            Làm bài test miễn phí
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
