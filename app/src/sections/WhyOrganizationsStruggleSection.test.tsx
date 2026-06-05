import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import WhyOrganizationsStruggleSection from './WhyOrganizationsStruggleSection';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('WhyOrganizationsStruggleSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () => {
    return render(
      <LanguageProvider>
        <WhyOrganizationsStruggleSection />
      </LanguageProvider>
    );
  };

  it('should render headline and lede text', () => {
    renderSection();
    expect(screen.getByText('Why Organizations Struggle With AI')).toBeInTheDocument();
    expect(screen.getByText('Most organizations do not have an AI problem.')).toBeInTheDocument();
    expect(screen.getByText('They have a clarity problem.')).toBeInTheDocument();
  });

  it('should render body text', () => {
    renderSection();
    expect(screen.getByText(/Teams are moving fast/)).toBeInTheDocument();
  });

  it('should render results label and all result items', () => {
    renderSection();
    expect(screen.getByText('The result is often predictable:')).toBeInTheDocument();
    expect(screen.getByText('Automation applied to inefficient processes')).toBeInTheDocument();
    expect(screen.getByText('AI initiatives without measurable outcomes')).toBeInTheDocument();
    expect(screen.getByText('Teams working toward different goals')).toBeInTheDocument();
    expect(screen.getByText('Growing technical and operational complexity')).toBeInTheDocument();
    expect(screen.getByText('Increasing costs without proportional value')).toBeInTheDocument();
  });

  it('should render amplify quote', () => {
    renderSection();
    expect(screen.getByText('Technology amplifies systems.')).toBeInTheDocument();
    expect(screen.getByText('If the system lacks clarity, technology amplifies confusion.')).toBeInTheDocument();
  });
});
