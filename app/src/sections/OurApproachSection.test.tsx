import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import OurApproachSection from './OurApproachSection';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('OurApproachSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () => {
    return render(
      <LanguageProvider>
        <OurApproachSection />
      </LanguageProvider>
    );
  };

  it('should render label and subtitle', () => {
    renderSection();
    expect(screen.getByText('Our Approach')).toBeInTheDocument();
    expect(screen.getByText('Work With AI. Not Around It.')).toBeInTheDocument();
  });

  it('should render body paragraphs', () => {
    renderSection();
    expect(screen.getByText(/best results come from combining/)).toBeInTheDocument();
    expect(screen.getByText('AI is not a replacement for people.')).toBeInTheDocument();
    expect(screen.getByText('AI is an amplifier.')).toBeInTheDocument();
    expect(screen.getByText(/not to remove humans/)).toBeInTheDocument();
    expect(screen.getByText(/make better decisions/)).toBeInTheDocument();
  });
});
