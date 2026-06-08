/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/translations';
import { updateMetaTags, injectJsonLd } from '@/lib/meta';

function resolve(lang: Record<string, unknown>, path: string): string {
  const parts = path.split('.');
  let current: unknown = lang;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : path;
}

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
      if (stored === 'en' || stored === 'es') {return stored;}
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('nebula-language', language);

    const lang = translations[language];
    updateMetaTags({
      title: resolve(lang, 'seo.title'),
      description: resolve(lang, 'seo.description'),
      ogDescription: resolve(lang, 'seo.og_description'),
      siteName: resolve(lang, 'seo.site_name'),
      language,
    });

    injectJsonLd();
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return resolve(translations[language], key);
    },
    [language]
  );

  const calendlyUrl = useMemo(
    () =>
      language === 'en'
        ? 'https://cal.com/nebula-ideas/discovery'
        : 'https://cal.com/nebula-ideas/descubrimiento',
    [language]
  );

  const contextValue = useMemo(
    () => ({ language, toggleLanguage, t, calendlyUrl }),
    [language, toggleLanguage, t, calendlyUrl]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
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

export function useComplementaryCalendlyUrl() {
  const { language } = useLanguage();
  return language === 'en'
    ? 'https://cal.com/nebula-ideas/descubrimiento'
    : 'https://cal.com/nebula-ideas/discovery';
}
