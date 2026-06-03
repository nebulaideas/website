import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import { Terminal } from 'lucide-react';

const stackItems = {
  app: ['Ruby on Rails', 'Go', 'Rust', 'Python', 'TypeScript'],
  infra: ['Google Cloud Platform (GCP)', 'Google Kubernetes Engine (GKE)', 'Docker', 'Cloudflare'],
  edge: ['Cloudflare Access'],
};

export default function EngineeringDNASection() {
  const { t } = useLanguage();

  return (
    <section id="our-dna" className="w-full py-24 border-y border-outline-variant/30 relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#45474b 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-main relative z-10 flex flex-col md:flex-row gap-16 items-start">
        {/* Left column */}
        <ScrollReveal className="md:w-1/3">
          <span className="font-tech text-tech-label text-syntax-green uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
            <Terminal size={16} />
            {t('dna_label')}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface mb-6">
            {t('dna_headline')}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mb-8">
            {t('dna_desc')}
          </p>
          <div className="h-px w-full bg-outline-variant mb-8" />
          <p className="font-tech text-tech-data text-outline">
            {t('dna_metrics')}
          </p>
        </ScrollReveal>

        {/* Right column: Terminal-style stack */}
        <ScrollReveal delay={0.15} className="md:w-2/3 w-full">
          <div className="w-full bg-surface-container border border-outline-variant rounded-lg p-8 font-tech hover:border-outline transition-colors duration-300">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-outline-variant pb-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <div className="w-3 h-3 rounded-full bg-syntax-green" />
              <span className="ml-4 text-outline text-tech-data">{t('dna_filename')}</span>
            </div>

            {/* Stack content */}
            <div className="space-y-6">
              {/* Application Layer */}
              <div>
                <span className="text-syntax-blue block mb-3 text-[13px] uppercase tracking-wider">
                  {t('dna_layer_app')}
                </span>
                <div className="flex flex-wrap gap-3">
                  {stackItems.app.map((item) => (
                    <span
                      key={item}
                      className="bg-obsidian-base border border-outline-variant px-4 py-2 rounded text-on-surface hover:border-nebula-gold hover:text-nebula-gold cursor-default transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div>
                <span className="text-syntax-blue block mb-3 text-[13px] uppercase tracking-wider">
                  {t('dna_layer_infra')}
                </span>
                <div className="flex flex-wrap gap-3">
                  {stackItems.infra.map((item) => (
                    <span
                      key={item}
                      className="bg-obsidian-base border border-outline-variant px-4 py-2 rounded text-on-surface hover:border-nebula-gold hover:text-nebula-gold cursor-default transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Edge & Security */}
              <div>
                <span className="text-syntax-blue block mb-3 text-[13px] uppercase tracking-wider">
                  {t('dna_layer_edge')}
                </span>
                <div className="flex flex-wrap gap-3">
                  {stackItems.edge.map((item) => (
                    <span
                      key={item}
                      className="bg-obsidian-base border border-outline-variant px-4 py-2 rounded text-on-surface hover:border-nebula-gold hover:text-nebula-gold cursor-default transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
