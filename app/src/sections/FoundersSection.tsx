import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';
import SectionHeader from '@/components/SectionHeader';
import { Users, Package, ExternalLink } from 'lucide-react';

const founders = [
  {
    nameKey: 'founder1.name',
    roleKey: 'founder1.role',
    bioKey: 'founder1.bio',
    image: '/assets/founder-ismael.jpg',
    links: [
      { label: 'ismaelmarin.dev', href: 'https://ismaelmarin.dev' },
      { label: 'GitHub', href: 'https://github.com/igmarin' },
    ],
  },
  {
    nameKey: 'founder2.name',
    roleKey: 'founder2.role',
    bioKey: 'founder2.bio',
    image: '/assets/founder-carlos.jpg',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mumoc' },
      { label: 'GitHub', href: 'https://github.com/mumoc' },
    ],
  },
] as const;

const projects = [
  {
    nameKey: 'proof.project1.name',
    descKey: 'proof.project1.desc',
    metricKey: 'proof.project1.metric',
    linkLabelKey: 'proof.project1.link_label',
    href: 'https://rubygems.org/gems/rails-ai-bridge',
  },
  {
    nameKey: 'proof.project2.name',
    descKey: 'proof.project2.desc',
    metricKey: 'proof.project2.metric',
    linkLabelKey: 'proof.project2.link_label',
    href: 'https://rubygems.org/gems/ruby-skill-bench',
  },
  {
    nameKey: 'proof.project3.name',
    descKey: 'proof.project3.desc',
    metricKey: 'proof.project3.metric',
    linkLabelKey: 'proof.project3.link_label',
    href: 'https://docs.rs/rs-guard',
  },
] as const;

export default function FoundersSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="founders" className="py-24 bg-surface-container-high border-t border-outline-variant/50">
      <SectionHeader labelKey="founders.label" headlineKey="founders.headline" />

      <ScrollReveal>
        <p className="max-w-3xl mx-auto text-center font-body text-body-lg text-on-surface-variant mb-16">
          {t('founders.intro')}
        </p>
      </ScrollReveal>

      {/* Founders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {founders.map((founder, i) => (
          <ScrollReveal key={founder.nameKey} delay={i * 0.15}>
            <div className="h-full">
              <div className="rounded-lg overflow-hidden aspect-[3/4] max-h-[420px] relative border border-outline-variant">
                <img
                  src={founder.image}
                  alt={t(founder.nameKey)}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian-base/80 to-transparent pointer-events-none" />
              </div>
              <h3 className="font-headline text-headline-md text-on-surface mt-6">
                {t(founder.nameKey)}
              </h3>
              <p className="font-tech text-tech-label text-nebula-gold mt-1">
                {t(founder.roleKey)}
              </p>
              <p className="font-body text-body-md text-on-surface-variant mt-3 text-justify">
                {t(founder.bioKey)}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {founder.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-tech text-tech-data text-on-surface-variant hover:text-nebula-gold transition-colors duration-200"
                  >
                    <ExternalLink size={12} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Verified open-source proof */}
      <ScrollReveal delay={0.2}>
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <Package size={18} className="text-nebula-gold" />
            <h3 className="font-tech text-tech-label text-nebula-gold uppercase tracking-[0.15em]">
              {t('proof.label')}
            </h3>
          </div>
          <p className="font-headline text-headline-md text-on-surface text-center mb-4">
            {t('proof.headline')}
          </p>
          <p className="max-w-2xl mx-auto text-center font-body text-body-md text-on-surface-variant mb-10">
            {t('proof.desc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ScrollReveal key={project.nameKey} delay={0.25 + i * 0.1}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full card-base border border-outline-variant hover:border-nebula-gold/50 transition-colors duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-tech text-tech-label text-on-surface font-semibold">
                        {t(project.nameKey)}
                      </h4>
                      <ExternalLink size={14} className="text-nebula-gold flex-shrink-0" />
                    </div>
                    <p className="font-body text-body-md text-on-surface-variant mt-3">
                      {t(project.descKey)}
                    </p>
                    <p className="font-tech text-tech-data text-nebula-gold mt-4">
                      {t(project.metricKey)}
                    </p>
                    <span className="font-tech text-tech-data text-on-tertiary-container mt-2 inline-block">
                      {t(project.linkLabelKey)} &rarr;
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center font-tech text-tech-label text-on-surface-variant mt-8">
            {t('proof.downloads_label')}
          </p>
        </div>
      </ScrollReveal>

      {/* Partnership */}
      <ScrollReveal delay={0.3}>
        <div className="mt-16 card-base border-l-4 border-nebula-gold p-8 md:p-10">
          <div className="flex items-start gap-4">
            <Users size={32} className="text-nebula-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-headline text-headline-md text-on-surface">
                {t('partnership.title')}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mt-3 text-justify">
                {t('partnership.desc')}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}