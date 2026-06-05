import { useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Calendar } from 'lucide-react';
import { useConstellationBackground } from '@/hooks/useConstellationBackground';

export default function FooterCTASection() {
  const { t, calendlyUrl } = useLanguage();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useConstellationBackground(canvasContainerRef, {
    particleCount: 50,
    particleSize: 0.1,
    cameraZ: 25,
    clearAlpha: 0,
    mouseTracking: false,
    connectionOpacity: 0.05,
    connectionMaxDist: 6,
    connectionMaxConnections: 120,
    distribution: 'galaxy',
    lights: false,
    goldRatio: 0.5,
    goldOpacity: 0.35,
    blueOpacity: 0.15,
  });

  return (
    <section id="schedule" className="relative w-full py-28 md:py-36 bg-obsidian-base text-center overflow-hidden">
      <div ref={canvasContainerRef} className="absolute inset-0 z-0" aria-hidden="true" />

      <div className="container-main max-w-3xl relative z-10">
        <h2
          className="font-display text-display-md text-on-surface mb-6"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
        >
          {t('footer_cta_headline')}
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant mb-4 max-w-2xl mx-auto">
          {t('footer_cta_desc')}
        </p>
        <p className="font-body text-body-md text-on-surface-variant mb-10 max-w-xl mx-auto">
          {t('footer_cta_body')}
        </p>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold px-10 py-5 inline-flex items-center gap-3 text-[16px]"
        >
          {t('footer_cta_button')}
          <Calendar size={20} />
        </a>
      </div>
    </section>
  );
}
