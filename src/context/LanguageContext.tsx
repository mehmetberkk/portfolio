import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language, LanguageContextType } from '../types/language';
import { translations } from '../data/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem('portfolio-language') as Language | null;
    if (stored === 'tr' || stored === 'en') return stored;
  } catch {
    // Ignore localStorage access issues
  }

  if (typeof navigator !== 'undefined' && navigator.language) {
    if (navigator.language.toLowerCase().startsWith('tr')) {
      return 'tr';
    }
  }

  return 'tr';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    try {
      localStorage.setItem('portfolio-language', language);
    } catch {
      // Ignore localStorage errors
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'tr' ? 'en' : 'tr'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

