import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-amber text-deep-blue font-semibold px-8 py-4 rounded-button shadow-button hover:bg-amber-hover hover:-translate-y-0.5 hover:shadow-button-hover transition-all duration-250',
  secondary:
    'bg-transparent text-white font-semibold px-8 py-4 rounded-button border-[1.5px] border-white/40 hover:border-amber hover:text-amber hover:-translate-y-0.5 transition-all duration-250',
  ghost:
    'bg-transparent text-deep-blue font-semibold px-8 py-4 rounded-button border-[1.5px] border-[rgba(10,25,47,0.2)] hover:border-amber hover:bg-amber-10 transition-all duration-250',
};

export default function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  external = false,
  className = '',
  icon,
}: CTAButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 text-base ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseClasses}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
      {icon}
    </button>
  );
}
