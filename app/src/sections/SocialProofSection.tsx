import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Radio, Download, Globe } from 'lucide-react';

export default function SocialProofSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12 md:py-16 border-y border-outline-variant/30 bg-surface-container-low">
      <div className="container-main">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Stat 1: Radio */}
            <div className="flex flex-col items-center text-center gap-2">
              <Radio size={22} className="text-nebula-gold" />
              <span className="font-tech text-tech-label text-on-surface text-center">
                {t('stat_radio')}
              </span>
            </div>

            {/* Stat 2: Downloads */}
            <div className="flex flex-col items-center text-center gap-1">
              <Download size={22} className="text-nebula-gold mb-1" />
              <span className="font-headline text-[28px] font-bold text-on-surface leading-none">
                {t('stat_downloads_number')}
              </span>
              <span className="font-tech text-tech-data text-on-surface-variant text-center">
                {t('stat_downloads_label')}
              </span>
            </div>

            {/* Stat 3: Years */}
            <div className="flex flex-col items-center text-center gap-1">
              <span className="font-headline text-[28px] font-bold text-on-surface leading-none">
                {t('stat_years_number')}
              </span>
              <span className="font-tech text-tech-data text-on-surface-variant text-center">
                {t('stat_years_label')}
              </span>
            </div>

            {/* Stat 4: Geography */}
            <div className="flex flex-col items-center text-center gap-2">
              <Globe size={20} className="text-on-surface" />
              <span className="font-tech text-tech-label text-on-surface text-center">
                {t('stat_geo')}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
