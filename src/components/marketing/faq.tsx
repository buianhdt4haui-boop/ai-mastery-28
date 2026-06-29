import { Section, SectionHeading } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="Câu hỏi thường gặp"
        title="Những điều bạn có thể đang băn khoăn"
      />
      <div className="mx-auto max-w-3xl">
        <Accordion className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-left text-base hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
