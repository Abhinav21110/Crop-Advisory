import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations for all website components
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    advisory: "Crop Advisory",
    soilHealth: "Soil Health",
    weather: "Weather",
    pestDetection: "Pest Detection",
    marketPrices: "Market Prices",
    chatbot: "AI Assistant",
    feedback: "Feedback",
    
    // Common terms
    welcome: "Welcome to CropCare",
    subtitle: "Smart farming solutions for modern agriculture",
    language: "Language",
    theme: "Theme",
    
    // Dashboard
    dashboardTitle: "Farm Dashboard",
    weatherCard: "Today's Weather",
    soilCard: "Soil Status",
    marketCard: "Market Prices",
    advisoryCard: "Latest Advisory",
    heroDescription: "Your intelligent farming companion providing real-time insights for better crop management, soil health monitoring, and market analysis.",
    temperature: "Temperature",
    humidity: "Humidity",
    soilPH: "Soil pH",
    wheatPrice: "Wheat Price",
    currentTemperature: "Current temperature",
    relativeHumidity: "Relative humidity",
    currentSoilAcidity: "Current soil acidity",
    perQuintal: "Per quintal",
    normalRange: "Normal range",
    optimalLevel: "Optimal level",
    withinIdealRange: "Within ideal range",
    weatherAdvisory: "Weather Advisory",
    cropAdvisory: "Crop Advisory",
    soilAnalysis: "Soil Analysis",
    location: "Location",
    rainfall: "Rainfall",
    recommended: "Recommended",
    todayMarketPrices: "Today's Market Prices",
    quickActions: "Quick Actions",
    testSoil: "Test Soil",
    getSoilAnalysis: "Get soil analysis",
    checkForecast: "Check forecast",
    viewPrices: "View prices",
    getRecommendations: "Get recommendations",
    
    // Advisory Page
    cropAdvisoryTitle: "Crop Advisory",
    cropAdvisoryDescription: "Get personalized crop recommendations based on your location, soil conditions, and current weather patterns.",
    selectYourLocation: "Select Your Location",
    chooseLocation: "Choose location",
    recommendedCrop: "Recommended Crop",
    currentSeason: "Current Season",
    bestChoiceFor: "Best choice for",
    whyThisCrop: "Why This Crop?",
    regionalRecommendations: "Regional Recommendations",
    selectThisLocation: "Select This Location",
    getDetailedPlan: "Get Detailed Plan",
    cultivationTimeline: "Cultivation timeline",
    soilRequirements: "Soil Requirements",
    checkCompatibility: "Check compatibility",
    marketAnalysis: "Market Analysis",
    priceTrends: "Price trends",
    
    // Weather Page
    weatherMonitoring: "Weather Monitoring",
    weatherDescription: "Real-time weather conditions and agricultural advisories to help you make informed farming decisions.",
    selectLocation: "Select Location",
    currentWeather: "Current Weather",
    windSpeed: "Wind Speed",
    agriculturalAdvisory: "Agricultural Advisory",
    todaysForecast: "Today's Forecast",
    morning: "Morning (6-12 PM)",
    afternoon: "Afternoon (12-6 PM)",
    evening: "Evening (6-12 AM)",
    farmingRecommendations: "Farming Recommendations",
    drainageAlert: "Drainage Alert",
    ensureProperDrainage: "Ensure proper field drainage to prevent waterlogging.",
    sprayingWarning: "Spraying Warning",
    avoidSprayingDuringRain: "Avoid pesticide/fertilizer application during rain.",
    goodConditions: "Good Conditions",
    idealTimeForOperations: "Ideal time for field operations and spraying.",
    irrigation: "Irrigation",
    monitorSoilMoisture: "Monitor soil moisture and irrigate if needed.",
    temperatureWatch: "Temperature Watch",
    highTempStress: "High temperature may stress crops. Ensure adequate water supply.",
    favorableTemp: "Temperature is favorable for crop growth.",
    sevenDayForecast: "7-Day Forecast",
    weatherAcrossRegions: "Weather Across Regions",
    temp: "Temp",
    rain: "Rain",
    
    // Weather Status
    rainy: "Rainy",
    hot: "Hot",
    humid: "Humid",
    pleasant: "Pleasant",
    heavyRainfallExpected: "Heavy rainfall expected",
    highTemperatureAlert: "High temperature alert",
    highHumidityLevels: "High humidity levels",
    favorableConditions: "Favorable conditions",
    
    // Voice commands
    listening: "Listening... speak your question",
    voiceSupported: "Voice Support Available",
    speaking: "Speaking...",
    voiceNotSupported: "Voice Not Supported",
    browserNotSupported: "Your browser doesn't support speech recognition. Please use a modern browser like Chrome or Edge.",
    stopListening: "Stop listening",
    startVoiceInput: "Start voice input",
    stopSpeaking: "Stop speaking",
    testVoiceOutput: "Test voice output",
    
    // Navigation Help
    navbarHidden: "Navigation bar is hidden. Click the eye icon to show it.",
    showNavbar: "Show navigation bar",
    
    // Common UI Elements
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    reset: "Reset",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    export: "Export",
    import: "Import",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    add: "Add",
    remove: "Remove",
    update: "Update",
    refresh: "Refresh",
    back: "Back",
    next: "Next",
    previous: "Previous",
    home: "Home",
    settings: "Settings",
    help: "Help",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms"
  },
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    advisory: "फसल सलाह",
    soilHealth: "मिट्टी स्वास्थ्य",
    weather: "मौसम",
    pestDetection: "कीट पहचान",
    marketPrices: "बाजार भाव",
    chatbot: "AI सहायक",
    feedback: "प्रतिक्रिया",
    
    // Common terms
    welcome: "CropCare में आपका स्वागत है",
    subtitle: "आधुनिक कृषि के लिए स्मार्ट खेती समाधान",
    language: "भाषा",
    theme: "थीम",
    
    // Dashboard
    dashboardTitle: "खेत डैशबोर्ड",
    weatherCard: "आज का मौसम",
    soilCard: "मिट्टी की स्थिति",
    marketCard: "बाजार भाव",
    advisoryCard: "नवीनतम सलाह",
    heroDescription: "बेहतर फसल प्रबंधन, मिट्टी स्वास्थ्य निगरानी और बाजार विश्लेषण के लिए वास्तविक समय की जानकारी प्रदान करने वाला आपका बुद्धिमान कृषि साथी।",
    temperature: "तापमान",
    humidity: "नमी",
    soilPH: "मिट्टी pH",
    wheatPrice: "गेहूं की कीमत",
    currentTemperature: "वर्तमान तापमान",
    relativeHumidity: "सापेक्ष आर्द्रता",
    currentSoilAcidity: "वर्तमान मिट्टी अम्लता",
    perQuintal: "प्रति क्विंटल",
    normalRange: "सामान्य सीमा",
    optimalLevel: "इष्टतम स्तर",
    withinIdealRange: "आदर्श सीमा के भीतर",
    weatherAdvisory: "मौसम सलाह",
    cropAdvisory: "फसल सलाह",
    soilAnalysis: "मिट्टी विश्लेषण",
    location: "स्थान",
    rainfall: "वर्षा",
    recommended: "अनुशंसित",
    todayMarketPrices: "आज के बाजार भाव",
    quickActions: "त्वरित कार्य",
    testSoil: "मिट्टी परीक्षण",
    getSoilAnalysis: "मिट्टी विश्लेषण प्राप्त करें",
    checkForecast: "पूर्वानुमान देखें",
    viewPrices: "कीमतें देखें",
    getRecommendations: "सिफारिशें प्राप्त करें",
    
    // Advisory Page
    cropAdvisoryTitle: "फसल सलाह",
    cropAdvisoryDescription: "अपने स्थान, मिट्टी की स्थिति और वर्तमान मौसम पैटर्न के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें।",
    selectYourLocation: "अपना स्थान चुनें",
    chooseLocation: "स्थान चुनें",
    recommendedCrop: "अनुशंसित फसल",
    currentSeason: "वर्तमान मौसम",
    bestChoiceFor: "के लिए सबसे अच्छा विकल्प",
    whyThisCrop: "यह फसल क्यों?",
    regionalRecommendations: "क्षेत्रीय सिफारिशें",
    selectThisLocation: "इस स्थान का चयन करें",
    getDetailedPlan: "विस्तृत योजना प्राप्त करें",
    cultivationTimeline: "खेती की समयसीमा",
    soilRequirements: "मिट्टी की आवश्यकताएं",
    checkCompatibility: "संगतता जांचें",
    marketAnalysis: "बाजार विश्लेषण",
    priceTrends: "मूल्य रुझान",
    
    // Weather Page
    weatherMonitoring: "मौसम निगरानी",
    weatherDescription: "सूचित कृषि निर्णय लेने में आपकी सहायता के लिए वास्तविक समय मौसम स्थितियां और कृषि सलाह।",
    selectLocation: "स्थान चुनें",
    currentWeather: "वर्तमान मौसम",
    windSpeed: "हवा की गति",
    agriculturalAdvisory: "कृषि सलाह",
    todaysForecast: "आज का पूर्वानुमान",
    morning: "सुबह (6-12 बजे)",
    afternoon: "दोपहर (12-6 बजे)",
    evening: "शाम (6-12 बजे)",
    farmingRecommendations: "कृषि सिफारिशें",
    drainageAlert: "जल निकासी चेतावनी",
    ensureProperDrainage: "जल भराव को रोकने के लिए उचित खेत जल निकासी सुनिश्चित करें।",
    sprayingWarning: "छिड़काव चेतावनी",
    avoidSprayingDuringRain: "बारिश के दौरान कीटनाशक/उर्वरक का प्रयोग न करें।",
    goodConditions: "अच्छी स्थितियां",
    idealTimeForOperations: "खेत के कार्यों और छिड़काव के लिए आदर्श समय।",
    irrigation: "सिंचाई",
    monitorSoilMoisture: "मिट्टी की नमी की निगरानी करें और आवश्यकता पड़ने पर सिंचाई करें।",
    temperatureWatch: "तापमान निगरानी",
    highTempStress: "उच्च तापमान फसलों को तनाव दे सकता है। पर्याप्त पानी की आपूर्ति सुनिश्चित करें।",
    favorableTemp: "तापमान फसल की वृद्धि के लिए अनुकूल है।",
    sevenDayForecast: "7-दिन का पूर्वानुमान",
    weatherAcrossRegions: "क्षेत्रों में मौसम",
    temp: "तापमान",
    rain: "बारिश",
    
    // Weather Status
    rainy: "बारिश",
    hot: "गर्म",
    humid: "आर्द्र",
    pleasant: "सुखद",
    heavyRainfallExpected: "भारी वर्षा की उम्मीद",
    highTemperatureAlert: "उच्च तापमान चेतावनी",
    highHumidityLevels: "उच्च आर्द्रता स्तर",
    favorableConditions: "अनुकूल स्थितियां",
    
    // Voice commands
    listening: "सुन रहा हूँ... अपना सवाल बोलें",
    voiceSupported: "आवाज सहायता उपलब्ध",
    speaking: "बोल रहा हूँ...",
    voiceNotSupported: "आवाज समर्थित नहीं",
    browserNotSupported: "आपका ब्राउज़र वाक् पहचान का समर्थन नहीं करता। कृपया Chrome या Edge जैसे आधुनिक ब्राउज़र का उपयोग करें।",
    stopListening: "सुनना बंद करें",
    startVoiceInput: "आवाज इनपुट शुरू करें",
    stopSpeaking: "बोलना बंद करें",
    testVoiceOutput: "आवाज आउटपुट परीक्षण",
    
    // Navigation Help
    navbarHidden: "नेवीगेशन बार छुपा हुआ है। इसे दिखाने के लिए आंख के आइकन पर क्लिक करें।",
    showNavbar: "नेवीगेशन बार दिखाएं",
    
    // Common UI Elements
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    warning: "चेतावनी",
    info: "जानकारी",
    close: "बंद करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    reset: "रीसेट करें",
    search: "खोजें",
    filter: "फिल्टर",
    sort: "क्रमबद्ध करें",
    export: "निर्यात",
    import: "आयात",
    delete: "हटाएं",
    edit: "संपादित करें",
    view: "देखें",
    add: "जोड़ें",
    remove: "हटाएं",
    update: "अपडेट करें",
    refresh: "ताज़ा करें",
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    home: "होम",
    settings: "सेटिंग्स",
    help: "सहायता",
    about: "के बारे में",
    contact: "संपर्क",
    privacy: "गोपनीयता",
    terms: "नियम"
  },
  te: {
    // Navigation
    dashboard: "డ్యాష్‌బోర్డ్",
    advisory: "పంట సలహా",
    soilHealth: "మట్టి ఆరోగ్యం",
    weather: "వాతావరణం",
    pestDetection: "కీటకాల గుర్తింపు",
    marketPrices: "మార్కెట్ ధరలు",
    chatbot: "AI సహాయకుడు",
    feedback: "అభిప్రాయం",
    
    // Common terms
    welcome: "CropCare కు స్వాగతం",
    subtitle: "ఆధునిక వ్యవసాయం కోసం స్మార్ట్ వ్యవసాయ పరిష్కారాలు",
    language: "భాష",
    theme: "థీమ్",
    
    // Dashboard
    dashboardTitle: "వ్యవసాయ డ్యాష్‌బోర్డ్",
    weatherCard: "నేటి వాతావరణం",
    soilCard: "మట్టి స్థితి",
    marketCard: "మార్కెట్ ధరలు",
    advisoryCard: "తాజా సలహా",
    
    // Voice commands
    listening: "వింటున్నాను... మీ ప్రశ్న చెప్పండి",
    voiceSupported: "వాయిస్ మద్దతు అందుబాటులో"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}