import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import BeyondClaritySprintSection from './BeyondClaritySprintSection';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('BeyondClaritySprintSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () => {
    return render(
      <LanguageProvider>
        <BeyondClaritySprintSection />
      </LanguageProvider>
    );
  };

  it('should render headline', () => {
    renderSection();
    expect(screen.getByText('Beyond the Clarity Sprint')).toBeInTheDocument();
  });

  it('should render approach narrative', () => {
    renderSection();
    expect(screen.getByText('Clarity is usually where the work begins.')).toBeInTheDocument();
    expect(screen.getByText(/shared understanding of your current reality/)).toBeInTheDocument();
    expect(screen.getByText(/What happens next depends/)).toBeInTheDocument();
    expect(screen.getByText(/Some organizations need guidance/)).toBeInTheDocument();
    expect(screen.getByText(/areas where we frequently help/)).toBeInTheDocument();
  });

  it('should render all four service cards', () => {
    renderSection();
    expect(screen.getByText('AI & Automation Strategy')).toBeInTheDocument();
    expect(screen.getByText('Architecture & Technical Assessment')).toBeInTheDocument();
    expect(screen.getByText('Product & Process Alignment')).toBeInTheDocument();
    expect(screen.getByText('Engineering Leadership & Advisory')).toBeInTheDocument();
  });
});
