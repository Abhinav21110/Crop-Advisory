import { Product, Seller, Review } from '@/types/marketplace';

// Sample sellers
export const sampleSellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'AgriTech Solutions',
    location: 'Punjab, India',
    rating: 4.8,
    totalReviews: 1250,
    verified: true,
    joinedDate: '2020-03-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'seller-2',
    name: 'Green Valley Farms',
    location: 'Maharashtra, India',
    rating: 4.6,
    totalReviews: 890,
    verified: true,
    joinedDate: '2019-08-22',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'seller-3',
    name: 'Modern Farming Co.',
    location: 'Karnataka, India',
    rating: 4.9,
    totalReviews: 2100,
    verified: true,
    joinedDate: '2018-01-10',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'seller-4',
    name: 'Organic Harvest',
    location: 'Tamil Nadu, India',
    rating: 4.7,
    totalReviews: 650,
    verified: true,
    joinedDate: '2021-05-30',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

// Sample reviews
export const sampleReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: 'Rajesh Kumar',
    rating: 5,
    comment: 'Excellent quality seeds! Got great germination rate of 95%. Highly recommended for wheat farming.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: 'review-2',
    userId: 'user-2',
    userName: 'Priya Sharma',
    rating: 4,
    comment: 'Good fertilizer, saw noticeable improvement in crop yield. Delivery was on time.',
    date: '2024-01-10',
    verified: true
  },
  {
    id: 'review-3',
    userId: 'user-3',
    userName: 'Amit Patel',
    rating: 5,
    comment: 'Amazing tool quality! Very durable and efficient. Worth every penny.',
    date: '2024-01-08',
    verified: false
  }
];

// Sample products with optimized images
export const sampleProducts: Product[] = [
  // Seeds
  {
    id: 'product-1',
    name: 'Premium Wheat Seeds (HD-2967)',
    description: 'High-yielding wheat variety suitable for irrigated conditions. Disease resistant with excellent grain quality. Perfect for North Indian plains.',
    category: 'seeds',
    price: 45,
    originalPrice: 50,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[0],
    rating: 4.8,
    totalReviews: 156,
    inStock: true,
    stockQuantity: 500,
    unit: 'kg',
    specifications: {
      'Variety': 'HD-2967',
      'Maturity': '120-125 days',
      'Yield Potential': '45-50 quintals/hectare',
      'Sowing Time': 'November-December',
      'Irrigation': 'Irrigated conditions'
    },
    reviews: [sampleReviews[0]],
    tags: ['wheat', 'high-yield', 'disease-resistant', 'irrigated'],
    featured: true,
    discount: 10,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3
    }
  },
  {
    id: 'product-2',
    name: 'Hybrid Rice Seeds (Basmati 1121)',
    description: 'Premium Basmati rice seeds with excellent aroma and grain length. Suitable for export quality production.',
    category: 'seeds',
    price: 120,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[1],
    rating: 4.9,
    totalReviews: 89,
    inStock: true,
    stockQuantity: 200,
    unit: 'kg',
    specifications: {
      'Variety': 'Basmati 1121',
      'Maturity': '140-150 days',
      'Grain Length': '8.2-8.4 mm',
      'Aroma': 'Strong',
      'Water Requirement': 'Medium'
    },
    reviews: [],
    tags: ['basmati', 'premium', 'export-quality', 'aromatic'],
    featured: true,
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 5,
      shippingCost: 25
    }
  },
  {
    id: 'product-3',
    name: 'Tomato Seeds (Hybrid F1)',
    description: 'High-yielding hybrid tomato seeds suitable for greenhouse and open field cultivation. Disease resistant variety.',
    category: 'seeds',
    price: 850,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[3],
    rating: 4.6,
    totalReviews: 45,
    inStock: true,
    stockQuantity: 50,
    unit: '100g',
    specifications: {
      'Type': 'Hybrid F1',
      'Fruit Weight': '150-200g',
      'Color': 'Deep Red',
      'Shelf Life': '15-20 days',
      'Season': 'All season'
    },
    reviews: [],
    tags: ['tomato', 'hybrid', 'greenhouse', 'disease-resistant'],
    featured: false,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 4
    }
  },

  // Fertilizers
  {
    id: 'product-4',
    name: 'NPK Fertilizer (19:19:19)',
    description: 'Balanced NPK fertilizer suitable for all crops. Provides essential nutrients for healthy plant growth and maximum yield.',
    category: 'fertilizers',
    price: 1200,
    originalPrice: 1350,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[0],
    rating: 4.7,
    totalReviews: 234,
    inStock: true,
    stockQuantity: 100,
    unit: '50kg bag',
    specifications: {
      'NPK Ratio': '19:19:19',
      'Form': 'Granular',
      'Solubility': 'Water soluble',
      'Application': 'Soil/Foliar',
      'Coverage': '1 acre per bag'
    },
    reviews: [sampleReviews[1]],
    tags: ['npk', 'balanced', 'granular', 'water-soluble'],
    featured: true,
    discount: 11,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 2
    }
  },
  {
    id: 'product-5',
    name: 'Organic Vermicompost',
    description: 'Premium quality vermicompost made from organic waste. Rich in nutrients and beneficial microorganisms.',
    category: 'organic',
    price: 15,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[3],
    rating: 4.8,
    totalReviews: 167,
    inStock: true,
    stockQuantity: 1000,
    unit: 'kg',
    specifications: {
      'Type': 'Organic',
      'Moisture': '35-40%',
      'pH': '6.5-7.5',
      'Organic Carbon': '12-16%',
      'NPK': '1.5:1.0:1.5'
    },
    reviews: [],
    tags: ['organic', 'vermicompost', 'eco-friendly', 'soil-health'],
    featured: false,
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 4,
      shippingCost: 50
    }
  },

  // Tools
  {
    id: 'product-6',
    name: 'Professional Garden Hoe',
    description: 'Heavy-duty garden hoe with ergonomic handle. Perfect for weeding, cultivating, and soil preparation.',
    category: 'tools',
    price: 450,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[2],
    rating: 4.9,
    totalReviews: 78,
    inStock: true,
    stockQuantity: 25,
    unit: 'piece',
    specifications: {
      'Material': 'Carbon Steel',
      'Handle': 'Wooden',
      'Length': '120cm',
      'Weight': '1.2kg',
      'Warranty': '1 year'
    },
    reviews: [sampleReviews[2]],
    tags: ['hoe', 'garden-tool', 'weeding', 'cultivation'],
    featured: false,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 3
    }
  },
  {
    id: 'product-7',
    name: 'Electric Sprayer (16L)',
    description: 'Battery-powered knapsack sprayer with adjustable nozzle. Ideal for pesticide and fertilizer application.',
    category: 'tools',
    price: 3500,
    originalPrice: 4000,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[2],
    rating: 4.5,
    totalReviews: 92,
    inStock: true,
    stockQuantity: 15,
    unit: 'piece',
    specifications: {
      'Capacity': '16 Liters',
      'Battery': '12V 8Ah',
      'Pressure': '0.15-0.4 MPa',
      'Working Time': '6-8 hours',
      'Weight': '5.5kg'
    },
    reviews: [],
    tags: ['sprayer', 'electric', 'battery', 'pesticide'],
    featured: true,
    discount: 12,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 5
    }
  },

  // Machinery
  {
    id: 'product-8',
    name: 'Mini Tiller/Cultivator',
    description: 'Compact petrol-powered tiller perfect for small farms and gardens. Easy to operate and maintain.',
    category: 'machinery',
    price: 25000,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[2],
    rating: 4.6,
    totalReviews: 34,
    inStock: true,
    stockQuantity: 5,
    unit: 'piece',
    specifications: {
      'Engine': '4-stroke petrol',
      'Power': '5.5 HP',
      'Working Width': '60cm',
      'Depth': '15-20cm',
      'Weight': '45kg'
    },
    reviews: [],
    tags: ['tiller', 'cultivator', 'petrol', 'small-farm'],
    featured: true,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 7
    }
  },

  // Irrigation
  {
    id: 'product-9',
    name: 'Drip Irrigation Kit (1 Acre)',
    description: 'Complete drip irrigation system for 1 acre. Includes pipes, emitters, filters, and control valves.',
    category: 'irrigation',
    price: 15000,
    originalPrice: 18000,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[0],
    rating: 4.7,
    totalReviews: 56,
    inStock: true,
    stockQuantity: 10,
    unit: 'kit',
    specifications: {
      'Coverage': '1 Acre',
      'Pipe Material': 'LDPE',
      'Emitter Flow': '4 LPH',
      'Spacing': '30cm',
      'Warranty': '2 years'
    },
    reviews: [],
    tags: ['drip-irrigation', 'water-saving', 'efficient', 'complete-kit'],
    featured: true,
    discount: 17,
    shippingInfo: {
      freeShipping: true,
      estimatedDays: 10
    }
  },

  // Pesticides
  {
    id: 'product-10',
    name: 'Neem Oil (Organic Pesticide)',
    description: 'Pure neem oil extract for organic pest control. Safe for beneficial insects and environment.',
    category: 'pesticides',
    price: 280,
    currency: '₹',
    images: [
      'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=400&h=300&fit=crop&auto=format&q=80'
    ],
    seller: sampleSellers[3],
    rating: 4.8,
    totalReviews: 123,
    inStock: true,
    stockQuantity: 200,
    unit: '1L bottle',
    specifications: {
      'Type': 'Organic',
      'Active Ingredient': 'Azadirachtin',
      'Concentration': '1500 ppm',
      'Dilution': '2-3 ml/L water',
      'Shelf Life': '2 years'
    },
    reviews: [],
    tags: ['neem-oil', 'organic', 'pesticide', 'eco-friendly'],
    featured: false,
    shippingInfo: {
      freeShipping: false,
      estimatedDays: 3,
      shippingCost: 30
    }
  }
];

export const featuredProducts = sampleProducts.filter(product => product.featured);

export const productsByCategory = {
  seeds: sampleProducts.filter(p => p.category === 'seeds'),
  fertilizers: sampleProducts.filter(p => p.category === 'fertilizers'),
  pesticides: sampleProducts.filter(p => p.category === 'pesticides'),
  tools: sampleProducts.filter(p => p.category === 'tools'),
  machinery: sampleProducts.filter(p => p.category === 'machinery'),
  irrigation: sampleProducts.filter(p => p.category === 'irrigation'),
  organic: sampleProducts.filter(p => p.category === 'organic'),
  livestock: sampleProducts.filter(p => p.category === 'livestock')
};
