import { useLanguage, useAltCalendly } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import CTAButton from '@/components/CTAButton';
import { Mail, Linkedin } from 'lucide-react';

export default function ContactSection() {
  const { t, calendlyUrl } = useLanguage();
  const altCalendlyUrl = useAltCalendly();

  return (
    <section id="contact" className="bg-deep-blue py-24 md:py-36">
      <div className="container-main max-w-[720px] text-center">
        <ScrollReveal>
          <h2 className="text-h2 text-white">{t('contact_headline')}</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-body text-white/75 mt-4 max-w-[560px] mx-auto">
            {t('contact_subheadline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col items-center gap-4 mt-10">
            <CTAButton
              href={calendlyUrl}
              external
              variant="primary"
              className="px-10 py-[18px] text-lg"
            >
              {t('contact_cta_primary')}
            </CTAButton>
            <CTAButton href={altCalendlyUrl} external variant="secondary">
              {t('contact_cta_secondary')}
            </CTAButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-caption">
            <span className="flex items-center gap-2 text-white/60">
              <Mail size={16} />
              {t('contact_email')}
            </span>
            <a
              href="#"
              className="flex items-center gap-1.5 text-amber hover:underline transition-all"
            >
              <Linkedin size={14} />
              {t('contact_linkedin_ismael')}
            </a>
            <span className="text-white/30">|</span>
            <a
              href="#"
              className="flex items-center gap-1.5 text-amber hover:underline transition-all"
            >
              <Linkedin size={14} />
              {t('contact_linkedin_carlos')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
