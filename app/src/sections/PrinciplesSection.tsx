import { useLanguage } from '@/hooks/useLanguage';
import SectionShell from '@/components/SectionShell';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { Eye, Target, Heart, RefreshCw } from 'lucide-react';

const principles = [
  {
    titleKey: 'principle1_title',
    descKey: 'principle1_desc',
    icon: Eye,
    number: '01',
  },
  {
    titleKey: 'principle2_title',
    descKey: 'principle2_desc',
    icon: Target,
    number: '02',
  },
  {
    titleKey: 'principle3_title',
    descKey: 'principle3_desc',
    icon: Heart,
    number: '03',
  },
  {
    titleKey: 'principle4_title',
    descKey: 'principle4_desc',
    icon: RefreshCw,
    number: '04',
  },
] as const;

export default function PrinciplesSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="principles" className="py-24 bg-surface-container-high border-b border-outline-variant/30">
      <SectionHeader labelKey="principles_label" headlineKey="principles_headline" labelColor="muted" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {principles.map((principle, i) => (
          <FeatureCard
            key={principle.titleKey}
            icon={principle.icon}
            iconSize={20}
            title={t(principle.titleKey)}
            description={t(principle.descKey)}
            number={principle.number}
            variant="compact"
            delay={i * 0.1}
          />
        ))}
      </div>
    </SectionShell>
  );
}
