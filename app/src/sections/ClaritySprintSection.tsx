import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { CheckCircle2 } from 'lucide-react';

const evalAreas = [
  { titleKey: 'sprint.eval.1.title', descKey: 'sprint.eval.1.desc' },
  { titleKey: 'sprint.eval.2.title', descKey: 'sprint.eval.2.desc' },
  { titleKey: 'sprint.eval.3.title', descKey: 'sprint.eval.3.desc' },
  { titleKey: 'sprint.eval.4.title', descKey: 'sprint.eval.4.desc' },
] as const;

const deliverables = [
  'sprint.deliverable.1',
  'sprint.deliverable.2',
  'sprint.deliverable.3',
  'sprint.deliverable.4',
  'sprint.deliverable.5',
  'sprint.deliverable.6',
] as const;

export default function ClaritySprintSection() {
  const { t, calendlyUrl } = useLanguage();

  return (
    <SectionShell id="clarity-sprint" className="py-28 md:py-32 bg-surface-container-high border-t border-outline-variant/50" containerClassName="max-w-5xl">
      <SectionHeader headlineKey="sprint.headline" />

      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="font-headline text-headline-md text-nebula-gold mb-6">
            {t('sprint.sub')}
          </h3>
          <p className="font-body text-body-lg text-on-surface-variant text-justify">
            {t('sprint.desc')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em]">
              {t('sprint.eval_label')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evalAreas.map((area, i) => (
              <FeatureCard
                key={area.titleKey}
                title={t(area.titleKey)}
                description={t(area.descKey)}
                variant="minimal"
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex items-center gap-3 mb-8">
          <h3 className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em]">
            {t('sprint.deliverable_label')}
          </h3>
        </div>
        <div className="card-base border-none p-8 md:p-10 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((key) => (
              <div key={key} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-syntax-green flex-shrink-0" />
                <span className="font-body text-body-md text-on-surface">{t(key)}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant">
            <p className="font-body text-body-md text-on-surface-variant italic text-justify">
              {t('sprint.deliverable_footer')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3} className="text-center">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-block px-10 py-4"
        >
          {t('sprint.cta')}
        </a>
      </ScrollReveal>
    </SectionShell>
  );
}
