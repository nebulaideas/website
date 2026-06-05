import { useLanguage } from '@/hooks/useLanguage';
import type { TranslationKey } from '@/lib/translations';

interface SectionHeaderProps {
  labelKey?: TranslationKey;
  headlineKey: TranslationKey;
  labelColor?: 'gold' | 'muted';
  center?: boolean;
}

export default function SectionHeader({ labelKey, headlineKey, labelColor = 'gold', center = true }: SectionHeaderProps) {
  const { t } = useLanguage();
  const colorClass = labelColor === 'gold' ? 'text-nebula-gold' : 'text-on-surface-variant';

  return (
    <div className={center ? 'text-center mb-16' : 'mb-12'}>
      {labelKey && (
        <span className={`font-tech text-tech-label ${colorClass} uppercase tracking-[0.15em] block mb-4`}>
          {t(labelKey)}
        </span>
      )}
      <h2 className="font-headline text-headline-lg text-on-surface">
        {t(headlineKey)}
      </h2>
    </div>
  );
}
