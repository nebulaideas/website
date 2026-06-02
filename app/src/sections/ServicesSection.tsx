import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';

const services = [
  { num: '01', titleKey: 'service1_title', descKey: 'service1_desc' },
  { num: '02', titleKey: 'service2_title', descKey: 'service2_desc' },
  { num: '03', titleKey: 'service3_title', descKey: 'service3_desc' },
] as const;

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-[#eef0f4] section-padding border-t border-[rgba(10,25,47,0.08)]">
      <div className="container-main">
        <ScrollReveal>
          <span className="section-label">{t('services_label')}</span>
          <h2 className="text-h2 text-deep-blue mt-3">{t('services_headline')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {services.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 0.15}>
              <div className="bg-white rounded-card p-8 md:p-10 border border-[rgba(10,25,47,0.1)] shadow-[0_4px_24px_rgba(10,25,47,0.08)] hover:shadow-[0_8px_32px_rgba(10,25,47,0.14)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Number badge */}
                <div className="w-10 h-10 rounded-full bg-[#E5A600] flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                  {service.num}
                </div>
                <h3 className="text-h3 text-deep-blue mt-6">{t(service.titleKey)}</h3>
                <p className="text-body-sm text-text-secondary mt-3 flex-grow">
                  {t(service.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
