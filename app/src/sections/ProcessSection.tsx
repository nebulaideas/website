import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';

const steps = [
  { num: '01', titleKey: 'step1_title', descKey: 'step1_desc' },
  { num: '02', titleKey: 'step2_title', descKey: 'step2_desc' },
  { num: '03', titleKey: 'step3_title', descKey: 'step3_desc' },
  { num: '04', titleKey: 'step4_title', descKey: 'step4_desc' },
] as const;

export default function ProcessSection() {
  const { t } = useLanguage();
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLineHeight(100);
      return;
    }

    const el = lineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineHeight(100);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="bg-deep-blue section-padding">
      <div className="container-main">
        <ScrollReveal>
          <span className="section-label">{t('process_label')}</span>
          <h2 className="text-h2 text-white mt-3">{t('process_headline')}</h2>
        </ScrollReveal>

        {/* Timeline */}
        <div ref={lineRef} className="relative mt-16">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-amber to-[rgba(255,184,0,0.2)] transition-all duration-[1200ms] ease-out"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.2}>
                <div className="relative flex items-start gap-6 md:gap-10 pl-2 md:pl-4">
                  {/* Node */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-amber border-[3px] border-deep-blue flex-shrink-0 mt-1.5" />

                  {/* Content */}
                  <div className="flex-1">
                    <span className="text-[4rem] font-bold text-amber/40 leading-none select-none">
                      {step.num}
                    </span>
                    <h3 className="text-h3 text-white mt-2">{t(step.titleKey)}</h3>
                    <p className="text-body-sm text-white/75 mt-3 max-w-xl">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
