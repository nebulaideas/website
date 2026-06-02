import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Radio, Download, Globe } from 'lucide-react';

export default function SocialProofSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="container-main">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
            {/* Stat 1: Radio */}
            <div className="flex flex-col items-center text-center gap-2">
              <Radio size={24} className="text-amber" />
              <span className="text-caption text-deep-blue font-medium">
                {t('stat_radio')}
              </span>
            </div>

            {/* Stat 2: Downloads */}
            <div className="flex flex-col items-center text-center gap-1">
              <Download size={24} className="text-amber mb-1" />
              <span className="text-[2rem] font-bold text-deep-blue leading-none tracking-tight">
                {t('stat_downloads_number')}
              </span>
              <span className="text-caption text-text-secondary">
                {t('stat_downloads_label')}
              </span>
            </div>

            {/* Stat 3: Years */}
            <div className="flex flex-col items-center text-center gap-1">
              <span className="text-[2rem] font-bold text-deep-blue leading-none tracking-tight">
                {t('stat_years_number')}
              </span>
              <span className="text-caption text-text-secondary">
                {t('stat_years_label')}
              </span>
            </div>

            {/* Stat 4: Geography */}
            <div className="flex flex-col items-center text-center gap-2">
              <Globe size={20} className="text-deep-blue" />
              <span className="text-caption text-deep-blue font-medium">
                {t('stat_geo')}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
