import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { BrainCircuit, Building2, GitBranch, Users } from 'lucide-react';

const services = [
  {
    titleKey: 'service1_title',
    descKey: 'service1_desc',
    icon: BrainCircuit,
  },
  {
    titleKey: 'service2_title',
    descKey: 'service2_desc',
    icon: Building2,
  },
  {
    titleKey: 'service3_title',
    descKey: 'service3_desc',
    icon: GitBranch,
  },
  {
    titleKey: 'service4_title',
    descKey: 'service4_desc',
    icon: Users,
  },
] as const;

export default function WhatWeHelpSection() {
  const { t } = useLanguage();

  return (
    <section id="what-we-help" className="w-full py-24 bg-surface-container-lowest">
      <div className="container-main">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em] block mb-4">
              {t('services_label')}
            </span>
            <h2 className="font-display text-headline-lg md:text-display-md text-on-surface">
              {t('services_headline')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.titleKey} delay={i * 0.1}>
                <div className="bg-primary-container border border-outline-variant rounded-lg p-8 hover:border-nebula-gold hover:-translate-y-1.5 hover:shadow-gold hover:bg-surface-container transition-all duration-500 group h-full">
                  <div className="w-12 h-12 bg-surface-dim rounded border border-outline-variant flex items-center justify-center mb-6 group-hover:border-nebula-gold group-hover:bg-surface-container-high transition-all duration-300 group-hover:scale-110">
                    <Icon size={24} className="text-nebula-gold group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.5)] transition-all duration-300" />
                  </div>
                  <h3 className="font-headline text-headline-md text-on-surface mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant">
                    {t(service.descKey)}
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
