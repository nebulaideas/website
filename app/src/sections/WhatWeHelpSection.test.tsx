import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import WhatWeHelpSection from './WhatWeHelpSection';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('WhatWeHelpSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () => {
    return render(
      <LanguageProvider>
        <WhatWeHelpSection />
      </LanguageProvider>
    );
  };

  it('should render label and headline', () => {
    renderSection();
    expect(screen.getByText('SERVICES')).toBeInTheDocument();
    expect(screen.getByText('What We Help With')).toBeInTheDocument();
  });

  it('should render all four service cards', () => {
    renderSection();
    expect(screen.getByText('AI & Automation Strategy')).toBeInTheDocument();
    expect(screen.getByText('Architecture & Technical Assessment')).toBeInTheDocument();
    expect(screen.getByText('Product & Process Alignment')).toBeInTheDocument();
    expect(screen.getByText('Engineering Leadership & Advisory')).toBeInTheDocument();
  });

  it('should render service descriptions', () => {
    renderSection();
    expect(screen.getByText(/Identify where AI can create measurable value/)).toBeInTheDocument();
    expect(screen.getByText(/Connect business goals/)).toBeInTheDocument();
    expect(screen.getByText(/Support organizational growth/)).toBeInTheDocument();
  });
});
