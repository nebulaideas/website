import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionHeader from './SectionHeader';
import { LanguageProvider } from '@/hooks/useLanguage';

function renderWithProvider(element: ReactElement) {
  return render(<LanguageProvider>{element}</LanguageProvider>);
}

describe('SectionHeader', () => {
  it('should render with headline only (no labelKey)', () => {
    renderWithProvider(<SectionHeader headlineKey="hero.headline" />);
    expect(screen.getByText('AI is an amplifier.')).toBeInTheDocument();
    // No label span rendered
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  it('should render centered layout by default', () => {
    const { container } = renderWithProvider(<SectionHeader headlineKey="hero.headline" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('text-center');
  });

  it('should render with left alignment when center is false', () => {
    const { container } = renderWithProvider(
      <SectionHeader headlineKey="hero.headline" center={false} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('text-center');
    expect(wrapper.className).toContain('mb-12');
  });

  it('should render label with gold color by default', () => {
    renderWithProvider(
      <SectionHeader headlineKey="hero.headline" labelKey="nav.sprint" />
    );
    const label = screen.getByText('Clarity Sprint');
    expect(label.className).toContain('text-nebula-gold');
  });

  it('should render label with muted color when labelColor is muted', () => {
    renderWithProvider(
      <SectionHeader headlineKey="hero.headline" labelKey="nav.sprint" labelColor="muted" />
    );
    const label = screen.getByText('Clarity Sprint');
    expect(label.className).toContain('text-on-surface-variant');
  });
});
