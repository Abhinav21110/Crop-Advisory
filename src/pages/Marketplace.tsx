import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SlidersHorizontal, ShoppingBag, Star } from 'lucide-react';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { CategoryFilter } from '@/components/marketplace/CategoryFilter';
import { sampleProducts, featuredProducts } from '@/data/marketplaceData';
import { Product, ProductCategory, MarketplaceFilters } from '@/types/marketplace';

gsap.registerPlugin(ScrollTrigger);

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>();
  const [sortBy, setSortBy] = useState<MarketplaceFilters['sortBy']>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const hero = heroRef.current;
    const filters = filtersRef.current;
    const products = productsRef.current;

    if (header && hero && filters && products) {
      // Initial page animations
      const tl = gsap.timeline();
      
      tl.fromTo(header,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(hero,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(filters,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: products,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(products,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...sampleProducts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.totalReviews - a.totalReviews);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Calculate product counts by category
  const productCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      seeds: 0,
      fertilizers: 0,
      pesticides: 0,
      tools: 0,
      machinery: 0,
      irrigation: 0,
      organic: 0,
      livestock: 0
    };

    sampleProducts.forEach(product => {
      counts[product.category]++;
    });

    return counts;
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    // Show success animation or toast here
  };

  const handleViewDetails = (product: Product) => {
    // Navigate to product details page
    console.log('View details for:', product.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div ref={headerRef} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingBag className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                CropCare Marketplace
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {cart.length} items in cart
              </Badge>
              <Button variant="outline" size="sm">
                View Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Everything You Need for Farming
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From premium seeds to modern machinery, find all your farming essentials in one place. 
            Quality products from verified sellers across India.
          </p>
        </div>

        {/* Featured Products Preview */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            Featured Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div ref={filtersRef} className="container mx-auto px-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for seeds, fertilizers, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as MarketplaceFilters['sortBy'])}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            productCounts={productCounts}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div ref={productsRef} className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'All Products'}
          </h3>
          <Badge variant="secondary" className="text-sm">
            {filteredProducts.length} products found
          </Badge>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
