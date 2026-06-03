/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  calendlyUrl: string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nebula-language') as Language | null;
      if (stored === 'en' || stored === 'es') return stored;
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('nebula-language', language);

    const title = translations[language].seo_title;
    const description = translations[language].seo_description;

    document.title = title;

    // Helper to update meta tag by selector, creating it if missing
    const updateMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          const match = selector.match(/property="([^"]+)"/);
          if (match) el.setAttribute('property', match[1]);
        } else {
          const match = selector.match(/name="([^"]+)"/);
          if (match) el.setAttribute('name', match[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    updateMeta('meta[name="description"]', 'content', description);
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[name="twitter:title"]', 'content', title);
    updateMeta('meta[name="twitter:description"]', 'content', description);
    updateMeta('meta[property="og:locale"]', 'content', language === 'en' ? 'en_US' : 'es_MX');
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  const calendlyUrl =
    language === 'en'
      ? 'https://cal.com/nebula-ideas/discovery'
      : 'https://cal.com/nebula-ideas/descubrimiento';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, calendlyUrl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useAltCalendly() {
  const { language } = useLanguage();
  return language === 'en'
    ? 'https://cal.com/nebula-ideas/descubrimiento'
    : 'https://cal.com/nebula-ideas/discovery';
}
