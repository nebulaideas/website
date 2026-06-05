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
    expect(screen.getAllByText('The Problem')[0]).toBeInTheDocument();
    expect(screen.getAllByText('What We Help With')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Schedule a Call')).toHaveLength(2); // Desktop and mobile
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
    expect(screen.getAllByText('El Problema')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cómo Ayudamos')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Agendar una Llamada')).toHaveLength(2); // Desktop and mobile
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

  it('should handle IntersectionObserver entry activation', () => {
    let observerCallback: (entries: Array<{ isIntersecting: boolean; target: { id: string } }>) => void = () => {};
    
    class LocalMockIntersectionObserver {
      constructor(callback: (entries: Array<{ isIntersecting: boolean; target: { id: string } }>) => void) {
        observerCallback = callback;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    
    const originalIO = window.IntersectionObserver;
    window.IntersectionObserver = LocalMockIntersectionObserver as unknown as typeof IntersectionObserver;
    
    // Add mock elements to document so getElementById returns them
    const problemEl = document.createElement('div');
    problemEl.id = 'why-struggle';
    document.body.appendChild(problemEl);
    
    renderNavigation();
    
    act(() => {
      observerCallback([{ isIntersecting: true, target: problemEl }]);
    });
    
    // Now problem link should have active class
    const problemLinks = screen.getAllByRole('link', { name: /The Problem/i });
    expect(problemLinks[0]).toHaveClass('text-nebula-gold');
    
    // Clean up
    document.body.removeChild(problemEl);
    window.IntersectionObserver = originalIO;
  });

  it('should trigger smooth scroll on nav link click', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ top: 100 } as DOMRect),
    } as unknown as Element;
    
    const spy = vi.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '#why-struggle') {
        return mockElement;
      }
      return null;
    });

    renderNavigation();

    const problemLinks = screen.getAllByText('The Problem');
    act(() => {
      problemLinks[0].click();
    });

    expect(window.scrollTo).toHaveBeenCalled();
    
    spy.mockRestore();
  });

  it('should close mobile menu and scroll when mobile nav link is clicked', () => {
    const originalQuerySelector = document.querySelector;
    const mockElement = {
      getBoundingClientRect: () => ({ top: 100 } as DOMRect),
    } as unknown as Element;
    
    const spy = vi.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector.startsWith('meta')) {
        return originalQuerySelector.call(document, selector);
      }
      return mockElement;
    });

    renderNavigation();

    // Open mobile menu
    const toggleButton = screen.getByLabelText('Toggle menu');
    act(() => {
      toggleButton.click();
    });

    // Find mobile nav link inside overlay
    const overlay = document.getElementById('mobile-menu-overlay');
    expect(overlay).toHaveClass('opacity-100');

    const mobileLinks = screen.getAllByText('The Problem');
    // mobileLinks[1] should be the one in the mobile overlay
    act(() => {
      mobileLinks[1].click();
    });

    // Mobile menu should close
    expect(overlay).toHaveClass('opacity-0');
    expect(window.scrollTo).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should toggle language and close menu when mobile language button is clicked', () => {
    renderNavigation();

    // Open mobile menu
    const toggleButton = screen.getByLabelText('Toggle menu');
    act(() => {
      toggleButton.click();
    });

    const overlay = document.getElementById('mobile-menu-overlay');
    expect(overlay).toHaveClass('opacity-100');

    // Find language button inside mobile menu overlay
    const langBtn = overlay?.querySelector('button');
    expect(langBtn).toBeInTheDocument();
    
    act(() => {
      langBtn?.click();
    });

    // Language should change to Spanish and menu should close
    expect(screen.getAllByText('El Problema')[0]).toBeInTheDocument();
    expect(overlay).toHaveClass('opacity-0');
  });

  it('should close mobile menu when clicking outside the menu overlay', () => {
    renderNavigation();

    // Open mobile menu
    const toggleButton = screen.getByLabelText('Toggle menu');
    act(() => {
      toggleButton.click();
    });

    const overlay = document.getElementById('mobile-menu-overlay');
    expect(overlay).toHaveClass('opacity-100');

    // Click on the overlay (outside the inner content div)
    act(() => {
      overlay?.click();
    });

    // Menu should close
    expect(overlay).toHaveClass('opacity-0');
  });

});
