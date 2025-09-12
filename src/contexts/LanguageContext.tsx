import React, { useState, ReactNode } from 'react';
import { translationService, SUPPORTED_LANGUAGES, type SupportedLanguage } from '../services/translationService';
import { LanguageContext } from './LanguageContextDefinition';

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
    marketplace: "Marketplace",
    chatbot: "Chatbot",
    feedback: "Feedback",
    
    // Common terms
    welcome: "Welcome to CropCare",
    subtitle: "Smart farming solutions for modern agriculture",
    language: "Language",
    theme: "Theme",
    
    // Dashboard
    welcomeMessage: "Welcome to CropCare",
    todaysWeather: "Today's Weather",
    soilStatus: "Soil Status",
    marketUpdates: "Market Updates",
    cropRecommendations: "Crop Recommendations",
    
    // Soil Health
    soilAnalysis: "Soil Analysis",
    nutrientLevels: "Nutrient Levels",
    phLevel: "pH Level",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    organicMatter: "Organic Matter",
    soilType: "Soil Type",
    recommendations: "Recommendations",
    
    // Weather
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    windSpeed: "Wind Speed",
    forecast: "Forecast",
    
    // Crops
    cropName: "Crop Name",
    plantingDate: "Planting Date",
    harvestDate: "Harvest Date",
    growthStage: "Growth Stage",
    expectedYield: "Expected Yield",
    
    // Market
    price: "Price",
    quantity: "Quantity",
    location: "Location",
    date: "Date",
    trend: "Trend",
    
    // Chatbot
    askQuestion: "Type your farming question...",
    typeMessage: "Type your farming question...",
    send: "Send",
    voiceInput: "Voice Input",
    suggestions: "Suggestions",
    
    // Common UI Elements
    search: "Search",
    filter: "Filter",
    select: "Select",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",
    reset: "Reset",
    sort: "Sort",
    export: "Export",
    import: "Import",
    view: "View",
    add: "Add",
    remove: "Remove",
    update: "Update",
    refresh: "Refresh",
    home: "Home",
    settings: "Settings",
    help: "Help",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    
    // Voice commands
    listening: "Listening... Ask your question",
    voiceSupported: "Voice Supported",
    startListening: "Start Listening",
    stopListening: "Stop Listening",
    speak: "Speak",
    speaking: "Speaking...",
    voiceNotSupported: "Your browser doesn't support speech recognition. Please use a modern browser like Chrome or Edge.",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI Assistant",
    aiAssistantDescription: "Get intelligent AI-powered answers to your farming questions with voice and multilingual support. Powered by Gemini 2.5 Pro with comprehensive agricultural data.",
    voiceLanguageControls: "Voice & Language Controls",
    chatWithCropCareAI: "Chat with CropCare AI"
  },
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    advisory: "फसल सलाह",
    soilHealth: "मिट्टी स्वास्थ्य",
    weather: "मौसम",
    pestDetection: "कीट पहचान",
    marketPrices: "बाजार भाव",
    chatbot: "चैटबॉट",
    feedback: "प्रतिक्रिया",
    
    // Common terms
    welcome: "CropCare में आपका स्वागत है",
    subtitle: "आधुनिक कृषि के लिए स्मार्ट खेती समाधान",
    language: "भाषा",
    theme: "थीम",
    
    // Dashboard
    welcomeMessage: "CropCare में आपका स्वागत है",
    todaysWeather: "आज का मौसम",
    soilStatus: "मिट्टी की स्थिति",
    marketUpdates: "बाजार अपडेट",
    cropRecommendations: "फसल सुझाव",
    
    // Soil Health
    soilAnalysis: "मिट्टी विश्लेषण",
    nutrientLevels: "पोषक तत्व स्तर",
    phLevel: "पीएच स्तर",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फास्फोरस",
    potassium: "पोटेशियम",
    organicMatter: "जैविक पदार्थ",
    soilType: "मिट्टी का प्रकार",
    recommendations: "सुझाव",
    
    // Weather
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "बारिश",
    windSpeed: "हवा की गति",
    forecast: "पूर्वानुमान",
    
    // Crops
    cropName: "फसल का नाम",
    plantingDate: "बुआई की तारीख",
    harvestDate: "कटाई की तारीख",
    growthStage: "वृद्धि चरण",
    expectedYield: "अपेक्षित उत्पादन",
    
    // Market
    price: "कीमत",
    quantity: "मात्रा",
    location: "स्थान",
    date: "तारीख",
    trend: "रुझान",
    
    // Chatbot
    askQuestion: "अपना प्रश्न पूछें",
    typeMessage: "अपना कृषि प्रश्न टाइप करें...",
    send: "भेजें",
    voiceInput: "आवाज इनपुट",
    suggestions: "सुझाव",
    
    // Common UI Elements
    search: "खोजें",
    filter: "फिल्टर",
    select: "चुनें",
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सहेजें",
    edit: "संपादित करें",
    delete: "हटाएं",
    close: "बंद करें",
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    warning: "चेतावनी",
    info: "जानकारी",
    reset: "रीसेट करें",
    sort: "क्रमबद्ध करें",
    export: "निर्यात",
    import: "आयात",
    view: "देखें",
    add: "जोड़ें",
    remove: "हटाएं",
    update: "अपडेट करें",
    refresh: "ताज़ा करें",
    home: "होम",
    settings: "सेटिंग्स",
    help: "सहायता",
    about: "के बारे में",
    contact: "संपर्क",
    privacy: "गोपनीयता",
    terms: "नियम",
    
    // Voice commands
    listening: "सुन रहा हूं... अपना प्रश्न पूछें",
    voiceSupported: "आवाज समर्थित",
    startListening: "सुनना शुरू करें",
    stopListening: "सुनना बंद करें",
    speak: "बोलें",
    speaking: "बोल रहा हूं...",
    voiceNotSupported: "आपका ब्राउज़र स्पीच रिकग्निशन का समर्थन नहीं करता। कृपया क्रोम या एज जैसे आधुनिक ब्राउज़र का उपयोग करें।",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI सहायक",
    aiAssistantDescription: "आवाज और बहुभाषी समर्थन के साथ अपने कृषि प्रश्नों के लिए बुद्धिमान AI-संचालित उत्तर प्राप्त करें। व्यापक कृषि डेटा के साथ Gemini 2.5 Pro द्वारा संचालित।",
    voiceLanguageControls: "आवाज और भाषा नियंत्रण",
    chatWithCropCareAI: "CropCare AI के साथ चैट करें"
  },
  te: {
    // Navigation
    dashboard: "డాష్‌బోర్డ్",
    advisory: "పంట సలహా",
    soilHealth: "మట్టి ఆరోగ్యం",
    weather: "వాతావరణం",
    pestDetection: "కీటకాల గుర్తింపు",
    marketPrices: "మార్కెట్ ధరలు",
    chatbot: "చాట్‌బాట్",
    feedback: "అభిప్రాయం",
    
    // Common terms
    welcome: "CropCare కు స్వాగతం",
    subtitle: "ఆధునిక వ్యవసాయం కోసం స్మార్ట్ వ్యవసాయ పరిష్కారాలు",
    language: "భాష",
    theme: "థీమ్",
    
    // Dashboard
    welcomeMessage: "CropCare కు స్వాగతం",
    todaysWeather: "నేటి వాతావరణం",
    soilStatus: "మట్టి స్థితి",
    marketUpdates: "మార్కెట్ అప్‌డేట్‌లు",
    cropRecommendations: "పంట సిఫార్సులు",
    
    // Soil Health
    soilAnalysis: "మట్టి విశ్లేషణ",
    nutrientLevels: "పోషక స్థాయిలు",
    phLevel: "పీహెచ్ స్థాయి",
    nitrogen: "నత్రజని",
    phosphorus: "భాస్వరం",
    potassium: "పొటాషియం",
    organicMatter: "సేంద్రీయ పదార్థం",
    soilType: "మట్టి రకం",
    recommendations: "సిఫార్సులు",
    
    // Weather
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    rainfall: "వర్షపాతం",
    windSpeed: "గాలి వేగం",
    forecast: "అంచనా",
    
    // Crops
    cropName: "పంట పేరు",
    plantingDate: "విత్తన తేదీ",
    harvestDate: "కోత తేదీ",
    growthStage: "వృద్ధి దశ",
    expectedYield: "అంచనా దిగుబడి",
    
    // Market
    price: "ధర",
    quantity: "పరిమాణం",
    location: "ప్రాంతం",
    date: "తేదీ",
    trend: "ధోరణి",
    
    // Chatbot
    askQuestion: "ప్రశ్న అడగండి",
    typeMessage: "మీ వ్యవసాయ ప్రశ్న టైప్ చేయండి...",
    send: "పంపండి",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    suggestions: "సూచనలు",
    
    // Common UI Elements
    search: "వెతకండి",
    filter: "ఫిల్టర్",
    select: "ఎంచుకోండి",
    submit: "సమర్పించండి",
    cancel: "రద్దు చేయండి",
    save: "సేవ్ చేయండి",
    edit: "సవరించండి",
    delete: "తొలగించండి",
    close: "మూసివేయండి",
    back: "వెనుకకు",
    next: "తదుపరి",
    previous: "మునుపటి",
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం",
    success: "విజయం",
    warning: "హెచ్చరిక",
    info: "సమాచారం",
    reset: "రీసెట్ చేయండి",
    sort: "క్రమబద్ధీకరించండి",
    export: "నిర్యాత",
    import: "దిగుమతి",
    view: "చూడండి",
    add: "జోడించండి",
    remove: "తొలగించండి",
    update: "అప్‌డేట్ చేయండి",
    refresh: "తాజా చేయండి",
    home: "హోమ్",
    settings: "సెట్టింగులు",
    help: "సహాయం",
    about: "గురించి",
    contact: "సంప్రదించండి",
    privacy: "గోప్యత",
    terms: "నిబంధనలు",
    
    // Voice commands
    listening: "వింటున్నాను... మీ ప్రశ్న చెప్పండి",
    voiceSupported: "వాయిస్ మద్దతు అందుబాటులో",
    startListening: "వినడం ప్రారంభించండి",
    stopListening: "వినడం ఆపండి",
    speak: "మాట్లాడండి",
    speaking: "మాట్లాడుతున్నాను",
    voiceNotSupported: "మీ బ్రౌజర్ స్పీచ్ రికగ్నిషన్‌ను సపోర్ట్ చేయదు. దయచేసి క్రోమ్ లేదా ఎడ్జ్ వంటి ఆధునిక బ్రౌజర్‌ను ఉపయోగించండి.",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI అసిస్టెంట్",
    aiAssistantDescription: "వాయిస్ మరియు బహుభాషా మద్దతుతో మీ వ్యవసాయ ప్రశ్నలకు తెలివైన AI-శక్తితో కూడిన సమాధానాలను పొందండి. సమగ్ర వ్యవసాయ డేటాతో Gemini 2.5 Pro ద్వారా శక్తినిస్తుంది.",
    voiceLanguageControls: "వాయిస్ మరియు భాషా నియంత్రణలు",
    chatWithCropCareAI: "CropCare AI తో చాట్ చేయండి"
  },
  
  // Punjabi
  pa: {
    // Navigation
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    advisory: "ਫਸਲ ਸਲਾਹ",
    soilHealth: "ਮਿੱਟੀ ਸਿਹਤ",
    weather: "ਮੌਸਮ",
    pestDetection: "ਕੀੜੇ ਪਛਾਣ",
    marketPrices: "ਮਾਰਕੀਟ ਰੇਟ",
    chatbot: "ਚੈਟਬੋਟ",
    feedback: "ਫੀਡਬੈਕ",
    
    // Common UI Elements
    search: "ਖੋਜ",
    filter: "ਫਿਲਟਰ",
    select: "ਚੁਣੋ",
    submit: "ਜਮ੍ਹਾਂ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    save: "ਸੇਵ ਕਰੋ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    
    // Dashboard
    welcomeMessage: "CropCare ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    todaysWeather: "ਅੱਜ ਦਾ ਮੌਸਮ",
    soilStatus: "ਮਿੱਟੀ ਦੀ ਸਥਿਤੀ",
    marketUpdates: "ਮਾਰਕੀਟ ਅਪਡੇਟ",
    cropRecommendations: "ਫਸਲ ਸਿਫਾਰਿਸ਼ਾਂ",
    
    // Weather
    temperature: "ਤਾਪਮਾਨ",
    humidity: "ਨਮੀ",
    rainfall: "ਬਰਸਾਤ",
    windSpeed: "ਹਵਾ ਦੀ ਰਫਤਾਰ",
    forecast: "ਪੂਰਵ ਅਨੁਮਾਨ",
    
    // Crops
    cropName: "ਫਸਲ ਦਾ ਨਾਮ",
    plantingDate: "ਬੀਜਣ ਦੀ ਤਾਰੀਖ",
    harvestDate: "ਕਟਾਈ ਦੀ ਤਾਰੀਖ",
    growthStage: "ਵਿਕਾਸ ਦਾ ਪੜਾਅ",
    expectedYield: "ਉਮੀਦ ਕੀਤੀ ਪੈਦਾਵਾਰ",
    
    // Market
    price: "ਕੀਮਤ",
    quantity: "ਮਾਤਰਾ",
    location: "ਸਥਾਨ",
    date: "ਤਾਰੀਖ",
    trend: "ਰੁਝਾਨ",
    
    // Chatbot
    askQuestion: "ਸਵਾਲ ਪੁੱਛੋ",
    typeMessage: "ਆਪਣਾ ਖੇਤੀ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
    send: "ਭੇਜੋ",
    voiceInput: "ਆਵਾਜ਼ ਇਨਪੁੱਟ",
    suggestions: "ਸੁਝਾਅ",
    
    // Common UI Elements
    edit: "ਸੰਪਾਦਨ",
    delete: "ਮਿਟਾਓ",
    close: "ਬੰਦ ਕਰੋ",
    back: "ਵਾਪਸ",
    next: "ਅਗਲਾ",
    previous: "ਪਿਛਲਾ",
    error: "ਗਲਤੀ",
    success: "ਸਫਲਤਾ",
    warning: "ਚੇਤਾਵਨੀ",
    info: "ਜਾਣਕਾਰੀ",
    reset: "ਰੀਸੈੱਟ ਕਰੋ",
    sort: "ਕ੍ਰਮਬੱਧ ਕਰੋ",
    export: "ਨਿਰਯਾਤ",
    import: "ਆਯਾਤ",
    view: "ਦੇਖੋ",
    add: "ਜੋੜੋ",
    remove: "ਹਟਾਓ",
    update: "ਅਪਡੇਟ ਕਰੋ",
    refresh: "ਤਾਜ਼ਾ ਕਰੋ",
    home: "ਘਰ",
    settings: "ਸੈਟਿੰਗਾਂ",
    help: "ਮਦਦ",
    about: "ਬਾਰੇ",
    contact: "ਸੰਪਰਕ",
    privacy: "ਗੋਪਨੀਯਤਾ",
    terms: "ਨਿਯਮ",
    
    // Voice commands
    listening: "ਸੁਣ ਰਿਹਾ ਹਾਂ... ਆਪਣਾ ਸਵਾਲ ਪੁੱਛੋ",
    voiceSupported: "ਆਵਾਜ਼ ਸਮਰਥਿਤ",
    startListening: "ਸੁਣਨਾ ਸ਼ੁਰੂ ਕਰੋ",
    stopListening: "ਸੁਣਨਾ ਬੰਦ ਕਰੋ",
    speak: "ਬੋਲੋ",
    speaking: "ਬੋਲ ਰਿਹਾ ਹਾਂ...",
    voiceNotSupported: "ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ ਸਪੀਚ ਰਿਕਗਨਿਸ਼ਨ ਦਾ ਸਮਰਥਨ ਨਹੀਂ ਕਰਦਾ। ਕਿਰਪਾ ਕਰਕੇ ਕ੍ਰੋਮ ਜਾਂ ਐਜ ਵਰਗੇ ਆਧੁਨਿਕ ਬ੍ਰਾਊਜ਼ਰ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI ਸਹਾਇਕ",
    aiAssistantDescription: "ਆਵਾਜ਼ ਅਤੇ ਬਹੁਭਾਸ਼ੀ ਸਮਰਥਨ ਦੇ ਨਾਲ ਆਪਣੇ ਖੇਤੀ ਸਵਾਲਾਂ ਲਈ ਬੁੱਧੀਮਾਨ AI-ਸੰਚਾਲਿਤ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ। ਵਿਆਪਕ ਖੇਤੀ ਡੇਟਾ ਦੇ ਨਾਲ Gemini 2.5 Pro ਦੁਆਰਾ ਸੰਚਾਲਿਤ।",
    voiceLanguageControls: "ਆਵਾਜ਼ ਅਤੇ ਭਾਸ਼ਾ ਨਿਯੰਤਰਣ",
    chatWithCropCareAI: "CropCare AI ਨਾਲ ਚੈਟ ਕਰੋ"
  },
  
  // Tamil
  ta: {
    // Navigation
    dashboard: "டாஷ்போர்டு",
    advisory: "பயிர் ஆலோசனை",
    soilHealth: "மண் ஆரோக்கியம்",
    weather: "வானிலை",
    pestDetection: "பூச்சி கண்டறிதல்",
    marketPrices: "சந்தை விலைகள்",
    chatbot: "சாட்பாட்",
    feedback: "கருத்து",
    
    // Common terms
    temperature: "வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    rainfall: "மழைப்பொழிவு",
    windSpeed: "காற்றின் வேகம்",
    forecast: "முன்னறிவிப்பு",
    
    // Crops
    cropName: "பயிர் பெயர்",
    plantingDate: "நடவு தேதி",
    harvestDate: "அறுவடை தேతி",
    growthStage: "வளர்ச்சி நிலை",
    expectedYield: "எதிர்பார்க்கப்படும் விளைச்சல்",
    
    // Market
    price: "விலை",
    quantity: "அளவு",
    location: "இடம்",
    date: "தேதி",
    trend: "போக்கு",
    
    // Chatbot
    askQuestion: "கேள்வி கேளுங்கள்",
    typeMessage: "உங்கள் விவசாய கேள்வியை தட்டச்சு செய்யுங்கள்...",
    send: "அனுப்பு",
    voiceInput: "குரல் உள்ளீடு",
    suggestions: "பரிந்துரைகள்",
    
    // Common UI Elements
    search: "தேடு",
    filter: "வடிகட்டி",
    select: "தேர்ந்தெடு",
    submit: "சமர்ப்பிக்கவும்",
    cancel: "ரத்து செய்",
    save: "சேமி",
    edit: "திருத்து",
    delete: "நீக்கு",
    close: "மூடு",
    back: "பின்",
    next: "அடுத்து",
    previous: "முந்தைய",
    loading: "ஏற்றுகிறது...",
    error: "பிழை",
    success: "வெற்றி",
    warning: "எச்சரிக்கை",
    info: "தகவல்",
    reset: "மீட்டமை",
    sort: "வரிசைப்படுத்து",
    export: "ஏற்றுமதி",
    import: "இறக்குமதி",
    view: "பார்",
    add: "சேர்",
    remove: "நீக்கு",
    update: "புதுப்பிக்கவும்",
    refresh: "புதுப்பிக்கவும்",
    home: "வீடு",
    settings: "அமைப்புகள்",
    help: "உதவி",
    about: "பற்றி",
    contact: "தொடர்பு",
    privacy: "தனியுரிமை",
    terms: "விதிமுறைகள்",
    
    // Voice commands
    listening: "கேட்கிறேன்... உங்கள் கேள்வியை கேளுங்கள்",
    voiceSupported: "குரல் ஆதரவு",
    startListening: "கேட்க ஆரம்பிக்கவும்",
    stopListening: "கேட்பதை நிறுத்தவும்",
    speak: "பேசு",
    speaking: "பேசுகிறேன்...",
    voiceNotSupported: "உங்கள் உலாவி பேச்சு அங்கீகாரத்தை ஆதரிக்கவில்லை. தயவுசெய்து Chrome அல்லது Edge போன்ற நவீன உலாவியைப் பயன்படுத்தவும்.",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI உதவியாளர்",
    aiAssistantDescription: "குரல் மற்றும் பல மொழி ஆதரவுடன் உங்கள் விவசாய கேள்விகளுக்கு அறிவார்ந்த AI-இயங்கும் பதில்களைப் பெறுங்கள். விரிவான விவசாய தரவுகளுடன் Gemini 2.5 Pro மூலம் இயக்கப்படுகிறது.",
    voiceLanguageControls: "குரல் மற்றும் மொழி கட்டுப்பாடுகள்",
    chatWithCropCareAI: "CropCare AI உடன் அரட்டை"
  },
  
  // Bengali
  bn: {
    // Navigation
    dashboard: "ড্যাশবোর্ড",
    advisory: "ফসল পরামর্শ",
    soilHealth: "মাটির স্বাস্থ্য",
    weather: "আবহাওয়া",
    pestDetection: "কীটপতঙ্গ সনাক্তকরণ",
    marketPrices: "বাজার দাম",
    chatbot: "চ্যাটবট",
    feedback: "মতামত",
    
    // Weather
    temperature: "তাপমাত্রা",
    humidity: "আর্দ্রতা",
    rainfall: "বৃষ্টিপাত",
    windSpeed: "বাতাসের গতি",
    forecast: "পূর্বাভাস",
    
    // Crops
    cropName: "ফসলের নাম",
    plantingDate: "রোপণের তারিখ",
    harvestDate: "ফসল কাটার তারিখ",
    growthStage: "বৃদ্ধির পর্যায়",
    expectedYield: "প্রত্যাশিত ফলন",
    
    // Market
    price: "দাম",
    quantity: "পরিমাণ",
    location: "অবস্থান",
    date: "তারিখ",
    trend: "প্রবণতা",
    
    // Chatbot
    askQuestion: "প্রশ্ন করুন",
    typeMessage: "আপনার কৃষি প্রশ্ন টাইপ করুন...",
    send: "পাঠান",
    voiceInput: "ভয়েস ইনপুট",
    suggestions: "পরামর্শ",
    
    // Common UI Elements
    search: "অনুসন্ধান",
    filter: "ফিল্টার",
    select: "নির্বাচন করুন",
    submit: "জমা দিন",
    cancel: "বাতিল",
    save: "সংরক্ষণ",
    edit: "সম্পাদনা",
    delete: "মুছুন",
    close: "বন্ধ",
    back: "পিছনে",
    next: "পরবর্তী",
    previous: "পূর্ববর্তী",
    loading: "লোড হচ্ছে...",
    error: "ত্রুটি",
    success: "সফল",
    warning: "সতর্কতা",
    info: "তথ্য",
    reset: "রিসেট",
    sort: "সাজান",
    export: "রপ্তানি",
    import: "আমদানি",
    view: "দেখুন",
    add: "যোগ করুন",
    remove: "সরান",
    update: "আপডেট",
    refresh: "রিফ্রেশ",
    home: "হোম",
    settings: "সেটিংস",
    help: "সাহায্য",
    about: "সম্পর্কে",
    contact: "যোগাযোগ",
    privacy: "গোপনীয়তা",
    terms: "শর্তাবলী",
    
    // Voice commands
    listening: "শুনছি... আপনার প্রশ্ন করুন",
    voiceSupported: "ভয়েস সমর্থিত",
    startListening: "শোনা শুরু করুন",
    stopListening: "শোনা বন্ধ করুন",
    speak: "বলুন",
    speaking: "বলছি...",
    voiceNotSupported: "আপনার ব্রাউজার স্পিচ রিকগনিশন সমর্থন করে না। অনুগ্রহ করে Chrome বা Edge এর মতো আধুনিক ব্রাউজার ব্যবহার করুন।",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI সহায়ক",
    aiAssistantDescription: "ভয়েস এবং বহুভাষিক সহাযতা সহ আপনার কৃষি প্রশ্নের জন্য বুদ্ধিমান AI-চালিত উত্তর পান। ব্যাপক কৃষি ডেটা সহ Gemini 2.5 Pro দ্বারা চালিত।",
    voiceLanguageControls: "ভয়েস এবং ভাষা নিয়ন্ত্রণ",
    chatWithCropCareAI: "CropCare AI এর সাথে চ্যাট করুন"
  },
  
  // Gujarati
  gu: {
    // Navigation
    dashboard: "ડેશબોર્ડ",
    advisory: "પાક સલાહ",
    soilHealth: "માટીની આરોગ્ય",
    weather: "હવામાન",
    pestDetection: "જંતુ શોધ",
    marketPrices: "બજાર ભાવ",
    chatbot: "ચેટબોટ",
    feedback: "પ્રતિસાદ",
    
    // Weather
    temperature: "તાપમાન",
    humidity: "ભેજ",
    rainfall: "વરસાદ",
    windSpeed: "પવનની ગતિ",
    forecast: "આગાહી",
    
    // Crops
    cropName: "પાકનું નામ",
    plantingDate: "વાવણીની તારીખ",
    harvestDate: "કાપણીની તારીખ",
    growthStage: "વૃદ્ધિનો તબક્કો",
    expectedYield: "અપેક્ષિત ઉત્પાદન",
    
    // Market
    price: "કિંમત",
    quantity: "માત્રા",
    location: "સ્થાન",
    date: "તારીખ",
    trend: "વલણ",
    
    // Chatbot
    askQuestion: "પ્રશ્ન પૂછો",
    typeMessage: "તમારો ખેતીનો પ્રશ્ન ટાઇપ કરો...",
    send: "મોકલો",
    voiceInput: "વૉઇસ ઇનપુટ",
    suggestions: "સૂચનો",
    
    // Common UI Elements
    search: "શોધો",
    filter: "ફિલ્ટર",
    select: "પસંદ કરો",
    submit: "સબમિટ કરો",
    cancel: "રદ કરો",
    save: "સેવ કરો",
    edit: "સંપાદન",
    delete: "કાઢી નાખો",
    close: "બંધ કરો",
    back: "પાછા",
    next: "આગળ",
    previous: "પહેલાં",
    loading: "લોડ થઈ રહ્યું છે...",
    error: "ભૂલ",
    success: "સફળતા",
    warning: "ચેતવણી",
    info: "માહિતી",
    reset: "રીસેટ કરો",
    sort: "ક્રમમાં ગોઠવો",
    export: "નિકાસ",
    import: "આયાત",
    view: "જુઓ",
    add: "ઉમેરો",
    remove: "દૂર કરો",
    update: "અપડેટ કરો",
    refresh: "રિફ્રેશ કરો",
    home: "ઘર",
    settings: "સેટિંગ્સ",
    help: "મદદ",
    about: "વિશે",
    contact: "સંપર્ક",
    privacy: "ગોપનીયતા",
    terms: "શરતો",
    
    // Voice commands
    listening: "સાંભળી રહ્યો છું... તમારો પ્રશ્ન પૂછો",
    voiceSupported: "વૉઇસ સપોર્ટેડ",
    startListening: "સાંભળવાનું શરૂ કરો",
    stopListening: "સાંભળવાનું બંધ કરો",
    speak: "બોલો",
    speaking: "બોલી રહ્યો છું...",
    voiceNotSupported: "તમારું બ્રાઉઝર સ્પીચ રિકગ્નિશનને સપોર્ટ કરતું નથી. કૃપા કરીને Chrome અથવા Edge જેવા આધુનિક બ્રાઉઝરનો ઉપયોગ કરો.",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI સહાયક",
    aiAssistantDescription: "વૉઇસ અને બહુભાષી સપોર્ટ સાથે તમારા ખેતીના પ્રશ્નો માટે બુદ્ધિશાળી AI-સંચાલિત જવાબો મેળવો. વ્યાપક કૃષિ ડેટા સાથે Gemini 2.5 Pro દ્વારા સંચાલિત.",
    voiceLanguageControls: "વૉઇસ અને ભાષા નિયંત્રણો",
    chatWithCropCareAI: "CropCare AI સાથે ચેટ કરો"
  },
  
  // Kannada
  kn: {
    // Navigation
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    advisory: "ಬೆಳೆ ಸಲಹೆ",
    soilHealth: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    weather: "ಹವಾಮಾನ",
    pestDetection: "ಕೀಟ ಗುರುತಿಸುವಿಕೆ",
    marketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    chatbot: "ಚಾಟ್‌ಬಾಟ್",
    feedback: "ಅಭಿಪ್ರಾಯ",
    
    // Common terms
    welcome: "CropCare ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ",
    subtitle: "ಆಧುನಿಕ ಕೃಷಿಗಾಗಿ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪರಿಹಾರಗಳು",
    language: "ಭಾಷೆ",
    theme: "ಥೀಮ್",
    
    // Dashboard
    welcomeMessage: "CropCare ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ",
    todaysWeather: "ಇಂದಿನ ಹವಾಮಾನ",
    soilStatus: "ಮಣ್ಣಿನ ಸ್ಥಿತಿ",
    marketUpdates: "ಮಾರುಕಟ್ಟೆ ಅಪ್‌ಡೇಟ್‌ಗಳು",
    cropRecommendations: "ಬೆಳೆ ಶಿಫಾರಸುಗಳು",
    
    // Soil Health
    soilAnalysis: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ",
    nutrientLevels: "ಪೋಷಕಾಂಶದ ಮಟ್ಟಗಳು",
    phLevel: "ಪಿಎಚ್ ಮಟ್ಟ",
    nitrogen: "ಸಾರಜನಕ",
    phosphorus: "ರಂಜಕ",
    potassium: "ಪೊಟ್ಯಾಸಿಯಮ್",
    organicMatter: "ಸಾವಯವ ಪದಾರ್ಥ",
    soilType: "ಮಣ್ಣಿನ ವಿಧ",
    recommendations: "ಶಿಫಾರಸುಗಳು",
    
    // Weather
    temperature: "ತಾಪಮಾನ",
    humidity: "ಆರ್ದ್ರತೆ",
    rainfall: "ಮಳೆ",
    windSpeed: "ಗಾಳಿಯ ವೇಗ",
    forecast: "ಮುನ್ಸೂಚನೆ",
    
    // Crops
    cropName: "ಬೆಳೆಯ ಹೆಸರು",
    plantingDate: "ನೆಟ್ಟ ದಿನಾಂಕ",
    harvestDate: "ಕೊಯ್ಲಿನ ದಿನಾಂಕ",
    growthStage: "ಬೆಳವಣಿಗೆಯ ಹಂತ",
    expectedYield: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",
    
    // Market
    price: "ಬೆಲೆ",
    quantity: "ಪ್ರಮಾಣ",
    location: "ಸ್ಥಳ",
    date: "ದಿನಾಂಕ",
    trend: "ಪ್ರವೃತ್ತಿ",
    
    // Chatbot
    askQuestion: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
    typeMessage: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    send: "ಕಳುಹಿಸಿ",
    voiceInput: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
    suggestions: "ಸಲಹೆಗಳು",
    
    // Common UI Elements
    search: "ಹುಡುಕಿ",
    filter: "ಫಿಲ್ಟರ್",
    select: "ಆಯ್ಕೆ ಮಾಡಿ",
    submit: "ಸಲ್ಲಿಸಿ",
    cancel: "ರದ್ದುಗೊಳಿಸಿ",
    save: "ಉಳಿಸಿ",
    edit: "ಸಂಪಾದಿಸಿ",
    delete: "ಅಳಿಸಿ",
    close: "ಮುಚ್ಚಿ",
    back: "ಹಿಂದೆ",
    next: "ಮುಂದೆ",
    previous: "ಹಿಂದಿನ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "ದೋಷ",
    success: "ಯಶಸ್ಸು",
    warning: "ಎಚ್ಚರಿಕೆ",
    info: "ಮಾಹಿತಿ",
    reset: "ಮರುಹೊಂದಿಸಿ",
    sort: "ವಿಂಗಡಿಸಿ",
    export: "ರಫ್ತು",
    import: "ಆಮದು",
    view: "ನೋಡಿ",
    add: "ಸೇರಿಸಿ",
    remove: "ತೆಗೆದುಹಾಕಿ",
    update: "ಅಪ್‌ಡೇಟ್ ಮಾಡಿ",
    refresh: "ರಿಫ್ರೆಶ್ ಮಾಡಿ",
    home: "ಮನೆ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    help: "ಸಹಾಯ",
    about: "ಬಗ್ಗೆ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    privacy: "ಗೌಪ್ಯತೆ",
    terms: "ನಿಯಮಗಳು",
    
    // Voice commands
    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ... ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ",
    voiceSupported: "ಧ್ವನಿ ಬೆಂಬಲಿತ",
    startListening: "ಕೇಳಲು ಪ್ರಾರಂಭಿಸಿ",
    stopListening: "ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿ",
    speak: "ಮಾತನಾಡಿ",
    speaking: "ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ...",
    voiceNotSupported: "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ. ದಯವಿಟ್ಟು Chrome ಅಥವಾ Edge ವಂತಹ ಆಧುನಿಕ ಬ್ರೌಸರ್ ಅನ್ನು ಬಳಸಿ.",
    
    // Chatbot specific
    cropCareAIAssistant: "CropCare AI ಸಹಾಯಕ",
    aiAssistantDescription: "ಧ್ವನಿ ಮತ್ತು ಬಹುಭಾಷಾ ಬೆಂಬಲದೊಂದಿಗೆ ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಬುದ್ಧಿವಂತ AI-ಚಾಲಿತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ. ವ್ಯಾಪಕ ಕೃಷಿ ಡೇಟಾದೊಂದಿಗೆ Gemini 2.5 Pro ನಿಂದ ಚಾಲಿತ.",
    voiceLanguageControls: "ಧ್ವನಿ ಮತ್ತು ಭಾಷಾ ನಿಯಂತ್ರಣಗಳು",
    chatWithCropCareAI: "CropCare AI ಯೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ"
  },
  
  // Malayalam
  ml: {
    // Navigation
    dashboard: "ഡാഷ്‌ബോർഡ്",
    advisory: "വിള ഉപദേശം",
    soilHealth: "മണ്ണിന്റെ ആരോഗ്യം",
    weather: "കാലാവസ്ഥ",
    pestDetection: "കീട തിരിച്ചറിയൽ",
    marketPrices: "മാർക്കറ്റ് വിലകൾ",
    chatbot: "ചാറ്റ്ബോട്ട്",
    feedback: "അഭിപ്രായം",
    
    // Common UI Elements
    search: "തിരയുക",
    filter: "ഫിൽട്ടർ",
    select: "തിരഞ്ഞെടുക്കുക",
    submit: "സമർപ്പിക്കുക",
    cancel: "റദ്ദാക്കുക",
    save: "സേവ് ചെയ്യുക",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    
    // Dashboard
    welcomeMessage: "CropCare ലേക്ക് സ്വാഗതം",
    todaysWeather: "ഇന്നത്തെ കാലാവസ്ഥ",
    soilStatus: "മണ്ണിന്റെ അവസ്ഥ",
    marketUpdates: "മാർക്കറ്റ് അപ്ഡേറ്റുകൾ",
    cropRecommendations: "വിള ശുപാർശകൾ"
  },
  
  // Marathi
  mr: {
    // Navigation
    dashboard: "डॅशबोर्ड",
    advisory: "पीक सल्ला",
    soilHealth: "माती आरोग्य",
    weather: "हवामान",
    pestDetection: "कीड ओळख",
    marketPrices: "बाजार भाव",
    chatbot: "चॅटबॉट",
    feedback: "अभिप्राय",
    
    // Common UI Elements
    search: "शोधा",
    filter: "फिल्टर",
    select: "निवडा",
    submit: "सबमिट करा",
    cancel: "रद्द करा",
    save: "सेव्ह करा",
    loading: "लोड होत आहे...",
    
    // Dashboard
    welcomeMessage: "CropCare मध्ये आपले स्वागत आहे",
    todaysWeather: "आजचे हवामान",
    soilStatus: "माती स्थिती",
    marketUpdates: "बाजार अपडेट",
    cropRecommendations: "पीक शिफारसी"
  },
  
  // Odia
  or: {
    // Navigation
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    advisory: "ଫସଲ ପରାମର୍ଶ",
    soilHealth: "ମାଟି ସ୍ୱାସ୍ଥ୍ୟ",
    weather: "ପାଗ",
    pestDetection: "କୀଟ ଚିହ୍ନଟ",
    marketPrices: "ବଜାର ଦର",
    chatbot: "ଚାଟବଟ",
    feedback: "ମତାମତ",
    
    // Common UI Elements
    search: "ଖୋଜନ୍ତୁ",
    filter: "ଫିଲ୍ଟର",
    select: "ବାଛନ୍ତୁ",
    submit: "ଦାଖଲ କରନ୍ତୁ",
    cancel: "ବାତିଲ କରନ୍ତୁ",
    save: "ସେଭ କରନ୍ତୁ",
    loading: "ଲୋଡ ହେଉଛି...",
    
    // Dashboard
    welcomeMessage: "CropCare ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ",
    todaysWeather: "ଆଜିର ପାଗ",
    soilStatus: "ମାଟି ଅବସ୍ଥା",
    marketUpdates: "ବଜାର ଅପଡେଟ",
    cropRecommendations: "ଫସଲ ସୁପାରିଶ"
  },
  
  // Urdu
  ur: {
    // Navigation
    dashboard: "ڈیش بورڈ",
    advisory: "فصل مشورہ",
    soilHealth: "مٹی کی صحت",
    weather: "موسم",
    pestDetection: "کیڑے کی شناخت",
    marketPrices: "مارکیٹ ریٹ",
    chatbot: "چیٹ بوٹ",
    feedback: "رائے",
    
    // Common UI Elements
    search: "تلاش کریں",
    filter: "فلٹر",
    select: "منتخب کریں",
    submit: "جمع کریں",
    cancel: "منسوخ کریں",
    save: "محفوظ کریں",
    loading: "لوڈ ہو رہا ہے...",
    
    // Dashboard
    welcomeMessage: "CropCare میں آپ کا خیر مقدم",
    todaysWeather: "آج کا موسم",
    soilStatus: "مٹی کی حالت",
    marketUpdates: "مارکیٹ اپ ڈیٹ",
    cropRecommendations: "فصل کی تجاویز"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const translateText = async (text: string, targetLang?: string): Promise<string> => {
    const target = targetLang || language;
    if (target === 'en' || !text) return text;

    setIsTranslating(true);
    try {
      const result = await translationService.translateText({
        text,
        sourceLang: 'en',
        targetLang: target
      });
      return result.translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  const getSupportedLanguages = (): SupportedLanguage[] => {
    return SUPPORTED_LANGUAGES;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      translateText, 
      getSupportedLanguages, 
      isTranslating 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}
