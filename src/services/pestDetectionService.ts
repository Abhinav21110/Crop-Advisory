// Enhanced pest detection service with comprehensive sample data
export interface PestDetectionResult {
  id: string;
  pestName: string;
  type: 'pest' | 'disease' | 'nutrient_deficiency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  symptoms: string;
  causes: string[];
  treatment: {
    immediate: string[];
    preventive: string[];
    organic: string[];
    chemical: string[];
  };
  timeToTreat: string;
  spreadRisk: string;
  affectedCrops: string[];
  seasonalInfo: string;
  economicImpact: string;
}

// Comprehensive pest and disease database
const pestDatabase: PestDetectionResult[] = [
  {
    id: 'aphids_001',
    pestName: 'Aphids (Green Peach Aphid)',
    type: 'pest',
    severity: 'medium',
    confidence: 0.85,
    symptoms: 'Small green/black soft-bodied insects clustered on leaves and stems, sticky honeydew secretion, yellowing and curling leaves, stunted growth',
    causes: ['High nitrogen levels', 'Warm weather', 'Overcrowding', 'Stress conditions'],
    treatment: {
      immediate: [
        'Spray plants with strong water stream to dislodge aphids',
        'Apply insecticidal soap spray (2-3% solution)',
        'Use neem oil spray in evening hours'
      ],
      preventive: [
        'Plant companion crops like marigold, catnip, garlic',
        'Maintain proper plant spacing',
        'Regular monitoring and early detection',
        'Avoid over-fertilization with nitrogen'
      ],
      organic: [
        'Release ladybugs or lacewings as biological control',
        'Spray with diluted dish soap solution',
        'Use reflective mulch to confuse aphids',
        'Apply diatomaceous earth around plants'
      ],
      chemical: [
        'Imidacloprid-based systemic insecticides',
        'Malathion spray (follow label instructions)',
        'Pyrethroid insecticides for severe infestations'
      ]
    },
    timeToTreat: '3-7 days for visible improvement',
    spreadRisk: 'High - can spread rapidly in warm conditions',
    affectedCrops: ['Tomato', 'Pepper', 'Cucumber', 'Rose', 'Peach', 'Potato'],
    seasonalInfo: 'Most active in spring and early summer, peak activity at 65-80°F',
    economicImpact: 'Can reduce yield by 10-30% if left untreated'
  },
  {
    id: 'blight_001',
    pestName: 'Early Blight (Alternaria)',
    type: 'disease',
    severity: 'high',
    confidence: 0.92,
    symptoms: 'Dark brown spots with concentric rings on older leaves, yellowing around spots, premature leaf drop, stem lesions, fruit rot with dark sunken areas',
    causes: ['High humidity', 'Warm temperatures (75-85°F)', 'Poor air circulation', 'Overhead watering', 'Plant stress'],
    treatment: {
      immediate: [
        'Remove and destroy affected leaves immediately',
        'Apply copper-based fungicide spray',
        'Improve air circulation around plants',
        'Stop overhead watering'
      ],
      preventive: [
        'Use drip irrigation instead of overhead watering',
        'Mulch around plants to prevent soil splash',
        'Rotate crops annually',
        'Plant resistant varieties when available'
      ],
      organic: [
        'Baking soda spray (1 tsp per quart water)',
        'Compost tea application',
        'Milk spray (1:10 ratio with water)',
        'Copper sulfate organic fungicide'
      ],
      chemical: [
        'Chlorothalonil fungicide',
        'Mancozeb-based fungicides',
        'Azoxystrobin for systemic control'
      ]
    },
    timeToTreat: '7-14 days to halt progression',
    spreadRisk: 'Very High - spreads rapidly in humid conditions',
    affectedCrops: ['Tomato', 'Potato', 'Eggplant', 'Pepper'],
    seasonalInfo: 'Most severe in warm, humid summer months',
    economicImpact: 'Can cause 20-50% yield loss in severe cases'
  },
  {
    id: 'whitefly_001',
    pestName: 'Whitefly (Silverleaf Whitefly)',
    type: 'pest',
    severity: 'medium',
    confidence: 0.78,
    symptoms: 'Tiny white flying insects on leaf undersides, yellowing leaves, sticky honeydew, sooty mold growth, silvering of leaves',
    causes: ['Warm temperatures', 'Dry conditions', 'Overcrowded plants', 'Stressed plants'],
    treatment: {
      immediate: [
        'Use yellow sticky traps to catch adults',
        'Spray with insecticidal soap',
        'Apply neem oil in early morning or evening',
        'Use reflective mulch to disorient whiteflies'
      ],
      preventive: [
        'Regular inspection of plant undersides',
        'Remove weeds that harbor whiteflies',
        'Use row covers for young plants',
        'Maintain proper plant spacing'
      ],
      organic: [
        'Release Encarsia formosa parasitic wasps',
        'Vacuum adults in early morning when sluggish',
        'Spray with garlic-pepper solution',
        'Use beneficial nematodes for soil-dwelling stages'
      ],
      chemical: [
        'Imidacloprid soil drench',
        'Bifenthrin spray for adults',
        'Spiromesifen for eggs and nymphs'
      ]
    },
    timeToTreat: '10-14 days for population control',
    spreadRisk: 'High - adults are mobile and can spread quickly',
    affectedCrops: ['Tomato', 'Cucumber', 'Squash', 'Bean', 'Cotton', 'Poinsettia'],
    seasonalInfo: 'Active year-round in warm climates, peak in summer',
    economicImpact: 'Can reduce yield by 15-40% and transmit plant viruses'
  },
  {
    id: 'rootrot_001',
    pestName: 'Root Rot (Pythium/Phytophthora)',
    type: 'disease',
    severity: 'critical',
    confidence: 0.88,
    symptoms: 'Wilting despite moist soil, yellowing lower leaves, stunted growth, brown/black mushy roots, foul odor from roots, plant collapse',
    causes: ['Overwatering', 'Poor drainage', 'Contaminated soil', 'High soil temperature', 'Plant stress'],
    treatment: {
      immediate: [
        'Stop watering immediately',
        'Improve drainage around plant',
        'Remove affected plants if severely damaged',
        'Apply fungicide drench to remaining plants'
      ],
      preventive: [
        'Ensure proper drainage in planting area',
        'Use well-draining soil mix',
        'Avoid overwatering',
        'Sterilize tools between plants'
      ],
      organic: [
        'Apply beneficial mycorrhizal fungi',
        'Use compost to improve soil structure',
        'Hydrogen peroxide soil drench (3% solution)',
        'Cinnamon powder as natural fungicide'
      ],
      chemical: [
        'Metalaxyl-based fungicides',
        'Fosetyl-aluminum systemic fungicide',
        'Propamocarb for soil drench'
      ]
    },
    timeToTreat: '2-4 weeks for soil recovery',
    spreadRisk: 'Medium - spreads through contaminated water and soil',
    affectedCrops: ['Most vegetables', 'Ornamental plants', 'Tree seedlings'],
    seasonalInfo: 'Most active in cool, wet conditions',
    economicImpact: 'Can cause complete plant loss, 50-100% mortality in severe cases'
  },
  {
    id: 'powdery_mildew_001',
    pestName: 'Powdery Mildew',
    type: 'disease',
    severity: 'medium',
    confidence: 0.91,
    symptoms: 'White powdery coating on leaves and stems, yellowing leaves, stunted growth, premature leaf drop, reduced flowering',
    causes: ['High humidity', 'Poor air circulation', 'Moderate temperatures (60-80°F)', 'Shade conditions'],
    treatment: {
      immediate: [
        'Remove affected leaves and dispose properly',
        'Increase air circulation around plants',
        'Apply sulfur-based fungicide',
        'Reduce humidity levels'
      ],
      preventive: [
        'Plant in sunny locations with good air flow',
        'Avoid overhead watering',
        'Space plants properly',
        'Choose resistant varieties'
      ],
      organic: [
        'Baking soda spray (1 tbsp per gallon)',
        'Milk spray (1:9 ratio with water)',
        'Potassium bicarbonate solution',
        'Neem oil application'
      ],
      chemical: [
        'Propiconazole fungicide',
        'Myclobutanil for roses',
        'Trifloxystrobin for vegetables'
      ]
    },
    timeToTreat: '7-10 days to see improvement',
    spreadRisk: 'Medium - spreads via airborne spores',
    affectedCrops: ['Rose', 'Cucumber', 'Squash', 'Grape', 'Apple', 'Zucchini'],
    seasonalInfo: 'Most active in spring and fall with moderate temperatures',
    economicImpact: 'Can reduce yield by 10-25% and affect fruit quality'
  },
  {
    id: 'spider_mites_001',
    pestName: 'Two-Spotted Spider Mites',
    type: 'pest',
    severity: 'high',
    confidence: 0.82,
    symptoms: 'Fine webbing on leaves, tiny yellow/white spots on leaves, bronze/yellow discoloration, premature leaf drop, visible tiny moving dots',
    causes: ['Hot dry weather', 'Dusty conditions', 'Overuse of insecticides', 'Stressed plants'],
    treatment: {
      immediate: [
        'Spray with strong water stream to dislodge mites',
        'Apply miticide or insecticidal soap',
        'Increase humidity around plants',
        'Remove heavily infested leaves'
      ],
      preventive: [
        'Maintain adequate soil moisture',
        'Avoid dusty conditions',
        'Regular misting in dry weather',
        'Encourage beneficial predators'
      ],
      organic: [
        'Release predatory mites (Phytoseiulus persimilis)',
        'Neem oil spray application',
        'Diatomaceous earth dusting',
        'Essential oil sprays (rosemary, peppermint)'
      ],
      chemical: [
        'Abamectin miticide',
        'Bifenazate for resistant populations',
        'Spiromesifen for eggs and juveniles'
      ]
    },
    timeToTreat: '5-10 days for population reduction',
    spreadRisk: 'Very High - reproduce rapidly in hot weather',
    affectedCrops: ['Tomato', 'Bean', 'Cucumber', 'Rose', 'Strawberry', 'Cotton'],
    seasonalInfo: 'Peak activity in hot, dry summer months',
    economicImpact: 'Can cause 20-60% yield loss in severe infestations'
  }
];

// Image analysis simulation - in real implementation, this would use ML models
export class PestDetectionService {
  private static analyzeImageFeatures(imageData: string): {
    hasSpots: boolean;
    hasInsects: boolean;
    hasDiscoloration: boolean;
    hasWebbing: boolean;
    leafCondition: 'healthy' | 'damaged' | 'severely_damaged';
  } {
    // Simulate image analysis based on image characteristics
    // In real implementation, this would use computer vision/ML
    const imageSize = imageData.length;
    const hasComplexPatterns = imageSize > 50000; // Larger images might have more detail
    
    // Simulate different detection scenarios
    const random = Math.random();
    
    return {
      hasSpots: random > 0.6,
      hasInsects: random > 0.7,
      hasDiscoloration: random > 0.5,
      hasWebbing: random > 0.8,
      leafCondition: random > 0.7 ? 'damaged' : random > 0.4 ? 'severely_damaged' : 'healthy'
    };
  }

  static async detectPestFromImage(imageData: string): Promise<PestDetectionResult> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const features = this.analyzeImageFeatures(imageData);
    let detectedPest: PestDetectionResult;
    
    // Rule-based detection simulation
    if (features.hasWebbing && features.hasDiscoloration) {
      detectedPest = pestDatabase.find(p => p.id === 'spider_mites_001')!;
    } else if (features.hasSpots && features.leafCondition === 'severely_damaged') {
      detectedPest = pestDatabase.find(p => p.id === 'blight_001')!;
    } else if (features.hasInsects) {
      const pestOptions = ['aphids_001', 'whitefly_001'];
      const selectedId = pestOptions[Math.floor(Math.random() * pestOptions.length)];
      detectedPest = pestDatabase.find(p => p.id === selectedId)!;
    } else if (features.leafCondition === 'damaged' && features.hasDiscoloration) {
      const diseaseOptions = ['powdery_mildew_001', 'rootrot_001'];
      const selectedId = diseaseOptions[Math.floor(Math.random() * diseaseOptions.length)];
      detectedPest = pestDatabase.find(p => p.id === selectedId)!;
    } else {
      // Random selection for unclear cases
      detectedPest = pestDatabase[Math.floor(Math.random() * pestDatabase.length)];
    }
    
    // Adjust confidence based on image quality simulation
    const adjustedConfidence = Math.max(0.6, detectedPest.confidence - (Math.random() * 0.2));
    
    return {
      ...detectedPest,
      confidence: Math.round(adjustedConfidence * 100) / 100
    };
  }

  static getPestById(id: string): PestDetectionResult | undefined {
    return pestDatabase.find(pest => pest.id === id);
  }

  static searchPests(query: string): PestDetectionResult[] {
    const lowercaseQuery = query.toLowerCase();
    return pestDatabase.filter(pest =>
      pest.pestName.toLowerCase().includes(lowercaseQuery) ||
      pest.symptoms.toLowerCase().includes(lowercaseQuery) ||
      pest.affectedCrops.some(crop => crop.toLowerCase().includes(lowercaseQuery))
    );
  }

  static getAllPests(): PestDetectionResult[] {
    return pestDatabase;
  }

  static getPestsByType(type: 'pest' | 'disease' | 'nutrient_deficiency'): PestDetectionResult[] {
    return pestDatabase.filter(pest => pest.type === type);
  }

  static getPestsBySeverity(severity: 'low' | 'medium' | 'high' | 'critical'): PestDetectionResult[] {
    return pestDatabase.filter(pest => pest.severity === severity);
  }
}
