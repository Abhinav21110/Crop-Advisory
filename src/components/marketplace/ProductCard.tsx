import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Star, ShoppingCart, Verified, MapPin } from 'lucide-react';
import { Product } from '@/types/marketplace';
import { gsap } from 'gsap';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  index = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initial animation with stagger
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.95,
        force3D: true
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
        force3D: true
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      card.style.willChange = 'transform';
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        force3D: true
      });
      
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out",
          force3D: true
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
        onComplete: () => {
          card.style.willChange = 'auto';
        }
      });
      
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          force3D: true
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  const handleAddToCart = () => {
    if (buttonRef.current) {
      buttonRef.current.style.willChange = 'transform';
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        force3D: true,
        onComplete: () => {
          buttonRef.current!.style.willChange = 'auto';
        }
      });
    }
    onAddToCart?.(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency}${price.toLocaleString()}`;
  };

  return (
    <Card 
      ref={cardRef}
      className="group cursor-pointer transition-shadow duration-300 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm"
      onClick={() => onViewDetails?.(product)}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div ref={imageRef} className="relative h-48 overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full"
            lazy={true}
            quality={85}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                Featured
              </Badge>
            )}
            {product.discount && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                {product.discount}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <Badge className="bg-gray-500 text-white text-xs px-2 py-1">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(product);
              }}
            >
              View
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="p-4 space-y-3">
          {/* Title and Category */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 capitalize">{product.category}</p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.totalReviews} reviews)
            </span>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{product.seller.name}</span>
            {product.seller.verified && (
              <Verified className="w-4 h-4 text-blue-500" />
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              <span className="text-sm text-gray-600">/{product.unit}</span>
            </div>
          </div>

          {/* Stock Info */}
          {product.inStock && product.stockQuantity && product.stockQuantity < 10 && (
            <p className="text-sm text-orange-600">
              Only {product.stockQuantity} left in stock!
            </p>
          )}

          {/* Shipping Info */}
          {product.shippingInfo?.freeShipping && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <span>🚚 Free Shipping</span>
              {product.shippingInfo.estimatedDays && (
                <span>• {product.shippingInfo.estimatedDays} days</span>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            ref={buttonRef}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
