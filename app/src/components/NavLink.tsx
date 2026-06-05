import { useLanguage } from '@/hooks/useLanguage';
import type { TranslationKey } from '@/lib/translations';

interface NavLinkProps {
  labelKey: TranslationKey;
  href: string;
  isActive: boolean;
  variant: 'desktop' | 'mobile';
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const desktopClasses =
  'font-tech text-tech-label uppercase transition-colors duration-200 hover:text-nebula-gold whitespace-nowrap max-w-[140px] lg:max-w-none truncate';
const mobileClasses =
  'text-2xl font-medium font-headline transition-colors duration-250 hover:text-nebula-gold';

export default function NavLink({ labelKey, href, isActive, variant, onClick }: NavLinkProps) {
  const { t } = useLanguage();

  const baseClass = variant === 'desktop' ? desktopClasses : mobileClasses;
  const activeClass = isActive ? 'text-nebula-gold' : variant === 'desktop' ? 'text-on-surface-variant' : 'text-on-surface';

  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      className={`${baseClass} ${activeClass}`}
    >
      {t(labelKey)}
    </a>
  );
}
