export interface SoilData {
  id: number;
  location: string;
  state: string;
  soilType: string;
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  recommendation: string;
  majorCrops: string[];
  climate: string;
}

export const indianStatesSoilData: SoilData[] = [
  // Andhra Pradesh
  {
    id: 1,
    location: "Andhra Pradesh",
    state: "Andhra Pradesh",
    soilType: "Red Sandy",
    pH: 6.8,
    nitrogen: 65,
    phosphorus: 28,
    potassium: 85,
    organicMatter: 1.2,
    recommendation: "Apply organic compost and balanced NPK fertilizers. Focus on water conservation techniques.",
    majorCrops: ["Rice", "Cotton", "Sugarcane", "Groundnut", "Maize"],
    climate: "Tropical"
  },
  // Arunachal Pradesh
  {
    id: 2,
    location: "Arunachal Pradesh",
    state: "Arunachal Pradesh",
    soilType: "Mountain Forest",
    pH: 5.8,
    nitrogen: 45,
    phosphorus: 22,
    potassium: 65,
    organicMatter: 3.5,
    recommendation: "Add lime to reduce acidity. Use organic fertilizers and practice terrace farming.",
    majorCrops: ["Rice", "Maize", "Millet", "Wheat", "Barley"],
    climate: "Subtropical Highland"
  },
  // Assam
  {
    id: 3,
    location: "Assam",
    state: "Assam",
    soilType: "Alluvial",
    pH: 6.2,
    nitrogen: 55,
    phosphorus: 25,
    potassium: 70,
    organicMatter: 2.8,
    recommendation: "Improve drainage and add organic matter. Use balanced fertilizers for tea cultivation.",
    majorCrops: ["Rice", "Tea", "Jute", "Sugarcane", "Mustard"],
    climate: "Subtropical"
  },
  // Bihar
  {
    id: 4,
    location: "Bihar",
    state: "Bihar",
    soilType: "Alluvial",
    pH: 7.2,
    nitrogen: 70,
    phosphorus: 32,
    potassium: 88,
    organicMatter: 2.1,
    recommendation: "Maintain soil fertility with crop rotation. Apply phosphorus-rich fertilizers.",
    majorCrops: ["Rice", "Wheat", "Maize", "Sugarcane", "Pulses"],
    climate: "Subtropical"
  },
  // Chhattisgarh
  {
    id: 5,
    location: "Chhattisgarh",
    state: "Chhattisgarh",
    soilType: "Red and Yellow",
    pH: 6.5,
    nitrogen: 58,
    phosphorus: 26,
    potassium: 75,
    organicMatter: 1.8,
    recommendation: "Add organic matter and practice mixed cropping. Use micronutrient supplements.",
    majorCrops: ["Rice", "Maize", "Sugarcane", "Soybean", "Groundnut"],
    climate: "Tropical"
  },
  // Goa
  {
    id: 6,
    location: "Goa",
    state: "Goa",
    soilType: "Laterite",
    pH: 5.9,
    nitrogen: 42,
    phosphorus: 20,
    potassium: 68,
    organicMatter: 2.2,
    recommendation: "Add lime and organic compost. Focus on coconut and spice cultivation.",
    majorCrops: ["Rice", "Coconut", "Cashew", "Spices", "Sugarcane"],
    climate: "Tropical Coastal"
  },
  // Gujarat
  {
    id: 7,
    location: "Gujarat",
    state: "Gujarat",
    soilType: "Black Cotton",
    pH: 7.8,
    nitrogen: 72,
    phosphorus: 35,
    potassium: 92,
    organicMatter: 1.5,
    recommendation: "Excellent for cotton cultivation. Use drip irrigation and balanced fertilizers.",
    majorCrops: ["Cotton", "Groundnut", "Sugarcane", "Wheat", "Rice"],
    climate: "Semi-arid"
  },
  // Haryana
  {
    id: 8,
    location: "Haryana",
    state: "Haryana",
    soilType: "Alluvial",
    pH: 7.5,
    nitrogen: 78,
    phosphorus: 38,
    potassium: 95,
    organicMatter: 1.9,
    recommendation: "Maintain high productivity with balanced fertilization. Practice crop rotation.",
    majorCrops: ["Wheat", "Rice", "Sugarcane", "Cotton", "Mustard"],
    climate: "Semi-arid"
  },
  // Himachal Pradesh
  {
    id: 9,
    location: "Himachal Pradesh",
    state: "Himachal Pradesh",
    soilType: "Mountain",
    pH: 6.1,
    nitrogen: 48,
    phosphorus: 24,
    potassium: 72,
    organicMatter: 3.2,
    recommendation: "Use organic farming methods. Practice terrace cultivation and soil conservation.",
    majorCrops: ["Wheat", "Maize", "Rice", "Barley", "Apple"],
    climate: "Temperate"
  },
  // Jharkhand
  {
    id: 10,
    location: "Jharkhand",
    state: "Jharkhand",
    soilType: "Red and Laterite",
    pH: 6.3,
    nitrogen: 52,
    phosphorus: 23,
    potassium: 68,
    organicMatter: 2.0,
    recommendation: "Add organic matter and lime. Focus on pulses and oilseeds cultivation.",
    majorCrops: ["Rice", "Wheat", "Maize", "Pulses", "Oilseeds"],
    climate: "Subtropical"
  },
  // Karnataka
  {
    id: 11,
    location: "Karnataka",
    state: "Karnataka",
    soilType: "Red Sandy",
    pH: 6.7,
    nitrogen: 62,
    phosphorus: 29,
    potassium: 82,
    organicMatter: 1.7,
    recommendation: "Suitable for diverse crops. Use drip irrigation and organic fertilizers.",
    majorCrops: ["Rice", "Sugarcane", "Cotton", "Coffee", "Ragi"],
    climate: "Tropical"
  },
  // Kerala
  {
    id: 12,
    location: "Kerala",
    state: "Kerala",
    soilType: "Laterite",
    pH: 5.5,
    nitrogen: 38,
    phosphorus: 18,
    potassium: 65,
    organicMatter: 3.0,
    recommendation: "Add lime to reduce acidity. Focus on spice and plantation crops.",
    majorCrops: ["Rice", "Coconut", "Rubber", "Spices", "Tea"],
    climate: "Tropical Humid"
  },
  // Madhya Pradesh
  {
    id: 13,
    location: "Madhya Pradesh",
    state: "Madhya Pradesh",
    soilType: "Black Cotton",
    pH: 7.3,
    nitrogen: 68,
    phosphorus: 31,
    potassium: 86,
    organicMatter: 1.6,
    recommendation: "Excellent for soybean and wheat. Practice conservation agriculture.",
    majorCrops: ["Soybean", "Wheat", "Rice", "Cotton", "Sugarcane"],
    climate: "Tropical"
  },
  // Maharashtra
  {
    id: 14,
    location: "Maharashtra",
    state: "Maharashtra",
    soilType: "Black Cotton",
    pH: 7.6,
    nitrogen: 75,
    phosphorus: 36,
    potassium: 90,
    organicMatter: 1.8,
    recommendation: "Ideal for cotton and sugarcane. Use precision farming techniques.",
    majorCrops: ["Cotton", "Sugarcane", "Soybean", "Wheat", "Rice"],
    climate: "Tropical"
  },
  // Manipur
  {
    id: 15,
    location: "Manipur",
    state: "Manipur",
    soilType: "Red and Laterite",
    pH: 5.9,
    nitrogen: 44,
    phosphorus: 21,
    potassium: 66,
    organicMatter: 2.5,
    recommendation: "Add lime and organic matter. Practice sustainable hill agriculture.",
    majorCrops: ["Rice", "Maize", "Pulses", "Oilseeds", "Vegetables"],
    climate: "Subtropical"
  },
  // Meghalaya
  {
    id: 16,
    location: "Meghalaya",
    state: "Meghalaya",
    soilType: "Red and Laterite",
    pH: 5.2,
    nitrogen: 40,
    phosphorus: 19,
    potassium: 62,
    organicMatter: 3.8,
    recommendation: "Highly acidic soil needs lime application. Focus on organic farming.",
    majorCrops: ["Rice", "Maize", "Potato", "Ginger", "Turmeric"],
    climate: "Subtropical Highland"
  },
  // Mizoram
  {
    id: 17,
    location: "Mizoram",
    state: "Mizoram",
    soilType: "Red and Yellow",
    pH: 5.6,
    nitrogen: 42,
    phosphorus: 20,
    potassium: 64,
    organicMatter: 2.9,
    recommendation: "Add lime and practice jhum cultivation sustainably. Use organic methods.",
    majorCrops: ["Rice", "Maize", "Vegetables", "Ginger", "Turmeric"],
    climate: "Tropical Highland"
  },
  // Nagaland
  {
    id: 18,
    location: "Nagaland",
    state: "Nagaland",
    soilType: "Mountain Forest",
    pH: 5.7,
    nitrogen: 43,
    phosphorus: 21,
    potassium: 67,
    organicMatter: 3.1,
    recommendation: "Practice terrace farming and add lime. Focus on sustainable agriculture.",
    majorCrops: ["Rice", "Maize", "Millet", "Pulses", "Oilseeds"],
    climate: "Subtropical Highland"
  },
  // Odisha
  {
    id: 19,
    location: "Odisha",
    state: "Odisha",
    soilType: "Red and Laterite",
    pH: 6.4,
    nitrogen: 56,
    phosphorus: 27,
    potassium: 74,
    organicMatter: 2.1,
    recommendation: "Improve drainage and add organic matter. Suitable for rice cultivation.",
    majorCrops: ["Rice", "Sugarcane", "Cotton", "Jute", "Pulses"],
    climate: "Tropical"
  },
  // Punjab
  {
    id: 20,
    location: "Punjab",
    state: "Punjab",
    soilType: "Alluvial",
    pH: 7.8,
    nitrogen: 82,
    phosphorus: 42,
    potassium: 98,
    organicMatter: 2.2,
    recommendation: "Highly fertile soil. Practice sustainable farming to maintain soil health.",
    majorCrops: ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize"],
    climate: "Semi-arid"
  },
  // Rajasthan
  {
    id: 21,
    location: "Rajasthan",
    state: "Rajasthan",
    soilType: "Desert Sandy",
    pH: 8.2,
    nitrogen: 35,
    phosphorus: 15,
    potassium: 55,
    organicMatter: 0.8,
    recommendation: "Add organic matter and practice water conservation. Use drought-resistant crops.",
    majorCrops: ["Wheat", "Barley", "Millet", "Mustard", "Cotton"],
    climate: "Arid"
  },
  // Sikkim
  {
    id: 22,
    location: "Sikkim",
    state: "Sikkim",
    soilType: "Mountain Forest",
    pH: 5.4,
    nitrogen: 39,
    phosphorus: 18,
    potassium: 61,
    organicMatter: 4.2,
    recommendation: "Add lime for pH correction. Practice organic farming and terrace cultivation.",
    majorCrops: ["Rice", "Maize", "Wheat", "Barley", "Cardamom"],
    climate: "Temperate"
  },
  // Tamil Nadu
  {
    id: 23,
    location: "Tamil Nadu",
    state: "Tamil Nadu",
    soilType: "Red Sandy",
    pH: 6.9,
    nitrogen: 64,
    phosphorus: 30,
    potassium: 84,
    organicMatter: 1.4,
    recommendation: "Use efficient irrigation and balanced fertilizers. Suitable for diverse crops.",
    majorCrops: ["Rice", "Sugarcane", "Cotton", "Groundnut", "Millets"],
    climate: "Tropical"
  },
  // Telangana
  {
    id: 24,
    location: "Telangana",
    state: "Telangana",
    soilType: "Red Sandy",
    pH: 6.6,
    nitrogen: 61,
    phosphorus: 28,
    potassium: 81,
    organicMatter: 1.3,
    recommendation: "Focus on cotton and rice cultivation. Use drip irrigation and organic matter.",
    majorCrops: ["Rice", "Cotton", "Maize", "Sugarcane", "Turmeric"],
    climate: "Tropical"
  },
  // Tripura
  {
    id: 25,
    location: "Tripura",
    state: "Tripura",
    soilType: "Red and Laterite",
    pH: 5.8,
    nitrogen: 46,
    phosphorus: 22,
    potassium: 69,
    organicMatter: 2.7,
    recommendation: "Add lime and organic matter. Practice mixed cropping and sustainable farming.",
    majorCrops: ["Rice", "Jute", "Cotton", "Sugarcane", "Tea"],
    climate: "Subtropical"
  },
  // Uttar Pradesh
  {
    id: 26,
    location: "Uttar Pradesh",
    state: "Uttar Pradesh",
    soilType: "Alluvial",
    pH: 7.4,
    nitrogen: 76,
    phosphorus: 37,
    potassium: 93,
    organicMatter: 2.0,
    recommendation: "Highly productive soil. Maintain fertility through balanced fertilization.",
    majorCrops: ["Wheat", "Rice", "Sugarcane", "Cotton", "Potato"],
    climate: "Subtropical"
  },
  // Uttarakhand
  {
    id: 27,
    location: "Uttarakhand",
    state: "Uttarakhand",
    soilType: "Mountain",
    pH: 6.0,
    nitrogen: 49,
    phosphorus: 24,
    potassium: 71,
    organicMatter: 3.0,
    recommendation: "Practice terrace farming and soil conservation. Use organic methods.",
    majorCrops: ["Wheat", "Rice", "Maize", "Barley", "Millets"],
    climate: "Temperate"
  },
  // West Bengal
  {
    id: 28,
    location: "West Bengal",
    state: "West Bengal",
    soilType: "Alluvial",
    pH: 6.8,
    nitrogen: 67,
    phosphorus: 32,
    potassium: 87,
    organicMatter: 2.4,
    recommendation: "Excellent for rice cultivation. Maintain drainage and use balanced fertilizers.",
    majorCrops: ["Rice", "Jute", "Tea", "Sugarcane", "Potato"],
    climate: "Tropical"
  },
  // Union Territories
  // Delhi
  {
    id: 29,
    location: "Delhi",
    state: "Delhi",
    soilType: "Alluvial",
    pH: 7.6,
    nitrogen: 73,
    phosphorus: 35,
    potassium: 89,
    organicMatter: 1.7,
    recommendation: "Urban agriculture focus. Use organic methods and efficient water management.",
    majorCrops: ["Wheat", "Rice", "Vegetables", "Mustard", "Fodder"],
    climate: "Semi-arid"
  },
  // Jammu and Kashmir
  {
    id: 30,
    location: "Jammu and Kashmir",
    state: "Jammu and Kashmir",
    soilType: "Mountain",
    pH: 6.2,
    nitrogen: 51,
    phosphorus: 25,
    potassium: 73,
    organicMatter: 2.8,
    recommendation: "Practice temperate agriculture. Focus on apple and saffron cultivation.",
    majorCrops: ["Rice", "Wheat", "Maize", "Apple", "Saffron"],
    climate: "Temperate"
  },
  // Ladakh
  {
    id: 31,
    location: "Ladakh",
    state: "Ladakh",
    soilType: "Cold Desert",
    pH: 7.9,
    nitrogen: 28,
    phosphorus: 12,
    potassium: 48,
    organicMatter: 0.6,
    recommendation: "Extreme conditions require greenhouse cultivation and organic matter addition.",
    majorCrops: ["Barley", "Wheat", "Peas", "Mustard", "Vegetables"],
    climate: "Cold Desert"
  },
  // Chandigarh
  {
    id: 32,
    location: "Chandigarh",
    state: "Chandigarh",
    soilType: "Alluvial",
    pH: 7.5,
    nitrogen: 74,
    phosphorus: 36,
    potassium: 90,
    organicMatter: 1.8,
    recommendation: "Urban agriculture with focus on vegetables and ornamental plants.",
    majorCrops: ["Vegetables", "Flowers", "Wheat", "Rice", "Fodder"],
    climate: "Semi-arid"
  },
  // Puducherry
  {
    id: 33,
    location: "Puducherry",
    state: "Puducherry",
    soilType: "Red Sandy",
    pH: 6.7,
    nitrogen: 59,
    phosphorus: 27,
    potassium: 78,
    organicMatter: 1.5,
    recommendation: "Coastal agriculture with salt-tolerant crops. Use organic farming methods.",
    majorCrops: ["Rice", "Sugarcane", "Cotton", "Groundnut", "Coconut"],
    climate: "Tropical Coastal"
  },
  // Andaman and Nicobar Islands
  {
    id: 34,
    location: "Andaman and Nicobar Islands",
    state: "Andaman and Nicobar Islands",
    soilType: "Coastal Sandy",
    pH: 6.1,
    nitrogen: 41,
    phosphorus: 19,
    potassium: 63,
    organicMatter: 2.3,
    recommendation: "Island agriculture with coconut and spice cultivation. Practice sustainable farming.",
    majorCrops: ["Coconut", "Rice", "Spices", "Fruits", "Vegetables"],
    climate: "Tropical Island"
  },
  // Lakshadweep
  {
    id: 35,
    location: "Lakshadweep",
    state: "Lakshadweep",
    soilType: "Coral Sandy",
    pH: 7.8,
    nitrogen: 33,
    phosphorus: 14,
    potassium: 52,
    organicMatter: 1.1,
    recommendation: "Limited land requires intensive coconut cultivation and organic methods.",
    majorCrops: ["Coconut", "Vegetables", "Fruits", "Spices", "Fodder"],
    climate: "Tropical Island"
  },
  // Dadra and Nagar Haveli and Daman and Diu
  {
    id: 36,
    location: "Dadra and Nagar Haveli and Daman and Diu",
    state: "Dadra and Nagar Haveli and Daman and Diu",
    soilType: "Red and Laterite",
    pH: 6.4,
    nitrogen: 54,
    phosphorus: 26,
    potassium: 76,
    organicMatter: 1.9,
    recommendation: "Coastal and inland agriculture. Focus on rice and horticulture crops.",
    majorCrops: ["Rice", "Sugarcane", "Coconut", "Mango", "Vegetables"],
    climate: "Tropical Coastal"
  }
];

// Helper functions for soil data analysis
export const getSoilDataByState = (stateName: string): SoilData | undefined => {
  return indianStatesSoilData.find(soil => 
    soil.state.toLowerCase() === stateName.toLowerCase()
  );
};

export const getAllStates = (): string[] => {
  return [...new Set(indianStatesSoilData.map(soil => soil.state))].sort();
};

export const getSoilTypesByRegion = (region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast'): SoilData[] => {
  const regionMapping = {
    North: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Uttarakhand', 'Himachal Pradesh', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh'],
    South: ['Andhra Pradesh', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana', 'Puducherry', 'Andaman and Nicobar Islands', 'Lakshadweep'],
    East: ['West Bengal', 'Bihar', 'Jharkhand', 'Odisha'],
    West: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa', 'Dadra and Nagar Haveli and Daman and Diu'],
    Central: ['Madhya Pradesh', 'Chhattisgarh'],
    Northeast: ['Assam', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura']
  };
  
  const states = regionMapping[region] || [];
  return indianStatesSoilData.filter(soil => states.includes(soil.state));
};

export const getSoilHealthScore = (soil: SoilData): number => {
  // Calculate soil health score based on multiple factors
  const phScore = soil.pH >= 6.0 && soil.pH <= 7.5 ? 25 : 15;
  const nScore = soil.nitrogen >= 60 ? 25 : (soil.nitrogen >= 40 ? 20 : 10);
  const pScore = soil.phosphorus >= 25 ? 25 : (soil.phosphorus >= 15 ? 20 : 10);
  const kScore = soil.potassium >= 70 ? 25 : (soil.potassium >= 50 ? 20 : 10);
  
  return phScore + nScore + pScore + kScore;
};
