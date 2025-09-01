import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { SUPPORTED_LANGUAGES } from '../services/translationService';

export function LanguageSelector() {
  const { language, setLanguage, getSupportedLanguages } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    // Store preference in localStorage
    localStorage.setItem('cropcare-language', langCode);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {SUPPORTED_LANGUAGES.find(l => l.code === language)?.nativeName || 'English'}
        </span>
      </button>
      
      <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <div className="text-xs font-medium text-gray-500 mb-2 px-2">Select Language</div>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                language === lang.code
                  ? 'bg-green-50 text-green-700 font-medium'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{lang.nativeName}</span>
                <span className="text-xs text-gray-500">{lang.name}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="border-t border-gray-100 p-2">
          <div className="text-xs text-gray-500 px-2">
            Powered by AI4BHARAT IndicTrans2
          </div>
        </div>
      </div>
    </div>
  );
}
