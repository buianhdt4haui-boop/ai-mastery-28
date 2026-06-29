import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";

export function FinalCta() {
  return (
    <Section>
      <div className="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"
        />
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Bắt đầu hành trình 28 ngày làm chủ AI ngay hôm nay
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Làm bài test miễn phí trong 2 phút để nhận lộ trình học được cá nhân hóa
          cho riêng bạn.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/quiz" size="lg" className="glow h-12 px-8 text-base">
            Làm bài test miễn phí
            <ArrowRight className="ml-1 h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href="#pricing"
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base"
          >
            Xem các gói học
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
