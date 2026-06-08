import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeatureCard from './FeatureCard';
import { Zap } from 'lucide-react';

describe('FeatureCard', () => {
  it('should render title and description', () => {
    render(<FeatureCard title="Hello" description="World" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('should render with default variant and icon', () => {
    const { container } = render(
      <FeatureCard title="Test" description="Desc" icon={Zap} />
    );
    const iconBox = container.querySelector('.icon-box');
    expect(iconBox).toBeInTheDocument();
    const card = container.firstChild?.firstChild as HTMLElement;
    expect(card.className).toContain('p-8');
  });

  it('should render compact variant with icon and number', () => {
    const { container } = render(
      <FeatureCard title="Test" description="Desc" icon={Zap} variant="compact" number="01" />
    );
    // Number rendered
    expect(screen.getByText('01')).toBeInTheDocument();
    const iconBox = container.querySelector('.icon-box');
    expect(iconBox).toBeInTheDocument();
    const card = container.firstChild?.firstChild as HTMLElement;
    expect(card.className).toContain('p-6');
  });

  it('should render compact variant without number', () => {
    render(
      <FeatureCard title="Test" description="Desc" icon={Zap} variant="compact" />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByText('01')).not.toBeInTheDocument();
  });

  it('should render number without icon', () => {
    render(
      <FeatureCard title="Test" description="Desc" number="02" />
    );
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('should render centered when centered is true', () => {
    const { container } = render(
      <FeatureCard title="Test" description="Desc" centered />
    );
    const card = container.firstChild?.firstChild as HTMLElement;
    expect(card.className).toContain('text-center');
  });

  it('should render minimal variant', () => {
    const { container } = render(
      <FeatureCard title="Test" description="Desc" variant="minimal" />
    );
    const card = container.firstChild?.firstChild as HTMLElement;
    expect(card.className).toContain('p-6');
    expect(card.className).toContain('flex');
    expect(card.className).toContain('flex-col');
  });
});
