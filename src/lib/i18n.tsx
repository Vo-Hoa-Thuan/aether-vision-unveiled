import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en.json';
import vi from '../locales/vi.json';

type Translations = Record<string, any>;

const translations: Record<string, Translations> = {
  en,
  vi,
};

type Language = 'en' | 'vi';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Use a lazy initializer to prevent flash during hydration where possible,
  // though in SSR this would need to match. Since this is Vite SPA, we can read localStorage directly.
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && ['en', 'vi'].includes(saved)) {
        return saved;
      }
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'vi'].includes(browserLang)) {
        return browserLang as Language;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return (value as unknown as string) || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
