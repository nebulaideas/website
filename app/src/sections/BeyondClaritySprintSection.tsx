import { useLanguage } from '@/hooks/useLanguage';
import ScrollReveal from '@/components/ScrollReveal';
import SectionShell from '@/components/SectionShell';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { BrainCircuit, Building2, GitBranch, Users } from 'lucide-react';

const services = [
  {
    titleKey: 'service1_title',
    descKey: 'service1_desc',
    icon: BrainCircuit,
  },
  {
    titleKey: 'service2_title',
    descKey: 'service2_desc',
    icon: Building2,
  },
  {
    titleKey: 'service3_title',
    descKey: 'service3_desc',
    icon: GitBranch,
  },
  {
    titleKey: 'service4_title',
    descKey: 'service4_desc',
    icon: Users,
  },
] as const;

export default function BeyondClaritySprintSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="beyond-clarity-sprint" className="py-24 bg-surface-container-lowest">
      <SectionHeader headlineKey="services_headline" />

      <ScrollReveal>
        <div className="max-w-[640px] mx-auto space-y-5 mb-16 text-center">
          <p className="font-headline text-headline-md text-nebula-gold">
            {t('approach_sub')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body1')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body2')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body3')}
          </p>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            {t('approach_body4')}
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
          />
        ))}
      </div>
    </SectionShell>
  );
}
