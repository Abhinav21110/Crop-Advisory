// AI4BHARAT IndicTrans2 Translation Service
// Using direct API calls to Hugging Face endpoints

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  indicCode: string; // AI4BHARAT language code
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', indicCode: 'eng_Latn' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', indicCode: 'hin_Deva' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', indicCode: 'tel_Telu' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', indicCode: 'pan_Guru' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', indicCode: 'tam_Taml' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', indicCode: 'ben_Beng' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', indicCode: 'guj_Gujr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', indicCode: 'kan_Knda' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', indicCode: 'mal_Mlym' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', indicCode: 'mar_Deva' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', indicCode: 'ory_Orya' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', indicCode: 'urd_Arab' }
];

export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  confidence?: number;
}

class TranslationService {
  private cache: Map<string, string> = new Map();
  private apiKey: string;

  constructor() {
    // Initialize API key for AI4BHARAT models
    this.apiKey = import.meta.env?.VITE_HUGGINGFACE_API_KEY || '';
  }

  private getCacheKey(text: string, sourceLang: string, targetLang: string): string {
    return `${sourceLang}-${targetLang}-${text.substring(0, 50)}`;
  }

  private getIndicCode(langCode: string): string {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    return lang?.indicCode || 'eng_Latn';
  }

  async translateText(request: TranslationRequest): Promise<TranslationResponse> {
    try {
      // Check cache first
      const cacheKey = this.getCacheKey(request.text, request.sourceLang, request.targetLang);
      if (this.cache.has(cacheKey)) {
        return {
          translatedText: this.cache.get(cacheKey)!,
          sourceLang: request.sourceLang,
          targetLang: request.targetLang
        };
      }

      // Skip translation if source and target are the same
      if (request.sourceLang === request.targetLang) {
        return {
          translatedText: request.text,
          sourceLang: request.sourceLang,
          targetLang: request.targetLang
        };
      }

      const sourceIndicCode = this.getIndicCode(request.sourceLang);
      const targetIndicCode = this.getIndicCode(request.targetLang);

      let modelName: string;
      let inputText = request.text;

      // Determine which AI4BHARAT model to use
      if (request.sourceLang === 'en') {
        // English to Indic languages
        modelName = 'ai4bharat/indictrans2-en-indic-1B';
        inputText = `${targetIndicCode}: ${request.text}`;
      } else if (request.targetLang === 'en') {
        // Indic languages to English
        modelName = 'ai4bharat/indictrans2-indic-en-1B';
        inputText = `${sourceIndicCode}: ${request.text}`;
      } else {
        // Indic to Indic translation (via English as intermediate)
        const englishTranslation = await this.translateText({
          text: request.text,
          sourceLang: request.sourceLang,
          targetLang: 'en'
        });
        
        return await this.translateText({
          text: englishTranslation.translatedText,
          sourceLang: 'en',
          targetLang: request.targetLang
        });
      }

      // Call AI4BHARAT model via Hugging Face API
      const response = await fetch(`https://api-inference.huggingface.co/models/${modelName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: inputText,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.1,
            do_sample: false
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.statusText}`);
      }

      const result = await response.json();

      let translatedText = result.generated_text || request.text;
      
      // Clean up the output (remove input prefix if present)
      if (translatedText.includes(': ')) {
        translatedText = translatedText.split(': ').slice(1).join(': ');
      }

      // Cache the result
      this.cache.set(cacheKey, translatedText);

      return {
        translatedText,
        sourceLang: request.sourceLang,
        targetLang: request.targetLang,
        confidence: 0.9
      };

    } catch (error) {
      console.error('Translation error:', error);
      
      // Fallback: return original text if translation fails
      return {
        translatedText: request.text,
        sourceLang: request.sourceLang,
        targetLang: request.targetLang,
        confidence: 0.0
      };
    }
  }

  async translateBatch(texts: string[], sourceLang: string, targetLang: string): Promise<string[]> {
    const translations = await Promise.all(
      texts.map(text => this.translateText({ text, sourceLang, targetLang }))
    );
    return translations.map(t => t.translatedText);
  }

  getSupportedLanguages(): SupportedLanguage[] {
    return SUPPORTED_LANGUAGES;
  }

  isLanguageSupported(langCode: string): boolean {
    return SUPPORTED_LANGUAGES.some(lang => lang.code === langCode);
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const translationService = new TranslationService();
