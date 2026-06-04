import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';
import { XCircle, Target, Users, Layers, TrendingUp } from 'lucide-react';

const results = [
  { key: 'struggle_result1', icon: XCircle },
  { key: 'struggle_result2', icon: Target },
  { key: 'struggle_result3', icon: Users },
  { key: 'struggle_result4', icon: Layers },
  { key: 'struggle_result5', icon: TrendingUp },
] as const;

export default function WhyOrganizationsStruggleSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="why-struggle" className="py-24 bg-surface-container-lowest border-y border-outline-variant/30" containerClassName="max-w-4xl">
      <ScrollReveal>
        <h2 className="font-headline text-headline-lg text-on-surface mb-10">
          {t('struggle_headline')}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="font-body text-body-lg text-on-surface mb-2">
          {t('struggle_lede1')}
        </p>
        <p className="font-display text-[28px] md:text-[36px] font-bold text-nebula-gold mb-8 leading-tight">
          {t('struggle_lede2')}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="font-body text-body-md text-on-surface-variant mb-12 max-w-3xl">
          {t('struggle_body')}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <span className="font-tech text-tech-label text-on-surface-variant uppercase tracking-[0.1em] block mb-6">
          {t('struggle_results_label')}
        </span>
        <ul className="space-y-4 mb-16">
          {results.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.key} className="flex items-center gap-4">
                <Icon size={20} className="text-outline-variant flex-shrink-0" />
                <span className="font-body text-body-md text-on-surface">{t(item.key)}</span>
              </li>
            );
          })}
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="card-base border-l-4 border-nebula-gold p-8">
          <p className="font-body text-body-lg text-on-surface mb-2">
            {t('struggle_amplify')}
          </p>
          <p className="font-headline text-headline-md text-nebula-gold">
            {t('struggle_amplify_result')}
          </p>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
