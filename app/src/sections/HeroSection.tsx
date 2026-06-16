import { useRef, useCallback, useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useConstellationBackground } from '@/hooks/useConstellationBackground';

export default function HeroSection() {
  const { t } = useLanguage();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const particleCount = useMemo(() => window.innerWidth < 768 ? 35 : 70, []);
  const bgConfig = useMemo(() => ({
    particleCount,
    goldRatio: 0.6,
    goldOpacity: 0.6,
    blueOpacity: 0.25,
    connectionOpacity: 0.08,
    connectionMaxDist: 7,
    connectionMaxConnections: 180,
    cameraZ: 28,
    mouseTracking: true,
    lights: true,
  }), [particleCount]);
  useConstellationBackground(canvasContainerRef, bgConfig);

  const handleScrollTo = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header id="top" className="relative w-full flex flex-col items-center justify-center text-center min-h-screen overflow-hidden">
      <div ref={canvasContainerRef} className="absolute inset-0 z-0" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-margin-mobile md:px-margin-desktop py-28 md:py-40">
        <h1
          className="font-display text-display-lg text-on-surface mb-10 tracking-tight leading-[1.05] max-w-[900px]"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.6), 0 0 80px rgba(1,4,9,0.8)' }}
        >
          {t('hero.headline')}
        </h1>

        <h2
          className="font-headline text-headline-md text-on-surface-variant max-w-3xl mx-auto mb-6 leading-relaxed"
          style={{ textShadow: '0 1px 20px rgba(0,0,0,0.5)' }}
        >
          {t('hero.subheadline')}
        </h2>

        <p
          className="font-body text-body-md text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {t('hero.supporting')}
        </p>

        <p
          className="font-display text-[28px] md:text-[36px] font-bold text-nebula-gold leading-tight mb-10"
        >
          {t('hero.tagline')}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#clarity-sprint"
            onClick={(e) => handleScrollTo(e, '#clarity-sprint')}
            className="btn-gold px-8 py-4 min-w-[200px]"
          >
            {t('hero.cta_primary')}
          </a>
        </div>
      </div>
    </header>
  );
}
