import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Eye, Target, Heart, RefreshCw } from 'lucide-react';

const principles = [
  {
    titleKey: 'principle1_title',
    descKey: 'principle1_desc',
    icon: Eye,
    number: '01',
  },
  {
    titleKey: 'principle2_title',
    descKey: 'principle2_desc',
    icon: Target,
    number: '02',
  },
  {
    titleKey: 'principle3_title',
    descKey: 'principle3_desc',
    icon: Heart,
    number: '03',
  },
  {
    titleKey: 'principle4_title',
    descKey: 'principle4_desc',
    icon: RefreshCw,
    number: '04',
  },
] as const;

export default function PrinciplesSection() {
  const { t } = useLanguage();

  return (
    <section id="principles" className="w-full py-24 bg-surface-container-high border-b border-outline-variant/30">
      <div className="container-main">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-tech text-tech-label text-on-surface-variant uppercase tracking-[0.15em] block mb-4">
              {t('principles_label')}
            </span>
            <h2 className="font-display text-headline-lg md:text-display-md text-on-surface">
              {t('principles_headline')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {principles.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <ScrollReveal key={principle.titleKey} delay={i * 0.1}>
                <div className="bg-primary-container border border-outline-variant rounded-lg p-6 hover:border-nebula-gold transition-all duration-300 group h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-tech text-tech-data text-nebula-gold">
                      {principle.number}
                    </span>
                    <div className="w-10 h-10 bg-surface-dim rounded border border-outline-variant flex items-center justify-center group-hover:border-nebula-gold group-hover:bg-surface-container-high transition-all duration-300">
                      <Icon size={20} className="text-nebula-gold" />
                    </div>
                  </div>
                  <h3 className="font-headline text-headline-md text-on-surface mb-2 group-hover:text-nebula-gold transition-colors duration-300">
                    {t(principle.titleKey)}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant flex-grow">
                    {t(principle.descKey)}
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
