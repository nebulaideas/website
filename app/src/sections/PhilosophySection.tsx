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
      ([entry]) => {
        if (entry.isIntersecting) setDividerVisible(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-deep-blue py-24 md:py-40">
      <div className="container-main max-w-[800px] text-center">
        <ScrollReveal>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-tight tracking-tight">
            {t('philosophy_headline')}
          </h2>
        </ScrollReveal>

        {/* Decorative Divider */}
        <div ref={dividerRef} className="my-8 flex justify-center">
          <div
            className="h-[3px] bg-amber transition-all duration-500 ease-out"
            style={{ width: dividerVisible ? '60px' : '0px' }}
          />
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-xl text-white/80 leading-relaxed max-w-[720px] mx-auto">
            {t('philosophy_body')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <p className="text-caption text-amber mt-6">{t('philosophy_attribution')}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
