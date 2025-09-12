import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wheat, 
  Sprout, 
  Bug, 
  Wrench, 
  Tractor, 
  Droplets, 
  Leaf, 
  Heart,
  Grid3X3
} from 'lucide-react';
import { ProductCategory } from '@/types/marketplace';

interface CategoryFilterProps {
  selectedCategory?: ProductCategory;
  onCategoryChange: (category?: ProductCategory) => void;
  productCounts: Record<ProductCategory, number>;
}

const categoryConfig = {
  seeds: { icon: Wheat, label: 'Seeds', color: 'bg-amber-500' },
  fertilizers: { icon: Sprout, label: 'Fertilizers', color: 'bg-green-500' },
  pesticides: { icon: Bug, label: 'Pesticides', color: 'bg-red-500' },
  tools: { icon: Wrench, label: 'Tools', color: 'bg-blue-500' },
  machinery: { icon: Tractor, label: 'Machinery', color: 'bg-purple-500' },
  irrigation: { icon: Droplets, label: 'Irrigation', color: 'bg-cyan-500' },
  organic: { icon: Leaf, label: 'Organic', color: 'bg-emerald-500' },
  livestock: { icon: Heart, label: 'Livestock', color: 'bg-pink-500' }
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  productCounts
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const buttons = buttonsRef.current;

    if (container && buttons.length > 0) {
      // Initial animation
      gsap.fromTo(container,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      // Stagger animation for buttons
      gsap.fromTo(buttons,
        { opacity: 0, scale: 0.8, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  const handleCategoryClick = (category?: ProductCategory) => {
    onCategoryChange(category);
    
    // Add click animation
    const clickedButton = buttonsRef.current.find(btn => 
      btn?.dataset.category === category || (category === undefined && btn?.dataset.category === 'all')
    );
    
    if (clickedButton) {
      gsap.to(clickedButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const addButtonRef = (el: HTMLButtonElement | null, index: number) => {
    if (el) {
      buttonsRef.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Categories
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* All Categories Button */}
        <Button
          ref={(el) => addButtonRef(el, 0)}
          variant={selectedCategory === undefined ? "default" : "outline"}
          className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200 ${
            selectedCategory === undefined 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'hover:bg-green-50 dark:hover:bg-green-900/20'
          }`}
          onClick={() => handleCategoryClick(undefined)}
          data-category="all"
        >
          <Grid3X3 className="w-6 h-6" />
          <span className="text-sm font-medium">All</span>
          <Badge variant="secondary" className="text-xs">
            {Object.values(productCounts).reduce((sum, count) => sum + count, 0)}
          </Badge>
        </Button>

        {/* Category Buttons */}
        {Object.entries(categoryConfig).map(([category, config], index) => {
          const Icon = config.icon;
          const isSelected = selectedCategory === category;
          const count = productCounts[category as ProductCategory] || 0;
          
          return (
            <Button
              key={category}
              ref={(el) => addButtonRef(el, index + 1)}
              variant={isSelected ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200 ${
                isSelected 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
              onClick={() => handleCategoryClick(category as ProductCategory)}
              data-category={category}
            >
              <div className={`p-2 rounded-full ${isSelected ? 'bg-white/20' : config.color} transition-colors`}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-white'}`} />
              </div>
              <span className="text-sm font-medium">{config.label}</span>
              <Badge variant="secondary" className="text-xs">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
