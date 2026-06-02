import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Users } from 'lucide-react';

const founders = [
  {
    nameKey: 'founder1_name',
    roleKey: 'founder1_role',
    bioKey: 'founder1_bio',
    image: '/assets/founder-ismael.jpg',
    gradientAngle: '135deg',
  },
  {
    nameKey: 'founder2_name',
    roleKey: 'founder2_role',
    bioKey: 'founder2_bio',
    image: '/assets/founder-carlos.jpg',
    gradientAngle: '225deg',
  },
] as const;

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-light-gray section-padding">
      <div className="container-main">
        <ScrollReveal>
          <span className="section-label">{t('about_label')}</span>
          <h2 className="text-h2 text-deep-blue mt-3">{t('about_headline')}</h2>
        </ScrollReveal>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
          {founders.map((founder, i) => (
            <ScrollReveal key={founder.nameKey} delay={i * 0.2}>
              <div className="h-full">
                {/* Portrait */}
                <div
                  className="rounded-card overflow-hidden aspect-[3/4] max-h-[420px] relative"
                  style={{
                    background: `linear-gradient(${founder.gradientAngle}, #0A192F, #1a3a5c)`,
                  }}
                >
                  <img
                    src={founder.image}
                    alt={t(founder.nameKey)}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle amber glow overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-amber/10 to-transparent pointer-events-none" />
                </div>

                {/* Info */}
                <h3 className="text-h3 text-deep-blue mt-6">{t(founder.nameKey)}</h3>
                <p className="text-h4 text-text-secondary font-medium mt-1">
                  {t(founder.roleKey)}
                </p>
                <p className="text-body-sm text-text-secondary mt-3">{t(founder.bioKey)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Partnership Banner */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 bg-white rounded-card p-8 md:p-10 border border-[rgba(10,25,47,0.08)] shadow-card">
            <div className="flex items-start gap-4">
              <Users size={32} className="text-amber flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-h3 text-deep-blue">{t('partnership_title')}</h3>
                <p className="text-body text-text-secondary mt-3">{t('partnership_desc')}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
