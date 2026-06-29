import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CheckoutClient } from "@/components/checkout/checkout-client";
import { pricingPlans } from "@/data/pricing";
import type { PlanId } from "@/types";

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Hoàn tất đăng ký khóa học AI Mastery 28 Ngày.",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const valid = pricingPlans.some((p) => p.id === plan);
  const initialPlan = (valid ? plan : "pro") as PlanId;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CheckoutClient initialPlan={initialPlan} />
      </main>
      <SiteFooter />
    </>
  );
}
