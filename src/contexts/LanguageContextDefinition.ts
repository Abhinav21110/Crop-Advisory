import { createContext } from 'react';
import { type SupportedLanguage } from '../services/translationService';

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  translateText: (text: string, targetLang?: string) => Promise<string>;
  getSupportedLanguages: () => SupportedLanguage[];
  isTranslating: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
