import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ClaritySprintSection from './ClaritySprintSection';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('ClaritySprintSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () => {
    return render(
      <LanguageProvider>
        <ClaritySprintSection />
      </LanguageProvider>
    );
  };

  it('should render headline', () => {
    renderSection();
    expect(screen.getByText('The Nebula Clarity Sprint')).toBeInTheDocument();
  });

  it('should render subtitle and description', () => {
    renderSection();
    expect(screen.getByText('Understand before you decide.')).toBeInTheDocument();
    expect(screen.getByText(/The Nebula Clarity Sprint helps organizations understand their current reality/)).toBeInTheDocument();
  });

  it('should render evaluation label', () => {
    renderSection();
    expect(screen.getByText('What We Seek to Understand')).toBeInTheDocument();
  });

  it('should render all four evaluation areas', () => {
    renderSection();
    expect(screen.getByText('Context & Objectives')).toBeInTheDocument();
    expect(screen.getByText('Ways of Working')).toBeInTheDocument();
    expect(screen.getByText('Technology & Constraints')).toBeInTheDocument();
    expect(screen.getByText('AI & Automation Opportunities')).toBeInTheDocument();
  });

  it('should render evaluation descriptions', () => {
    renderSection();
    expect(screen.getByText('What the organization is trying to achieve and what matters most.')).toBeInTheDocument();
    expect(screen.getByText('How work actually flows across teams, processes, and systems.')).toBeInTheDocument();
    expect(screen.getByText('What capabilities exist today and what may be limiting progress.')).toBeInTheDocument();
    expect(screen.getByText('Where AI can create meaningful value and support better decision-making.')).toBeInTheDocument();
  });

  it('should render deliverable label', () => {
    renderSection();
    expect(screen.getByText("What You'll Gain")).toBeInTheDocument();
  });

  it('should render all six deliverables', () => {
    renderSection();
    expect(screen.getByText('A Clear View of the Current Situation')).toBeInTheDocument();
    expect(screen.getByText('Key Risks and Points of Friction')).toBeInTheDocument();
    expect(screen.getByText('Prioritized Opportunities')).toBeInTheDocument();
    expect(screen.getByText('Practical Recommendations for Next Steps')).toBeInTheDocument();
    expect(screen.getByText('Guidance on AI & Automation')).toBeInTheDocument();
    expect(screen.getByText('An Initial Action Plan')).toBeInTheDocument();
  });

  it('should render deliverable footer', () => {
    renderSection();
    expect(screen.getByText('Clarity to decide what comes next.')).toBeInTheDocument();
  });

  it('should render CTA button', () => {
    renderSection();
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
  });
});
