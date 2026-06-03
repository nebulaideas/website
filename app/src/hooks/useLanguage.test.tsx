import { renderHook, act, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LanguageProvider, useLanguage, useAltCalendly } from './useLanguage';
import { translations } from '../lib/translations';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = '';
  document.title = '';
  // Clean up meta tags to prevent test pollution
  const metas = document.head.querySelectorAll('meta');
  metas.forEach((meta) => document.head.removeChild(meta));
});

// Helper component to test useLanguage context
function TestComponent() {
  const { language, toggleLanguage, t, calendlyUrl } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="calendly">{calendlyUrl}</span>
      <span data-testid="translation">{t('nav_vision')}</span>
      <button onClick={toggleLanguage} data-testid="toggle-btn">Toggle</button>
    </div>
  );
}

describe('useLanguage hook & LanguageProvider', () => {

  it('should throw an error if used outside of LanguageProvider', () => {
    // Suppress console.error in tests for this intentional error throw
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useLanguage());
    }).toThrow('useLanguage must be used within a LanguageProvider');
    
    consoleError.mockRestore();
  });

  it('should initialize language to "en" by default', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent('Our Vision');
  });

  it('should load initial language from localStorage if present', () => {
    localStorage.setItem('nebula-language', 'es');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(screen.getByTestId('translation')).toHaveTextContent('Visión');
  });

  it('should toggle language from "en" to "es" and back', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const toggleButton = screen.getByTestId('toggle-btn');
    
    // Initial English
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent('Our Vision');

    // Toggle to Spanish
    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(screen.getByTestId('translation')).toHaveTextContent('Visión');
    expect(localStorage.getItem('nebula-language')).toBe('es');
    expect(document.documentElement.lang).toBe('es');

    // Toggle back to English
    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent('Our Vision');
    expect(localStorage.getItem('nebula-language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('should update document title and meta description upon change', () => {
    // Setup dummy meta tags
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);

    const metaOgTitle = document.createElement('meta');
    metaOgTitle.setAttribute('property', 'og:title');
    document.head.appendChild(metaOgTitle);

    const metaOgDesc = document.createElement('meta');
    metaOgDesc.setAttribute('property', 'og:description');
    document.head.appendChild(metaOgDesc);

    const metaTwTitle = document.createElement('meta');
    metaTwTitle.name = 'twitter:title';
    document.head.appendChild(metaTwTitle);

    const metaTwDesc = document.createElement('meta');
    metaTwDesc.name = 'twitter:description';
    document.head.appendChild(metaTwDesc);

    const metaOgLocale = document.createElement('meta');
    metaOgLocale.setAttribute('property', 'og:locale');
    document.head.appendChild(metaOgLocale);

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(document.title).toBe('Nebula Ideas | Engineering Excellence');
    expect(metaDesc.getAttribute('content')).toBe(translations.en.seo_description);
    expect(metaOgTitle.getAttribute('content')).toBe('Nebula Ideas | Engineering Excellence');
    expect(metaOgDesc.getAttribute('content')).toBe(translations.en.seo_description);
    expect(metaTwTitle.getAttribute('content')).toBe('Nebula Ideas | Engineering Excellence');
    expect(metaTwDesc.getAttribute('content')).toBe(translations.en.seo_description);
    expect(metaOgLocale.getAttribute('content')).toBe('en_US');

    // Toggle to Spanish
    const toggleButton = screen.getByTestId('toggle-btn');
    act(() => {
      toggleButton.click();
    });

    expect(document.title).toBe('Nebula Ideas | Excelencia en Ingeniería');
    expect(metaDesc.getAttribute('content')).toBe(translations.es.seo_description);
    expect(metaOgTitle.getAttribute('content')).toBe('Nebula Ideas | Excelencia en Ingeniería');
    expect(metaOgDesc.getAttribute('content')).toBe(translations.es.seo_description);
    expect(metaTwTitle.getAttribute('content')).toBe('Nebula Ideas | Excelencia en Ingeniería');
    expect(metaTwDesc.getAttribute('content')).toBe(translations.es.seo_description);
    expect(metaOgLocale.getAttribute('content')).toBe('es_MX');

    // Cleanup
    document.head.removeChild(metaDesc);
    document.head.removeChild(metaOgTitle);
    document.head.removeChild(metaOgDesc);
    document.head.removeChild(metaTwTitle);
    document.head.removeChild(metaTwDesc);
    document.head.removeChild(metaOgLocale);
  });
});

describe('useAltCalendly hook', () => {
  it('should return the correct alt calendly URL based on language', () => {
    // Helper wrapper component for testing hooks requiring context
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => {
      const altUrl = useAltCalendly();
      const { toggleLanguage } = useLanguage();
      return { altUrl, toggleLanguage };
    }, { wrapper });

    // English -> Alt should be Spanish
    expect(result.current.altUrl).toBe('https://cal.com/nebula-ideas/descubrimiento');

    // Toggle to Spanish
    act(() => {
      result.current.toggleLanguage();
    });

    // Spanish -> Alt should be English
    expect(result.current.altUrl).toBe('https://cal.com/nebula-ideas/discovery');
  });
});
