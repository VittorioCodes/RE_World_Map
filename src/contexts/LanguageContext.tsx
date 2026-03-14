import React, { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language, LanguageCode } from "../translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguageCode, setCurrentLanguageCode] = useState<LanguageCode>("en");

  const setLanguage = (code: LanguageCode) => {
    setCurrentLanguageCode(code);
  };

  const t = (key: string): string => {
    const lang = translations[currentLanguageCode];
    // Simple key access, could be more complex (e.g., nested keys)
    return (lang as any)[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: translations[currentLanguageCode],
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
