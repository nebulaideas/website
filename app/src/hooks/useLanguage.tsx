/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/translations';
import { updateMetaTags } from '@/lib/meta';

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
      title: lang.seo_title,
      description: lang.seo_description,
      ogDescription: lang.seo_og_description,
      siteName: lang.seo_site_name,
      language,
    });
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

/**
 * Hook to retrieve the Calendly booking URL for the opposite (complementary) language
 * than the currently active language. Useful for cross-linking booking pages.
 */
export function useComplementaryCalendlyUrl() {
  const { language } = useLanguage();
  return language === 'en'
    ? 'https://cal.com/nebula-ideas/descubrimiento'
    : 'https://cal.com/nebula-ideas/discovery';
}
