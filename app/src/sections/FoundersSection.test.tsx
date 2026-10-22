import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import FoundersSection from './FoundersSection';
import { LanguageProvider } from '@/hooks/useLanguage';

describe('FoundersSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderSection = () =>
    render(
      <LanguageProvider>
        <FoundersSection />
      </LanguageProvider>
    );

  it('renders both founders with photos and names', () => {
    renderSection();
    expect(screen.getByText('Ismael Marin')).toBeInTheDocument();
    expect(screen.getByText('Carlos (Mumo) Muniz')).toBeInTheDocument();
    expect(screen.getByAltText('Ismael Marin')).toHaveAttribute('src', '/assets/founder-ismael.jpg');
    expect(screen.getByAltText('Carlos (Mumo) Muniz')).toHaveAttribute('src', '/assets/founder-carlos.jpg');
  });

  it('links each founder to verified public profiles', () => {
    renderSection();
    expect(screen.getByRole('link', { name: /ismaelmarin\.dev/i })).toHaveAttribute('href', 'https://ismaelmarin.dev');
    expect(document.querySelector('a[href="https://github.com/igmarin"]')).toBeInTheDocument();
    expect(document.querySelector('a[href="https://www.linkedin.com/in/mumoc"]')).toBeInTheDocument();
    expect(document.querySelector('a[href="https://github.com/mumoc"]')).toBeInTheDocument();
  });

  it('shows the verified open-source projects with real metrics', () => {
    renderSection();
    expect(screen.getByText('rails-ai-bridge')).toBeInTheDocument();
    expect(screen.getByText('ruby-skill-bench')).toBeInTheDocument();
    expect(screen.getByText('rs-guard')).toBeInTheDocument();
    expect(screen.getByText(/11,000\+ RubyGems downloads/i)).toBeInTheDocument();
    expect(screen.getByText(/3,000\+ RubyGems downloads/i)).toBeInTheDocument();
    expect(screen.getByText(/archived/i)).toBeInTheDocument();
  });

  it('links projects to their public registry pages', () => {
    renderSection();
    expect(screen.getByRole('link', { name: /rails-ai-bridge/i })).toHaveAttribute('href', 'https://rubygems.org/gems/rails-ai-bridge');
    expect(screen.getByRole('link', { name: /ruby-skill-bench/i })).toHaveAttribute('href', 'https://rubygems.org/gems/ruby-skill-bench');
    expect(screen.getByRole('link', { name: /rs-guard/i })).toHaveAttribute('href', 'https://docs.rs/rs-guard');
  });

  it('presents rs-guard as archived work', () => {
    renderSection();
    expect(screen.getByText(/archived/i)).toBeInTheDocument();
  });
});