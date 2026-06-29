import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Container } from "./container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-background/50">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              {siteConfig.name}
            </div>
            <p className="text-sm text-muted-foreground">{siteConfig.tagline}</p>
            <p className="text-sm text-muted-foreground">
              Phát triển bởi{" "}
              <span className="font-medium text-foreground">ROAS Lab Ads Academy</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Liên hệ:{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-foreground hover:text-primary"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-medium">Khóa học</p>
              <Link href="/#curriculum" className="block text-muted-foreground hover:text-foreground">
                Lộ trình 28 ngày
              </Link>
              <Link href="/#pricing" className="block text-muted-foreground hover:text-foreground">
                Học phí
              </Link>
              <Link href="/quiz" className="block text-muted-foreground hover:text-foreground">
                Bài test miễn phí
              </Link>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Khác</p>
              <Link href="/#faq" className="block text-muted-foreground hover:text-foreground">
                Câu hỏi thường gặp
              </Link>
              <Link href="/dashboard" className="block text-muted-foreground hover:text-foreground">
                Khu vực học viên
              </Link>
              <Link href="/admin" className="block text-muted-foreground hover:text-foreground">
                Quản trị
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {siteConfig.disclaimer}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Đã đăng ký bản quyền nội dung.
          </p>
        </div>
      </Container>
    </footer>
  );
}
