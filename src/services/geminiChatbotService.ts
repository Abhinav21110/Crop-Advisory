// Gemini API-powered chatbot service with agricultural data context and multilingual support
import { GoogleGenerativeAI } from "@google/generative-ai";
import { translationService, SUPPORTED_LANGUAGES } from './translationService';

const API_BASE_URL = 'http://localhost:5000';

export interface GeminiChatQuery {
  message: string;
  language?: string; // User's preferred language
  context?: {
    location?: string;
    soilType?: string;
    season?: string;
    cropType?: string;
  };
}

export interface SoilData {
  type: string;
  description?: string;
  characteristics?: string;
  suitable_crops?: string;
  estimatedNPK: {
    N: number;
    P: number;
    K: number;
    ph: number;
  };
}

export interface CropRecommendation {
  success: boolean;
  primary_recommendation?: {
    crop: string;
    confidence: number;
    details: Record<string, unknown>;
  };
  other_recommendations?: Array<{
    crop: string;
    confidence: number;
    details: Record<string, unknown>;
  }>;
  soil_info?: Record<string, unknown>;
}

export interface RegionalData {
  success: boolean;
  state?: string;
  primary_recommendation?: {
    crop: string;
    confidence: number;
    details: Record<string, unknown>;
  };
  other_recommendations?: Array<{
    crop: string;
    confidence: number;
    details: Record<string, unknown>;
  }>;
}

export interface EnvironmentalData {
  soilData?: SoilData;
  cropRecommendation?: CropRecommendation;
  regionalData?: RegionalData;
}

export interface GeminiChatResponse {
  text: string;
  data?: EnvironmentalData;
  suggestions?: string[];
}

class GeminiChatbotService {
  private ai: GoogleGenerativeAI;
  private contextData: Record<string, unknown> = {};

  constructor() {
    // Initialize Gemini AI - API key should be set in environment variables
    const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
    
    if (!apiKey) {
      console.warn('⚠️ Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file');
      console.warn('Get your free API key from: https://aistudio.google.com/app/apikey');
    }
    
    this.ai = new GoogleGenerativeAI(apiKey || 'dummy-key');
    
    // Load agricultural context data on initialization
    this.loadAgriculturalContext();
  }

  private async fetchFromAPI(endpoint: string, options?: RequestInit): Promise<Record<string, unknown>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching from ${endpoint}:`, error);
      return {};
    }
  }

  private async loadAgriculturalContext(): Promise<void> {
    try {
      // Load all available agricultural data to provide context to Gemini
      const [cropsData, soilData, statesData] = await Promise.all([
        this.fetchFromAPI('/crops'),
        this.fetchFromAPI('/soil-types'),
        this.fetchFromAPI('/states')
      ]);

      this.contextData = {
        crops: cropsData.crop_info || {},
        soilTypes: soilData.soil_info || {},
        states: statesData.states || [],
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error loading agricultural context:', error);
    }
  }

  private buildSystemPrompt(): string {
    return `You are CropCare AI, an expert agricultural consultant with deep knowledge of Indian farming practices. You specialize in crop recommendations, soil management, pest control, market analysis, weather guidance, and sustainable farming.

AVAILABLE DATA CONTEXT:
- Crop Database: ${Object.keys(this.contextData.crops || {}).length} crops with NPK requirements, seasons, pests, yields, and market values
- Soil Analysis: ${Object.keys(this.contextData.soilTypes || {}).length} soil types with pH, drainage, and nutrient profiles
- Regional Coverage: ${Array.isArray(this.contextData.states) ? this.contextData.states.length : 0} Indian states with climate and soil data

KEY CROPS: ${Object.keys(this.contextData.crops || {}).slice(0, 10).join(', ')}
SOIL TYPES: ${Object.keys(this.contextData.soilTypes || {}).slice(0, 8).join(', ')}

EXPERTISE AREAS & GUIDANCE:

🌾 CROP RECOMMENDATIONS:
- Analyze soil NPK, pH, climate, and season for optimal crop selection
- Consider market demand, profitability, and local conditions
- Recommend crop rotation and intercropping strategies
- Suggest varieties based on yield potential and disease resistance

🌡️ WEATHER & CLIMATE:
- Interpret temperature, humidity, rainfall data for farming decisions
- Advise on seasonal timing for sowing, harvesting, and field operations
- Recommend weather-resilient crops and practices
- Guide irrigation scheduling based on weather patterns

💰 MARKET PRICES & ECONOMICS:
- Analyze crop market values and price trends
- Recommend high-value crops for better profitability
- Consider input costs vs. expected returns
- Suggest value-addition and direct marketing opportunities

🌱 SOIL HEALTH MANAGEMENT:
- Interpret soil test results and recommend amendments
- Guide on organic matter improvement and pH correction
- Suggest fertilizer schedules based on crop needs and soil status
- Recommend soil conservation practices

🐛 PEST & DISEASE MANAGEMENT:
- Identify common pests and diseases for each crop
- Recommend Integrated Pest Management (IPM) strategies
- Suggest organic and chemical control methods
- Provide prevention strategies and early detection tips

💧 IRRIGATION & WATER MANAGEMENT:
- Calculate water requirements for different crops
- Recommend efficient irrigation methods (drip, sprinkler)
- Guide on water conservation and rainwater harvesting
- Advise on drainage for waterlogged areas

🌿 FERTILIZER & NUTRITION:
- Calculate NPK requirements based on soil tests and crop needs
- Recommend organic vs. chemical fertilizers
- Guide on micronutrient management (Zn, Fe, B, etc.)
- Suggest timing and application methods

RESPONSE APPROACH:
1. Provide specific, actionable advice based on available data
2. Include quantitative details (NPK values, yields, costs, timing)
3. Consider local conditions, seasons, and farmer resources
4. Offer both immediate solutions and long-term strategies
5. Explain the reasoning behind recommendations
6. Suggest monitoring and follow-up actions

RESPONSE GUIDELINES:
1. Keep responses concise and practical (2-4 paragraphs maximum)
2. Provide specific, actionable advice based on available data
3. Use simple, clear language without excessive formatting
4. Include quantitative details when available (NPK values, yields, costs)
5. End with 2-3 brief follow-up suggestions

RESPONSE STRUCTURE:
- Start with a direct answer to the question
- Include relevant data from the agricultural context provided
- Give practical recommendations the farmer can implement
- Suggest 2-3 brief next steps

AVOID:
- Excessive emojis or formatting symbols
- Long lists or verbose explanations
- Generic advice without data backing
- Overly technical jargon

Remember: Farmers need quick, actionable advice. Be concise, data-driven, and practical.`;
  }

  private async getEnvironmentalData(userLocation?: string, soilType?: string): Promise<EnvironmentalData> {
    try {
      const environmentalData: EnvironmentalData = {};
      
      // Get soil data with NPK values
      if (soilType) {
        const soilData = await this.fetchFromAPI('/soil-types');
        if (soilData.success && soilData.soil_info) {
          const soilInfo = soilData.soil_info[soilType];
          if (soilInfo) {
            environmentalData.soilData = {
              type: soilType,
              ...soilInfo,
              // Estimate NPK based on soil type
              estimatedNPK: this.estimateNPKFromSoil(soilType)
            };
          }
        }
      }
      
      // Get regional weather and soil nutrient data
      if (userLocation) {
        const regionalData = await this.fetchFromAPI(`/regional-recommendation/${userLocation}`);
        if (regionalData.success) {
          environmentalData.regionalData = regionalData as unknown as RegionalData;
        }
      }
      
      // Get comprehensive crop recommendation with real data
      if (userLocation || soilType) {
        const npkData = this.getRegionalNPK(userLocation);
        const weatherData = this.getRegionalWeather(userLocation);
        
        const prediction = await this.fetchFromAPI('/predict', {
          method: 'POST',
          body: JSON.stringify({
            N: npkData.N,
            P: npkData.P, 
            K: npkData.K,
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            ph: npkData.ph,
            rainfall: weatherData.rainfall,
            soil_type: soilType || 'Loam'
          }),
        });
        
        if (prediction.success) {
          environmentalData.cropRecommendation = prediction as unknown as CropRecommendation;
        }
      }

      return environmentalData;
    } catch (error) {
      console.error('Error getting environmental data:', error);
      return {};
    }
  }

  private estimateNPKFromSoil(soilType: string): { N: number; P: number; K: number; ph: number } {
    // NPK estimates based on soil characteristics
    const soilNPKMap: Record<string, { N: number; P: number; K: number; ph: number }> = {
      'Sandy': { N: 40, P: 20, K: 30, ph: 6.0 },
      'Loam': { N: 65, P: 35, K: 40, ph: 6.8 },
      'Black': { N: 80, P: 45, K: 60, ph: 7.2 },
      'Clay': { N: 70, P: 40, K: 50, ph: 6.5 },
      'Red': { N: 45, P: 25, K: 35, ph: 6.2 },
      'Alluvial': { N: 85, P: 50, K: 55, ph: 7.0 },
      'Laterite': { N: 35, P: 15, K: 25, ph: 5.8 },
      'Coastal': { N: 50, P: 30, K: 45, ph: 7.5 }
    };
    return soilNPKMap[soilType] || soilNPKMap['Loam'];
  }

  private getRegionalNPK(location?: string): { N: number; P: number; K: number; ph: number } {
    // Regional soil nutrient profiles based on agricultural data
    const regionalNPK: Record<string, { N: number; P: number; K: number; ph: number }> = {
      'Punjab': { N: 90, P: 45, K: 40, ph: 7.2 },
      'Maharashtra': { N: 60, P: 30, K: 50, ph: 6.8 },
      'Uttar Pradesh': { N: 75, P: 40, K: 45, ph: 7.0 },
      'West Bengal': { N: 85, P: 50, K: 55, ph: 6.9 },
      'Tamil Nadu': { N: 55, P: 35, K: 60, ph: 6.5 },
      'Karnataka': { N: 65, P: 35, K: 45, ph: 6.7 },
      'Andhra Pradesh': { N: 70, P: 40, K: 55, ph: 6.8 },
      'Rajasthan': { N: 45, P: 25, K: 35, ph: 7.5 },
      'Gujarat': { N: 55, P: 30, K: 40, ph: 7.2 },
      'Haryana': { N: 85, P: 42, K: 38, ph: 7.3 }
    };
    return regionalNPK[location || ''] || { N: 65, P: 35, K: 40, ph: 6.8 };
  }

  private getRegionalWeather(location?: string): { temperature: number; humidity: number; rainfall: number } {
    // Regional weather patterns for agricultural planning
    const regionalWeather: Record<string, { temperature: number; humidity: number; rainfall: number }> = {
      'Punjab': { temperature: 26, humidity: 65, rainfall: 120 },
      'Maharashtra': { temperature: 28, humidity: 70, rainfall: 110 },
      'Uttar Pradesh': { temperature: 27, humidity: 68, rainfall: 100 },
      'West Bengal': { temperature: 29, humidity: 80, rainfall: 150 },
      'Tamil Nadu': { temperature: 31, humidity: 75, rainfall: 90 },
      'Karnataka': { temperature: 25, humidity: 72, rainfall: 130 },
      'Andhra Pradesh': { temperature: 30, humidity: 73, rainfall: 95 },
      'Rajasthan': { temperature: 32, humidity: 45, rainfall: 60 },
      'Gujarat': { temperature: 29, humidity: 60, rainfall: 80 },
      'Haryana': { temperature: 27, humidity: 62, rainfall: 110 }
    };
    return regionalWeather[location || ''] || { temperature: 25, humidity: 70, rainfall: 100 };
  }

  private getCurrentSeason(month: number): string {
    // Indian agricultural seasons
    if (month >= 6 && month <= 9) return 'Kharif (Monsoon)';
    if (month >= 10 && month <= 3) return 'Rabi (Winter)';
    if (month >= 4 && month <= 5) return 'Zaid (Summer)';
    return 'Transition';
  }

  private extractLocationAndSoil(message: string): { location?: string; soilType?: string } {
    const states = Array.isArray(this.contextData.states) ? this.contextData.states as string[] : [];
    const soilTypes = Object.keys(this.contextData.soilTypes || {});
    
    const location = states.find(state => 
      message.toLowerCase().includes(state.toLowerCase())
    );
    
    const soilType = soilTypes.find(soil => 
      message.toLowerCase().includes(soil.toLowerCase())
    );

    return { location, soilType };
  }

  async processQuery(query: GeminiChatQuery): Promise<GeminiChatResponse> {
    try {
      const userLanguage = query.language || 'en';
      let originalMessage = query.message;
      
      // Translate user input to English for processing if needed
      if (userLanguage !== 'en') {
        const translationResult = await translationService.translateText({
          text: query.message,
          sourceLang: userLanguage,
          targetLang: 'en'
        });
        originalMessage = translationResult.translatedText;
      }
      
      // Extract location and soil information from the translated message
      const { location, soilType } = this.extractLocationAndSoil(originalMessage);
      
      // Get comprehensive environmental and agricultural data
      let additionalContext = '';
      let environmentalData: EnvironmentalData = {};
      
      // Always fetch environmental data for better context
      environmentalData = await this.getEnvironmentalData(
        location || query.context?.location, 
        soilType || query.context?.soilType
      );
      
      if (Object.keys(environmentalData).length > 0) {
        // Build comprehensive agricultural context for Gemini
        const contextParts = [];
        
        if (environmentalData.soilData) {
          const soil = environmentalData.soilData;
          contextParts.push(`🌱 SOIL ANALYSIS:
- Type: ${soil.type}
- NPK Status: Nitrogen:${soil.estimatedNPK?.N}kg/ha, Phosphorus:${soil.estimatedNPK?.P}kg/ha, Potassium:${soil.estimatedNPK?.K}kg/ha
- pH Level: ${soil.estimatedNPK?.ph}
- Characteristics: ${soil.characteristics}
- Suitable Crops: ${soil.suitable_crops}
- Description: ${soil.description}`);
        }
        
        if (environmentalData.cropRecommendation) {
          const cropRec = environmentalData.cropRecommendation;
          if (cropRec.primary_recommendation) {
            const details = cropRec.primary_recommendation.details as Record<string, unknown>;
            contextParts.push(`🌾 ML-BASED CROP RECOMMENDATION:
- Primary Crop: ${cropRec.primary_recommendation.crop} (${(cropRec.primary_recommendation.confidence * 100).toFixed(1)}% confidence)
- Season: ${details?.season || 'N/A'}
- Duration: ${details?.duration || 'N/A'}
- Water Requirement: ${details?.water_requirement || 'N/A'}
- Nutrient Requirements: ${details?.nutrient_req || 'N/A'}
- Market Value: ${details?.market_value || 'N/A'}
- Yield Potential: ${details?.yield_potential || 'N/A'}
- Common Pests/Diseases: ${details?.pests_diseases || 'N/A'}
- Recommended Fertilizers: ${details?.fertilizers || 'N/A'}`);
            
            if (cropRec.other_recommendations && cropRec.other_recommendations.length > 0) {
              const alternatives = cropRec.other_recommendations.map(rec => 
                `${rec.crop} (${(rec.confidence * 100).toFixed(1)}%)`
              ).join(', ');
              contextParts.push(`🔄 ALTERNATIVE CROPS: ${alternatives}`);
            }
          }
        }
        
        if (environmentalData.regionalData) {
          const regional = environmentalData.regionalData;
          contextParts.push(`🗺️ REGIONAL CONTEXT:
- Location: ${regional.state}
- Regional Best Crop: ${regional.primary_recommendation?.crop}
- Local Climate Suitability: Available for state-specific recommendations`);
        }
        
        // Add current season and weather context
        const currentMonth = new Date().getMonth() + 1;
        const season = this.getCurrentSeason(currentMonth);
        const weatherContext = this.getRegionalWeather(location || query.context?.location);
        
        contextParts.push(`🌡️ CURRENT CONDITIONS:
- Season: ${season}
- Expected Temperature: ${weatherContext.temperature}°C
- Expected Humidity: ${weatherContext.humidity}%
- Expected Rainfall: ${weatherContext.rainfall}mm
- Month: ${new Date().toLocaleString('en-US', { month: 'long' })}`);
        
        if (contextParts.length > 0) {
          additionalContext = `\n\n=== CURRENT AGRICULTURAL DATA FOR ANALYSIS ===\n${contextParts.join('\n\n')}`;
        }
      }

      // Build the complete prompt with context
      const systemPrompt = this.buildSystemPrompt();
      const userPrompt = `${originalMessage}${additionalContext}`;

      // Add language instruction to system prompt if not English
      const languageInstruction = userLanguage !== 'en' 
        ? `\n\nIMPORTANT: The user speaks ${SUPPORTED_LANGUAGES.find(l => l.code === userLanguage)?.name || userLanguage}. Please respond in English first, then I will translate it to their language.`
        : '';

      // Generate response using Gemini
      const model = this.ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const fullPrompt = `${systemPrompt}${languageInstruction}\n\nUser: ${userPrompt}`;
      
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000,
        }
      });

      const response = await result.response;
      let responseText = response.text() || "I apologize, but I'm having trouble processing your request right now.";

      // Translate response back to user's language if needed
      if (userLanguage !== 'en') {
        const translatedResponse = await translationService.translateText({
          text: responseText,
          sourceLang: 'en',
          targetLang: userLanguage
        });
        responseText = translatedResponse.translatedText;
      }

      // Generate contextual suggestions and translate them too
      let suggestions = this.generateSuggestions(originalMessage, responseText);
      if (userLanguage !== 'en') {
        suggestions = await translationService.translateBatch(suggestions, 'en', userLanguage);
      }

      return {
        text: responseText,
        data: environmentalData,
        suggestions
      };

    } catch (error) {
      console.error('Error processing Gemini query:', error);
      
      // Check if it's an API key issue
      const apiKey = import.meta.env?.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return {
          text: "⚠️ **API Configuration Required**\n\nTo use the AI chatbot, please:\n1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)\n2. Create a `.env` file in your project root\n3. Add: `VITE_GEMINI_API_KEY=your_api_key_here`\n4. Restart the development server\n\nMeanwhile, I can help with general farming guidance. What would you like to know?",
          suggestions: [
            "Tell me about crop selection",
            "Soil testing and management", 
            "Pest and disease control",
            "Fertilizer recommendations"
          ]
        };
      }
      
      // Other API errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Gemini API Error Details:', errorMessage);
      
      return {
        text: `⚠️ **AI Service Temporarily Unavailable**\n\nError: ${errorMessage.includes('API_KEY') ? 'Invalid API key' : 'Connection issue'}\n\nI can still help with general farming guidance. What specific aspect would you like to know about?`,
        suggestions: [
          "Tell me about crop selection",
          "Soil testing and management", 
          "Pest and disease control",
          "Fertilizer recommendations"
        ]
      };
    }
  }

  private generateSuggestions(originalMessage: string, responseText: string): string[] {
    const msg = originalMessage.toLowerCase();
    const response = responseText.toLowerCase();

    const suggestions: string[] = [];

    // Context-aware suggestions based on the conversation
    if (msg.includes('crop') || msg.includes('recommend')) {
      suggestions.push("What's the best planting season for this crop?");
      suggestions.push("Tell me about fertilizer requirements");
      suggestions.push("What pests should I watch for?");
    } else if (msg.includes('soil')) {
      suggestions.push("How do I test my soil pH?");
      suggestions.push("What crops grow well in this soil?");
      suggestions.push("How to improve soil fertility?");
    } else if (msg.includes('pest') || msg.includes('disease')) {
      suggestions.push("Organic pest control methods");
      suggestions.push("When should I spray pesticides?");
      suggestions.push("How to prevent crop diseases?");
    } else if (msg.includes('fertilizer') || msg.includes('nutrient')) {
      suggestions.push("NPK ratios for different crops");
      suggestions.push("Organic vs chemical fertilizers");
      suggestions.push("Best time to apply fertilizers");
    } else {
      // General suggestions
      suggestions.push("Recommend crops for my region");
      suggestions.push("Seasonal farming calendar");
      suggestions.push("Market price trends");
    }

    return suggestions.slice(0, 3); // Return top 3 suggestions
  }

  // Method to update context data periodically
  async refreshContext(): Promise<void> {
    await this.loadAgriculturalContext();
  }

  // Method to get current context summary
  getContextSummary(): Record<string, unknown> {
    return {
      totalCrops: Object.keys(this.contextData.crops || {}).length,
      totalSoilTypes: Object.keys(this.contextData.soilTypes || {}).length,
      totalStates: Array.isArray(this.contextData.states) ? this.contextData.states.length : 0,
      lastUpdated: this.contextData.lastUpdated
    };
  }
}

export const geminiChatbotService = new GeminiChatbotService();
