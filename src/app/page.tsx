import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/marketing/hero";
import { getHeroVariant } from "@/data/hero-variants";
import { PainPoints } from "@/components/marketing/pain-points";
import { Solution } from "@/components/marketing/solution";
import { Audience } from "@/components/marketing/audience";
import { Benefits } from "@/components/marketing/benefits";
import { CurriculumPreview } from "@/components/marketing/curriculum-preview";
import { Bonus } from "@/components/marketing/bonus";
import { Testimonials } from "@/components/marketing/testimonials";
import { Pricing } from "@/components/marketing/pricing";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ hero?: string }>;
}) {
  const { hero } = await searchParams;
  const heroVariant = getHeroVariant(hero);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero variant={heroVariant} />
        <PainPoints />
        <Solution />
        <Audience />
        <Benefits />
        <CurriculumPreview />
        <Bonus />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
