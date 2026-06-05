import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import PrinciplesSection from './PrinciplesSection';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('PrinciplesSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () => {
    return render(
      <LanguageProvider>
        <PrinciplesSection />
      </LanguageProvider>
    );
  };

  it('should render label and headline', () => {
    renderSection();
    expect(screen.getByText('PRINCIPLES')).toBeInTheDocument();
    expect(screen.getByText('Principles That Guide Us')).toBeInTheDocument();
  });

  it('should render all four principle cards', () => {
    renderSection();
    expect(screen.getByText('Understand Before Amplifying')).toBeInTheDocument();
    expect(screen.getByText('Outcomes Over Activity')).toBeInTheDocument();
    expect(screen.getByText('Human-Centered Automation')).toBeInTheDocument();
    expect(screen.getByText('Continuous Evolution')).toBeInTheDocument();
  });

  it('should render principle descriptions', () => {
    renderSection();
    expect(screen.getByText('Technology amplifies existing systems. Improve understanding first.')).toBeInTheDocument();
    expect(screen.getByText('Measure impact, not motion.')).toBeInTheDocument();
    expect(screen.getByText('Keep people where judgment creates value.')).toBeInTheDocument();
    expect(screen.getByText('Prefer practical progress over large-scale disruption.')).toBeInTheDocument();
  });
});
