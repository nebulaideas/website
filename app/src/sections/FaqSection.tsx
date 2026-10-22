import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';
import SectionHeader from '@/components/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// These keys are the exact source of the FAQPage JSON-LD in src/lib/meta.ts.
// Rendering the same keys keeps the visible FAQ and the structured data in sync.
const faqItems = [
  { questionKey: 'seo.faq_what_is_question', answerKey: 'seo.faq_what_is_answer' },
  { questionKey: 'seo.faq_duration_question', answerKey: 'seo.faq_duration_answer' },
  { questionKey: 'seo.faq_deliverables_question', answerKey: 'seo.faq_deliverables_answer' },
  { questionKey: 'seo.faq_location_question', answerKey: 'seo.faq_location_answer' },
] as const;

export default function FaqSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="faq" className="py-24 bg-surface-container-lowest border-t border-outline-variant/50">
      <SectionHeader labelKey="faq.label" headlineKey="faq.headline" />

      <ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={item.questionKey} value={`faq-${i}`}>
                <AccordionTrigger className="font-headline text-headline-md text-on-surface hover:text-nebula-gold hover:no-underline">
                  {t(item.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="font-body text-body-md text-on-surface-variant text-justify">
                  {t(item.answerKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}