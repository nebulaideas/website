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
      if (stored === 'en' || stored === 'es') return stored;
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('nebula-language', language);

    const title = translations[language].seo_title;
    const description = translations[language].seo_description;

    updateMetaTags(title, description, language);
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

export function useAltCalendly() {
  const { language } = useLanguage();
  return language === 'en'
    ? 'https://cal.com/nebula-ideas/descubrimiento'
    : 'https://cal.com/nebula-ideas/discovery';
}
