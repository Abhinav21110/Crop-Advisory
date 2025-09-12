import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
  gradient?: "primary" | "earth" | "fresh";
  index?: number;
}

export function DashboardCard({
  title,
  value,
  description,
  icon,
  trend,
  trendDirection = "neutral",
  className,
  gradient = "primary",
  index = 0
}: DashboardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const iconEl = iconRef.current;
    const valueEl = valueRef.current;

    if (card && iconEl && valueEl) {
      // Initial animation on mount
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)"
        }
      );

      // Animate value counter
      const finalValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^\d.-]/g, ''));
      if (!isNaN(finalValue)) {
        gsap.fromTo({ val: 0 }, 
          { val: finalValue },
          {
            duration: 1.5,
            delay: (index * 0.1) + 0.3,
            ease: "power2.out",
            onUpdate: function() {
              if (valueEl) {
                const currentVal = Math.round(this.targets()[0].val);
                valueEl.textContent = typeof value === 'string' && value.includes('%') 
                  ? `${currentVal}%` 
                  : currentVal.toString();
              }
            }
          }
        );
      }

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(iconEl, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(iconEl, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [index, value]);

  const gradientClasses = {
    primary: "gradient-primary",
    earth: "gradient-earth", 
    fresh: "gradient-fresh"
  };

  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground"
  };

  return (
    <Card ref={cardRef} className={cn("card-hover group cursor-pointer", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div 
          ref={iconRef}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-white transition-all duration-300",
            gradientClasses[gradient]
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div ref={valueRef} className="text-2xl font-bold text-foreground font-heading">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <p className={cn("text-xs mt-2", trendColors[trendDirection])}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}