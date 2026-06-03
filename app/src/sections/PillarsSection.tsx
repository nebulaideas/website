import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Compass, Cpu, Shield, Route } from 'lucide-react';

const pillars = [
  {
    labelKey: 'pillar1_label',
    titleKey: 'pillar1_title',
    descKey: 'pillar1_desc',
    icon: Compass,
  },
  {
    labelKey: 'pillar2_label',
    titleKey: 'pillar2_title',
    descKey: 'pillar2_desc',
    icon: Cpu,
  },
  {
    labelKey: 'pillar3_label',
    titleKey: 'pillar3_title',
    descKey: 'pillar3_desc',
    icon: Shield,
  },
  {
    labelKey: 'pillar4_label',
    titleKey: 'pillar4_title',
    descKey: 'pillar4_desc',
    icon: Route,
  },
] as const;

export default function PillarsSection() {
  const { t } = useLanguage();

  return (
    <section id="what-we-do" className="w-full py-24 bg-surface-container-lowest">
      <div className="container-main">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-tech text-tech-label text-on-surface-variant uppercase tracking-[0.15em] block mb-4">
              {t('pillars_label')}
            </span>
            <h2 className="font-display text-headline-lg md:text-display-md text-on-surface">
              {t('pillars_headline')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.labelKey} delay={i * 0.1}>
                <div className="bg-primary-container border border-outline-variant rounded-lg p-8 hover:border-nebula-gold hover:-translate-y-1.5 hover:shadow-gold hover:bg-surface-container transition-all duration-500 group h-full cursor-pointer">
                  <div className="w-12 h-12 bg-surface-dim rounded border border-outline-variant flex items-center justify-center mb-6 group-hover:border-nebula-gold group-hover:bg-surface-container-high transition-all duration-300 group-hover:scale-110">
                    <Icon size={24} className="text-nebula-gold group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all duration-300" />
                  </div>
                  <span className="font-tech text-tech-data text-on-surface-variant uppercase mb-2 block">
                    {t(pillar.labelKey)}
                  </span>
                  <h3 className="font-headline text-headline-md text-on-surface mb-3">
                    {t(pillar.titleKey)}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant">
                    {t(pillar.descKey)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
