export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Seller {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
  joinedDate: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  seller: Seller;
  rating: number;
  totalReviews: number;
  inStock: boolean;
  stockQuantity: number;
  unit: string;
  specifications: Record<string, string>;
  reviews: Review[];
  tags: string[];
  featured: boolean;
  discount?: number;
  shippingInfo: {
    freeShipping: boolean;
    estimatedDays: number;
    shippingCost?: number;
  };
}

export type ProductCategory = 
  | 'seeds'
  | 'fertilizers'
  | 'pesticides'
  | 'tools'
  | 'machinery'
  | 'irrigation'
  | 'organic'
  | 'livestock';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MarketplaceFilters {
  category?: ProductCategory;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  freeShipping?: boolean;
  location?: string;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';
}
