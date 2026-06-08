import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HeroSection from './HeroSection';
import { LanguageProvider } from '@/hooks/useLanguage';

vi.mock('@/hooks/useConstellationBackground', () => ({
  useConstellationBackground: () => ({ loaded: true }),
}));

describe('HeroSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () => {
    return render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );
  };

  it('should render headline', () => {
    renderSection();
    expect(screen.getByText('AI is an amplifier.')).toBeInTheDocument();
  });

  it('should render subheadline', () => {
    renderSection();
    expect(screen.getByText('Understand before you amplify.')).toBeInTheDocument();
  });

  it('should render supporting text', () => {
    renderSection();
    expect(screen.getByText(/The best outcomes emerge when people, context, and technology work together/)).toBeInTheDocument();
  });

  it('should render tagline', () => {
    renderSection();
    expect(screen.getByText('Work With AI. Not Around It.')).toBeInTheDocument();
  });

  it('should render CTA button', () => {
    renderSection();
    expect(screen.getByText('Learn About the Clarity Sprint')).toBeInTheDocument();
  });

  it('should render canvas container', () => {
    renderSection();
    const canvasContainer = document.querySelector('div[aria-hidden="true"]');
    expect(canvasContainer).toBeInTheDocument();
  });

  it('should render all text elements in English by default', () => {
    renderSection();
    expect(screen.getByText('AI is an amplifier.')).toBeInTheDocument();
    expect(screen.getByText('Understand before you amplify.')).toBeInTheDocument();
    expect(screen.getByText('Work With AI. Not Around It.')).toBeInTheDocument();
    expect(screen.getByText('Learn About the Clarity Sprint')).toBeInTheDocument();
  });
});
