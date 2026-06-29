import { Check, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pricingPlans, formatVnd } from "@/data/pricing";
import { siteConfig } from "@/lib/site";

export function Pricing({
  highlightPlan,
}: {
  /** Gói được gợi ý (vd từ kết quả quiz) sẽ được làm nổi bật. */
  highlightPlan?: string;
}) {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Học phí"
        title="Chọn gói phù hợp với bạn"
        subtitle="Thanh toán một lần, truy cập nội dung lâu dài, không phí ẩn. Chưa chắc gói nào hợp? Làm bài test miễn phí để được gợi ý."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const featured = highlightPlan
            ? plan.id === highlightPlan
            : plan.recommended;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-6 sm:p-8",
                featured
                  ? "border-primary/50 bg-card/70 glow"
                  : "border-white/10 bg-card/40",
              )}
            >
              {featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 bg-primary px-3 py-1">
                  <Star className="h-3 w-3" /> Phù hợp nhất
                </Badge>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{formatVnd(plan.price)}</span>
              </div>
              <span className="mt-1 text-xs text-muted-foreground">
                Thanh toán một lần
              </span>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={`/checkout?plan=${plan.id}`}
                className={cn("mt-8 w-full", featured && "glow")}
                variant={featured ? "default" : "outline"}
                size="lg"
              >
                Đăng ký gói {plan.name}
              </ButtonLink>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        {siteConfig.disclaimer}
      </p>
    </Section>
  );
}
