import { renderHook, act, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LanguageProvider, useLanguage, useComplementaryCalendlyUrl } from './useLanguage';
import { translations } from '../lib/translations';

const TEST_METAS = [
  { key: 'name', value: 'description' },
  { key: 'property', value: 'og:title' },
  { key: 'property', value: 'og:description' },
  { key: 'name', value: 'twitter:title' },
  { key: 'name', value: 'twitter:description' },
  { key: 'property', value: 'og:locale' },
  { key: 'property', value: 'og:image' },
  { key: 'name', value: 'twitter:image' },
];

function cleanupTestMetas() {
  TEST_METAS.forEach(({ key, value }) => {
    const el = document.head.querySelector(`meta[${key}="${value}"]`);
    if (el) {
      document.head.removeChild(el);
    }
  });
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = '';
  document.title = '';
  // Clean up meta tags to prevent test pollution
  cleanupTestMetas();
});

afterEach(() => {
  cleanupTestMetas();
});

// Helper component to test useLanguage context
function TestComponent() {
  const { language, toggleLanguage, t, calendlyUrl } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="calendly">{calendlyUrl}</span>
      <span data-testid="translation">{t('nav_problem')}</span>
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
    expect(screen.getByTestId('translation')).toHaveTextContent('The Problem');
  });

  it('should load initial language from localStorage if present', () => {
    localStorage.setItem('nebula-language', 'es');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(screen.getByTestId('translation')).toHaveTextContent('El Problema');
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
    expect(screen.getByTestId('translation')).toHaveTextContent('The Problem');

    // Toggle to Spanish
    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(screen.getByTestId('translation')).toHaveTextContent('El Problema');
    expect(localStorage.getItem('nebula-language')).toBe('es');
    expect(document.documentElement.lang).toBe('es');

    // Toggle back to English
    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent('The Problem');
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

    const metaOgImage = document.createElement('meta');
    metaOgImage.setAttribute('property', 'og:image');
    document.head.appendChild(metaOgImage);

    const metaTwImage = document.createElement('meta');
    metaTwImage.name = 'twitter:image';
    document.head.appendChild(metaTwImage);

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
    expect(metaOgImage.getAttribute('content')).toBe('https://nebulaideas.com/assets/logo.png');
    expect(metaTwImage.getAttribute('content')).toBe('https://nebulaideas.com/assets/logo.png');

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
    expect(metaOgImage.getAttribute('content')).toBe('https://nebulaideas.com/assets/logo.png');
    expect(metaTwImage.getAttribute('content')).toBe('https://nebulaideas.com/assets/logo.png');
  });
});

describe('useComplementaryCalendlyUrl hook', () => {
  it('should return the correct complementary calendly URL based on language', () => {
    // Helper wrapper component for testing hooks requiring context
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => {
      const altUrl = useComplementaryCalendlyUrl();
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
