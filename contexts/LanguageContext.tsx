import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, Dictionary } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const root = window.document.documentElement;
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    root.setAttribute('lang', language);
    root.setAttribute('dir', dir);

    // Switch fonts based on language
    if (language === 'ar') {
      root.classList.add('font-cairo');
      root.classList.remove('font-sans');
    } else {
      root.classList.add('font-sans');
      root.classList.remove('font-cairo');
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: TRANSLATIONS[language],
    dir: language === 'ar' ? 'rtl' : ('ltr' as 'rtl' | 'ltr'),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
