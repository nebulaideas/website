import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navigation from './Navigation';
import { LanguageProvider } from '@/hooks/useLanguage';

// Mock window.scrollTo
window.scrollTo = vi.fn();

describe('Navigation component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderNavigation = () => {
    return render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    );
  };

  it('should render brand logo and navigation links', () => {
    renderNavigation();
    
    // Check logo img exists with correct alt text
    const logo = screen.getByAltText('Nebula Ideas');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/assets/logo.png');

    // Check key nav links exist
    expect(screen.getAllByText('Our Vision')[0]).toBeInTheDocument();
    expect(screen.getAllByText('What We Do')[0]).toBeInTheDocument();
    expect(screen.getByText('Schedule a Call')).toBeInTheDocument();
  });

  it('should toggle language between English and Spanish when language selector is clicked', () => {
    renderNavigation();

    const langToggleBtns = screen.getAllByRole('button', { name: /ES/i });
    expect(langToggleBtns[0]).toBeInTheDocument();

    // Toggle to Spanish
    act(() => {
      langToggleBtns[0].click();
    });

    // Check language labels are updated to Spanish
    expect(screen.getAllByText('Nuestra Visión')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Qué Hacemos')[0]).toBeInTheDocument();
    expect(screen.getByText('Agendar una Llamada')).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger button is clicked', () => {
    renderNavigation();

    // Find hamburger button (aria-label="Toggle menu")
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Menu overlay should be hidden (opacity-0 pointer-events-none class)
    const overlay = document.getElementById('mobile-menu-overlay');
    expect(overlay).toHaveClass('opacity-0');
    expect(overlay).toHaveClass('pointer-events-none');

    // Click to open mobile menu
    act(() => {
      toggleButton.click();
    });

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(overlay).toHaveClass('opacity-100');
    expect(overlay).toHaveClass('pointer-events-auto');

    // Click again to close
    act(() => {
      toggleButton.click();
    });

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(overlay).toHaveClass('opacity-0');
    expect(overlay).toHaveClass('pointer-events-none');
  });
});
