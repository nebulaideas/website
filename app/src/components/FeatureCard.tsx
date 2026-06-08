import type { ElementType } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface FeatureCardProps {
  icon?: ElementType;
  iconSize?: number;
  title: string;
  description: string;
  number?: string;
  variant?: 'default' | 'compact' | 'minimal';
  delay?: number;
}

export default function FeatureCard({
  icon: Icon,
  iconSize = 24,
  title,
  description,
  number,
  variant = 'default',
  delay = 0,
}: FeatureCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <div className={`card-base h-full border-none ${variant === 'default' ? 'p-8' : 'p-6'} ${variant === 'default' ? '' : 'flex flex-col'}`}>
        {Icon && variant === 'default' && (
          <div className="w-12 h-12 icon-box mb-6">
            <Icon size={iconSize} className="text-nebula-gold" />
          </div>
        )}
        {Icon && variant === 'compact' && (
          <div className="flex items-center gap-3 mb-4">
            {number && <span className="font-tech text-tech-data text-nebula-gold">{number}</span>}
            <div className="w-10 h-10 icon-box">
              <Icon size={20} className="text-nebula-gold" />
            </div>
          </div>
        )}
        {!Icon && number && (
          <span className="font-tech text-tech-data text-nebula-gold mb-2 block">{number}</span>
        )}
        <h3 className={`font-headline text-headline-md text-on-surface ${variant === 'default' ? 'mb-3' : 'mb-2'}`}>
          {title}
        </h3>
        <p className="font-body text-body-md text-on-surface-variant flex-grow text-justify">
          {description}
        </p>
      </div>
    </ScrollReveal>
  );
}
