import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';
import SectionHeader from '@/components/SectionHeader';
import { Users, Lightbulb, ChevronDown } from 'lucide-react';

const founders = [
  {
    nameKey: 'founder1_name',
    roleKey: 'founder1_role',
    bioKey: 'founder1_bio',
    image: '/assets/founder-ismael.jpg',
  },
  {
    nameKey: 'founder2_name',
    roleKey: 'founder2_role',
    bioKey: 'founder2_bio',
    image: '/assets/founder-carlos.jpg',
  },
] as const;

const perspectives = [
  'about_perspective1',
  'about_perspective2',
  'about_perspective3',
  'about_perspective4',
  'about_perspective5',
] as const;

export default function AboutSection() {
  const { t } = useLanguage();
  const [expandedBios, setExpandedBios] = useState<Set<number>>(new Set());

  const toggleBio = (index: number) => {
    setExpandedBios((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <SectionShell id="about" className="py-24 md:py-32 bg-obsidian-base">
      <SectionHeader labelKey="about_label" headlineKey="about_headline" />

      <ScrollReveal delay={0.1}>
        <div className="max-w-content-default mb-12">
          <p className="font-body text-body-lg text-on-surface mb-4">
            {t('about_intro')}
          </p>
          <p className="font-body text-body-md text-on-surface-variant mb-6">
            {t('about_detail')}
          </p>
          <span className="font-tech text-tech-label text-on-surface-variant uppercase tracking-[0.1em] block mb-4">
            {t('about_perspectives_label')}
          </span>
          <div className="flex flex-wrap gap-3">
            {perspectives.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 icon-box px-4 py-2 rounded font-tech text-tech-data text-on-surface"
              >
                <Lightbulb size={14} className="text-nebula-gold" />
                {t(key)}
              </span>
            ))}
          </div>
          <div className="mt-8 card-base border-l-4 border-nebula-gold p-5">
            <p className="font-body text-body-md text-on-surface-variant italic">
              {t('about_insight')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {founders.map((founder, i) => (
          <ScrollReveal key={founder.nameKey} delay={0.2 + i * 0.15}>
            <div className="h-full">
              <div className="rounded-lg overflow-hidden aspect-[3/4] max-h-[420px] relative border border-outline-variant">
                <img
                  src={founder.image}
                  alt={t(founder.nameKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian-base/80 to-transparent pointer-events-none" />
              </div>
              <h3 className="font-headline text-headline-md text-on-surface mt-6">
                {t(founder.nameKey)}
              </h3>
              <p className="font-tech text-tech-label text-on-surface-variant mt-1">
                {t(founder.roleKey)}
              </p>
              <div className="mt-3">
                <p
                  id={`bio-${i}`}
                  className={`font-body text-body-md text-on-surface-variant ${
                    expandedBios.has(i) ? '' : 'line-clamp-3'
                  }`}
                >
                  {t(founder.bioKey)}
                </p>
                <button
                  onClick={() => toggleBio(i)}
                  aria-expanded={expandedBios.has(i)}
                  aria-controls={`bio-${i}`}
                  aria-label={`${expandedBios.has(i) ? 'Collapse' : 'Expand'} ${t(founder.nameKey)} bio`}
                  className="mt-2 flex items-center gap-1 text-nebula-gold font-tech text-tech-label hover:text-nebula-gold-hover transition-colors duration-200"
                >
                  {expandedBios.has(i) ? t('bio_read_less') : t('bio_read_more')}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${
                    expandedBios.has(i) ? 'rotate-180' : ''
                  }`} />
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-12 card-base p-8 md:p-10 hover:border-nebula-gold/50 transition-colors duration-300">
          <div className="flex items-start gap-4">
            <Users size={32} className="text-nebula-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-headline text-headline-md text-on-surface">
                {t('partnership_title')}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mt-3">
                {t('partnership_desc')}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
