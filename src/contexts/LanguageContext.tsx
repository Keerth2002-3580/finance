import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ta';

interface Translations {
  [key: string]: {
    en: string;
    ta: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', ta: 'முகப்பு' },
  about: { en: 'About Us', ta: 'எங்களை பற்றி' },
  services: { en: 'Services', ta: 'சேவைகள்' },
  investment: { en: 'Investment Plans', ta: 'முதலீட்டு திட்டங்கள்' },
  contact: { en: 'Contact', ta: 'தொடர்பு' },
  dashboard: { en: 'Dashboard', ta: 'கட்டுப்பாட்டு பலகை' },
  admin: { en: 'Admin Panel', ta: 'நிர்வாக பலகை' },
  login: { en: 'Login', ta: 'உள்நுழைய' },
  register: { en: 'Register', ta: 'பதிவு செய்க' },
  logout: { en: 'Logout', ta: 'வெளியேறு' },
  
  // Common
  welcome: { en: 'Welcome', ta: 'வணக்கம்' },
  loading: { en: 'Loading...', ta: 'ஏற்றுகிறது...' },
  error: { en: 'Error', ta: 'பிழை' },
  success: { en: 'Success', ta: 'வெற்றி' },
  submit: { en: 'Submit', ta: 'சமர்ப்பிக்கவும்' },
  cancel: { en: 'Cancel', ta: 'ரத்து செய்' },
  
  // Investment related
  amount: { en: 'Amount', ta: 'தொகை' },
  investment_amount: { en: 'Investment Amount', ta: 'முதலீட்டு தொகை' },
  monthly_return: { en: 'Monthly Return', ta: 'மாதாந்திர வருமானம்' },
  total_returns: { en: 'Total Returns', ta: 'மொத்த வருமானம்' },
  start_date: { en: 'Start Date', ta: 'தொடக்க தேதி' },
  status: { en: 'Status', ta: 'நிலை' },
  active: { en: 'Active', ta: 'செயலில்' },
  completed: { en: 'Completed', ta: 'முடிக்கப்பட்டது' },
  
  // Homepage
  hero_title: { en: 'NF Plantation', ta: 'என்எஃப் பயிரிடல்' },
  hero_subtitle: { 
    en: 'Invest in sustainable aloe vera plantation with government backing and earn high monthly returns',
    ta: 'அரச அங்கீகாரம் பெற்ற முதலீட்டு கம்பெனியில் குறுகிய முதலீட்டுக்கான அதியுயர் வருமானம்'
  },
  start_investing: { en: 'Start Investing', ta: 'முதலீட்டை தொடங்குங்கள்' },
  learn_more: { en: 'Learn More', ta: 'மேலும் அறிக' },
  
  // Features
  government_approved: { en: 'Government Approved', ta: 'அரசு அங்கீகாரம்' },
  high_returns: { en: 'High Returns', ta: 'அதிக வருமானம்' },
  transparent_process: { en: 'Transparent Process', ta: 'வெளிப்படையான செயல்முறை' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};