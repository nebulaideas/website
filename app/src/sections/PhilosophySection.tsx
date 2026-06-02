import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';

export default function PhilosophySection() {
  const { t } = useLanguage();
  const dividerRef = useRef<HTMLDivElement>(null);
  const [dividerVisible, setDividerVisible] = useState(false);

  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDividerVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-24 md:py-32 bg-surface border-y border-outline-variant/30">
      <div className="container-main max-w-[800px] text-center">
        <ScrollReveal>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-on-surface leading-tight tracking-tight font-display">
            {t('philosophy_headline')}
          </h2>
        </ScrollReveal>

        <div ref={dividerRef} className="my-8 flex justify-center">
          <div
            className="h-[3px] bg-nebula-gold transition-all duration-500 ease-out"
            style={{ width: dividerVisible ? '60px' : '0px' }}
          />
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-[720px] mx-auto">
            {t('philosophy_body')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <p className="font-tech text-tech-label text-nebula-gold mt-6 uppercase tracking-[0.1em]">
            {t('philosophy_attribution')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
