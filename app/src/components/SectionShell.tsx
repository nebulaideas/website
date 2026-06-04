import type { ReactNode } from 'react';

interface SectionShellProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export default function SectionShell({ id, className = '', containerClassName = '', children }: SectionShellProps) {
  return (
    <section id={id} className={`w-full ${className}`}>
      <div className={`container-main ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
