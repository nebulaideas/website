import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Users } from 'lucide-react';

const founders = [
  {
    nameKey: 'founder1_name',
    roleKey: 'founder1_role',
    bioKey: 'founder1_bio',
    image: '/assets/founder-ismael.jpg',
  },
  {
    nameKey: 'founder2_name',
    roleKey: 'founder2_role',
    bioKey: 'founder2_bio',
    image: '/assets/founder-carlos.jpg',
  },
] as const;

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full py-24 bg-surface-container-lowest">
      <div className="container-main">
        <ScrollReveal>
          <span className="font-tech text-tech-label text-on-surface-variant uppercase tracking-[0.15em] block mb-4">
            {t('about_label')}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface">{t('about_headline')}</h2>
        </ScrollReveal>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
          {founders.map((founder, i) => (
            <ScrollReveal key={founder.nameKey} delay={i * 0.2}>
              <div className="h-full">
                <div className="rounded-lg overflow-hidden aspect-[3/4] max-h-[420px] relative border border-outline-variant">
                  <img
                    src={founder.image}
                    alt={t(founder.nameKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian-base/80 to-transparent pointer-events-none" />
                </div>
                <h3 className="font-headline text-headline-md text-on-surface mt-6">
                  {t(founder.nameKey)}
                </h3>
                <p className="font-tech text-tech-label text-on-surface-variant mt-1">
                  {t(founder.roleKey)}
                </p>
                <p className="font-body text-body-md text-on-surface-variant mt-3">
                  {t(founder.bioKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Partnership Banner */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 bg-primary-container border border-outline-variant rounded-lg p-8 md:p-10 hover:border-nebula-gold/50 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <Users size={32} className="text-nebula-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-headline text-headline-md text-on-surface">
                  {t('partnership_title')}
                </h3>
                <p className="font-body text-body-md text-on-surface-variant mt-3">
                  {t('partnership_desc')}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
