// Sample database tables for FarmWise platform
// These will later be replaced with API calls

export const cropAdvisoryData = [
  {
    id: 1,
    location: "Punjab, India",
    recommendedCrop: "Wheat",
    reasoning: "Ideal soil conditions, favorable winter temperature, and adequate water availability make wheat the best choice for current season."
  },
  {
    id: 2,
    location: "Maharashtra, India",
    recommendedCrop: "Cotton",
    reasoning: "Black soil rich in calcium and magnesium, suitable rainfall pattern, and market demand support cotton cultivation."
  },
  {
    id: 3,
    location: "Kerala, India",
    recommendedCrop: "Rice",
    reasoning: "High humidity, consistent rainfall, and clayey soil conditions are perfect for paddy cultivation."
  },
  {
    id: 4,
    location: "Rajasthan, India",
    recommendedCrop: "Millet",
    reasoning: "Drought-resistant crop suitable for arid climate, sandy soil, and limited water resources."
  }
];

export const soilData = [
  {
    id: 1,
    location: "Punjab",
    soilType: "Alluvial",
    pH: 7.2,
    nitrogen: 85,
    phosphorus: 32,
    potassium: 78,
    recommendation: "Apply 20kg urea and 15kg DAP per acre. Soil pH is optimal for wheat cultivation."
  },
  {
    id: 2,
    location: "Maharashtra",
    soilType: "Black Cotton",
    pH: 8.1,
    nitrogen: 72,
    phosphorus: 28,
    potassium: 92,
    recommendation: "Reduce alkalinity by adding sulfur. Apply 18kg urea and 12kg SSP per acre."
  },
  {
    id: 3,
    location: "Kerala",
    soilType: "Laterite",
    pH: 5.8,
    nitrogen: 68,
    phosphorus: 24,
    potassium: 65,
    recommendation: "Apply lime to increase pH. Add 22kg urea, 16kg DAP, and 10kg MOP per acre."
  }
];

export const weatherData = [
  {
    id: 1,
    location: "Punjab",
    temperature: 18,
    rainfall: 2.5,
    humidity: 65,
    advisory: "Light rainfall expected. Good time for wheat sowing. Monitor for fungal diseases."
  },
  {
    id: 2,
    location: "Maharashtra",
    temperature: 28,
    rainfall: 0,
    humidity: 45,
    advisory: "Dry weather continues. Ensure adequate irrigation for cotton. Watch for pest attacks."
  },
  {
    id: 3,
    location: "Kerala",
    temperature: 26,
    rainfall: 8.2,
    humidity: 85,
    advisory: "Heavy rainfall alert. Ensure proper drainage in paddy fields. Risk of blast disease."
  }
];

export const pestLibrary = [
  {
    id: 1,
    pestName: "Aphids",
    symptoms: "Small green/black insects on leaves, sticky honeydew, yellowing leaves",
    remedy: "Spray neem oil solution or use ladybird beetles as biological control. Apply systemic insecticides if severe."
  },
  {
    id: 2,
    pestName: "Leaf Blight",
    symptoms: "Brown spots on leaves, yellowing, premature leaf drop",
    remedy: "Remove affected leaves, improve air circulation, apply copper-based fungicide spray every 7-10 days."
  },
  {
    id: 3,
    pestName: "Root Rot",
    symptoms: "Wilting plants, brown/black roots, stunted growth",
    remedy: "Improve drainage, reduce watering, apply fungicide to soil, use disease-resistant varieties."
  },
  {
    id: 4,
    pestName: "Whitefly",
    symptoms: "Tiny white insects under leaves, yellowing leaves, sticky honeydew",
    remedy: "Use yellow sticky traps, spray insecticidal soap, release natural predators like Encarsia formosa."
  }
];

export const marketPrices = [
  {
    id: 1,
    crop: "Wheat",
    market: "Delhi Mandi",
    price: 2150,
    date: "2024-01-15",
    change: "+2.3%"
  },
  {
    id: 2,
    crop: "Rice",
    market: "Mumbai APMC",
    price: 3200,
    date: "2024-01-15",
    change: "-1.2%"
  },
  {
    id: 3,
    crop: "Cotton",
    market: "Nagpur Market",
    price: 6800,
    date: "2024-01-15",
    change: "+5.8%"
  },
  {
    id: 4,
    crop: "Sugarcane",
    market: "Pune APMC",
    price: 350,
    date: "2024-01-15",
    change: "+1.5%"
  },
  {
    id: 5,
    crop: "Onion",
    market: "Nashik Market",
    price: 2800,
    date: "2024-01-15",
    change: "-8.2%"
  }
];

export const voiceResponses = [
  {
    id: 1,
    command: "weather",
    response: "Today's weather in your area shows 26°C temperature with 65% humidity. Light rainfall expected this evening."
  },
  {
    id: 2,
    command: "soil",
    response: "Your soil analysis shows pH 7.2 with good nitrogen levels. Recommended to apply organic fertilizer this week."
  },
  {
    id: 3,
    command: "prices",
    response: "Current wheat prices are 2,150 rupees per quintal in Delhi Mandi, showing a 2.3% increase from yesterday."
  },
  {
    id: 4,
    command: "advisory",
    response: "Based on current conditions, this is an ideal time for wheat sowing in your region. Ensure proper seed treatment before planting."
  }
];

export const chatbotResponses = [
  {
    id: 1,
    language: "English",
    userInput: "How to control pests?",
    botResponse: "For effective pest control: 1) Regular field monitoring 2) Use of beneficial insects 3) Neem-based sprays 4) Crop rotation 5) Remove infected plants immediately."
  },
  {
    id: 2,
    language: "Hindi",
    userInput: "मिट्टी की जांच कैसे करें?",
    botResponse: "मिट्टी की जांच के लिए: 1) नमूना एकत्र करें 2) pH मीटर का उपयोग करें 3) NPK टेस्ट किट से जांचें 4) नजदीकी कृषि केंद्र में भेजें 5) परिणाम के आधार पर उर्वरक डालें।"
  },
  {
    id: 3,
    language: "English",
    userInput: "Best time to plant wheat?",
    botResponse: "Wheat planting season: Late October to early December is ideal. Soil temperature should be 15-20°C. Ensure adequate moisture and prepare land 2-3 weeks before sowing."
  }
];

export const feedbackData = [
  {
    id: 1,
    farmerName: "Ramesh Kumar",
    location: "Punjab",
    message: "FarmWise helped me increase my wheat yield by 20%. The soil recommendations were very accurate.",
    rating: 5,
    date: "2024-01-10"
  },
  {
    id: 2,
    farmerName: "Priya Sharma", 
    location: "Maharashtra",
    message: "Weather alerts saved my cotton crop from unexpected rainfall. Great platform!",
    rating: 4,
    date: "2024-01-12"
  },
  {
    id: 3,
    farmerName: "Suresh Patel",
    location: "Gujarat",
    message: "Market price tracking feature helps me sell at the right time. Very useful app.",
    rating: 5,
    date: "2024-01-14"
  }
];