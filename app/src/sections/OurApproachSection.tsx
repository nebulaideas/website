import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';

export default function OurApproachSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="our-approach" className="py-24 md:py-32 bg-surface-container-high border-y border-outline-variant/30" containerClassName="max-w-content-narrow text-center">
      <ScrollReveal>
        <span className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em] block mb-4">
          {t('approach_headline')}
        </span>
        <h2 className="font-display text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface leading-tight tracking-tight mb-2 line-clamp-2 md:line-clamp-none">
          {t('approach_sub')}
        </h2>
      </ScrollReveal>

      <div className="w-16 h-[3px] bg-nebula-gold mx-auto my-8" />

      <ScrollReveal delay={0.2}>
        <div className="space-y-6 text-left max-w-[640px] mx-auto">
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body1')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body2')}
          </p>
          <p className="font-display text-[28px] md:text-[36px] font-bold text-nebula-gold leading-tight text-center py-4">
            {t('approach_body3')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body4')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body5')}
          </p>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
