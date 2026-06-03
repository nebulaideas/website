import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { AlertTriangle, Unlink, ShieldAlert } from 'lucide-react';

export default function MarketRealitySection() {
  const { t } = useLanguage();

  return (
    <section id="vision" className="w-full py-24 border-t border-outline-variant/30">
      <div className="container-main">
        {/* Two column grid: The Hype + The Friction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Left: The Hype */}
          <ScrollReveal>
            <div className="flex flex-col justify-center">
              <span className="font-tech text-tech-label text-error uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                {t('vision_label_hype')}
              </span>
              <h2 className="font-headline text-headline-lg text-on-surface mb-6">
                {t('vision_title_hype')}
              </h2>
              <p className="font-body text-body-md text-on-surface-variant mb-8">
                {t('vision_desc_hype')}
              </p>
              {/* Abstract noise visual */}
              <div className="w-full h-64 bg-surface-container rounded border border-outline-variant relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container to-obsidian-base opacity-80" />
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212,175,55,0.08) 0%, transparent 40%),
                                   radial-gradient(circle at 80% 70%, rgba(88,166,255,0.06) 0%, transparent 40%),
                                   repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(69,71,75,0.1) 10px, rgba(69,71,75,0.1) 11px)`,
                }} />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-base to-transparent" />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: The Friction */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col justify-center">
              <span className="font-tech text-tech-label text-syntax-blue uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-syntax-blue" />
                {t('vision_label_friction')}
              </span>
              <h2 className="font-headline text-headline-lg text-on-surface mb-6">
                {t('vision_title_friction')}
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <AlertTriangle size={20} className="text-outline-variant mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-headline text-[18px] text-on-surface mb-1">
                      {t('vision_silo_title')}
                    </h3>
                    <p className="font-body text-[14px] text-on-surface-variant">
                      {t('vision_silo_desc')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Unlink size={20} className="text-outline-variant mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-headline text-[18px] text-on-surface mb-1">
                      {t('vision_fragile_title')}
                    </h3>
                    <p className="font-body text-[14px] text-on-surface-variant">
                      {t('vision_fragile_desc')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <ShieldAlert size={20} className="text-outline-variant mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-headline text-[18px] text-on-surface mb-1">
                      {t('vision_gov_title')}
                    </h3>
                    <p className="font-body text-[14px] text-on-surface-variant">
                      {t('vision_gov_desc')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Blockquote */}
        <ScrollReveal>
          <div className="w-full bg-primary-container border-l-4 border-nebula-gold p-8 md:p-12 relative overflow-hidden">
            <div className="absolute right-[-5%] top-[-20%] opacity-[0.03] pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-on-surface">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
            </div>
            <blockquote className="relative z-10 max-w-4xl mx-auto text-center">
              <p className="font-display text-[24px] md:text-[32px] leading-tight text-on-surface font-light tracking-tight mb-6">
                {t('vision_quote')}
              </p>
              <footer className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em]">
                {t('vision_quote_label')}
              </footer>
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
