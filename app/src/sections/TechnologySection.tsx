import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Code2, Layers, Cloud } from 'lucide-react';

const techCards = [
  {
    icon: Code2,
    titleKey: 'tech_opensource_title',
    descKey: 'tech_opensource_desc',
  },
  {
    icon: Layers,
    titleKey: 'tech_stack_title',
    descKey: 'tech_stack_desc',
  },
  {
    icon: Cloud,
    titleKey: 'tech_infra_title',
    descKey: 'tech_infra_desc',
  },
] as const;

export default function TechnologySection() {
  const { t } = useLanguage();

  return (
    <section className="bg-light-gray section-padding">
      <div className="container-main">
        <ScrollReveal>
          <span className="section-label">{t('tech_label')}</span>
          <h2 className="text-h2 text-deep-blue mt-3">{t('tech_headline')}</h2>
        </ScrollReveal>

        <div className="space-y-6 mt-12">
          {techCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.titleKey} delay={i * 0.15}>
                <div className="bg-white rounded-card p-6 md:p-8 border border-[rgba(10,25,47,0.08)] shadow-card flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                    <Icon size={28} className="text-deep-blue" />
                  </div>
                  <div>
                    <h3 className="text-h3 text-deep-blue">{t(card.titleKey)}</h3>
                    <p className="text-body-sm text-text-secondary mt-2">
                      {t(card.descKey)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
