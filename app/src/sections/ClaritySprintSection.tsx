import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { SearchCheck, ClipboardCheck, CheckCircle2 } from 'lucide-react';

const evalAreas = [
  {
    titleKey: 'sprint_eval1_title',
    descKey: 'sprint_eval1_desc',
  },
  {
    titleKey: 'sprint_eval2_title',
    descKey: 'sprint_eval2_desc',
  },
  {
    titleKey: 'sprint_eval3_title',
    descKey: 'sprint_eval3_desc',
  },
  {
    titleKey: 'sprint_eval4_title',
    descKey: 'sprint_eval4_desc',
  },
] as const;

const deliverables = [
  'sprint_deliverable1',
  'sprint_deliverable2',
  'sprint_deliverable3',
  'sprint_deliverable4',
  'sprint_deliverable5',
  'sprint_deliverable6',
] as const;

export default function ClaritySprintSection() {
  const { t, calendlyUrl } = useLanguage();

  return (
    <section id="clarity-sprint" className="w-full py-28 md:py-32 bg-surface-container-high border-t border-outline-variant/50">
      <div className="container-main max-w-5xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-obsidian-base rounded-full border border-outline-variant mb-8 hover:border-nebula-gold transition-colors duration-300">
              <SearchCheck size={32} className="text-nebula-gold" />
            </div>
            <h2 className="font-display text-[40px] md:text-[56px] text-on-surface mb-4 tracking-tight">
              {t('sprint_headline')}
            </h2>
            <p className="font-headline text-headline-md text-nebula-gold mb-6">
              {t('sprint_sub')}
            </p>
            <p className="font-body text-body-lg text-on-surface-variant mb-4">
              {t('sprint_desc')}
            </p>
            <p className="font-body text-body-md text-on-surface-variant italic">
              {t('sprint_approach')}
            </p>
          </div>
        </ScrollReveal>

        {/* What we evaluate */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <ClipboardCheck size={20} className="text-nebula-gold" />
              <span className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em]">
                {t('sprint_eval_label')}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {evalAreas.map((area, i) => (
                <ScrollReveal key={area.titleKey} delay={0.15 + i * 0.1}>
                  <div className="bg-primary-container border border-outline-variant rounded-lg p-6 hover:border-nebula-gold/50 transition-all duration-300">
                    <h3 className="font-headline text-headline-md text-on-surface mb-2">
                      {t(area.titleKey)}
                    </h3>
                    <p className="font-body text-body-md text-on-surface-variant">
                      {t(area.descKey)}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What you receive */}
        <ScrollReveal delay={0.2}>
          <div className="bg-obsidian-base border border-outline-variant rounded-lg p-8 md:p-10 mb-12">
            <span className="font-tech text-tech-label text-syntax-green uppercase tracking-[0.15em] block mb-6">
              {t('sprint_deliverable_label')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliverables.map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-syntax-green flex-shrink-0" />
                  <span className="font-body text-body-md text-on-surface">{t(key)}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant">
              <p className="font-body text-body-md text-on-surface-variant italic">
                {t('sprint_deliverable_footer')}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="text-center">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-nebula-gold text-nebula-navy px-10 py-4 rounded font-tech text-tech-label font-bold hover:bg-nebula-gold-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-strong"
          >
            {t('sprint_cta')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
