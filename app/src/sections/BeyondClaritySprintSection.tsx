import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { BrainCircuit, Building2, GitBranch, Users } from 'lucide-react';

const services = [
  { titleKey: 'services.items.1.title', descKey: 'services.items.1.desc', icon: BrainCircuit },
  { titleKey: 'services.items.2.title', descKey: 'services.items.2.desc', icon: Building2 },
  { titleKey: 'services.items.3.title', descKey: 'services.items.3.desc', icon: GitBranch },
  { titleKey: 'services.items.4.title', descKey: 'services.items.4.desc', icon: Users },
] as const;

export default function BeyondClaritySprintSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="beyond-clarity-sprint" className="py-24 bg-surface-container-lowest">
      <SectionHeader headlineKey="services.headline" />

      <ScrollReveal>
        <div className="max-w-[640px] mx-auto space-y-5 mb-16 text-center">
          <p className="font-headline text-headline-md text-nebula-gold">
            {t('approach.sub')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed text-justify">
            {t('approach.body')}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {services.map((service, i) => (
          <FeatureCard
            key={service.titleKey}
            icon={service.icon}
            title={t(service.titleKey)}
            description={t(service.descKey)}
            delay={i * 0.1}
            centered
          />
        ))}
      </div>
    </SectionShell>
  );
}
