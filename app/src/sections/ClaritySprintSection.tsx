import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { SearchCheck } from 'lucide-react';

const steps = [
  { numKey: 'sprint_step1_num', titleKey: 'sprint_step1_title', descKey: 'sprint_step1_desc' },
  { numKey: 'sprint_step2_num', titleKey: 'sprint_step2_title', descKey: 'sprint_step2_desc' },
  { numKey: 'sprint_step3_num', titleKey: 'sprint_step3_title', descKey: 'sprint_step3_desc' },
] as const;

export default function ClaritySprintSection() {
  const { t, calendlyUrl } = useLanguage();

  return (
    <section id="clarity-sprint" className="w-full py-28 md:py-32 bg-surface-container-high border-t border-outline-variant/50">
      <div className="container-main max-w-4xl text-center">
        <ScrollReveal>
          <div className="inline-flex items-center justify-center p-4 bg-obsidian-base rounded-full border border-outline-variant mb-8 hover:border-nebula-gold transition-colors duration-300">
            <SearchCheck size={32} className="text-nebula-gold" />
          </div>
          <h2 className="font-display text-[40px] md:text-[56px] text-on-surface mb-6 tracking-tight">
            {t('sprint_headline')}
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
            {t('sprint_desc')}
          </p>
        </ScrollReveal>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          {steps.map((step, i) => (
            <ScrollReveal key={step.numKey} delay={i * 0.15}>
              <div className="border-t-2 border-outline-variant pt-6 relative hover:border-nebula-gold transition-colors duration-300 group">
                <span className="absolute top-[-14px] left-0 bg-surface-container-high pr-2 font-tech text-nebula-gold text-tech-label">
                  {t(step.numKey)}
                </span>
                <h3 className="font-headline text-[18px] text-on-surface mb-2 group-hover:text-nebula-gold transition-colors duration-300">
                  {t(step.titleKey)}
                </h3>
                <p className="font-body text-[14px] text-on-surface-variant">
                  {t(step.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent border-2 border-nebula-gold text-nebula-gold px-10 py-4 rounded font-tech text-tech-label hover:bg-nebula-gold hover:text-nebula-navy transition-all duration-300 hover:shadow-gold-hover hover:-translate-y-1"
          >
            {t('sprint_cta')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
