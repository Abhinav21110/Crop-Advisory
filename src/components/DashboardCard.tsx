import { ReactNode } from "react";
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
}

export function DashboardCard({
  title,
  value,
  description,
  icon,
  trend,
  trendDirection = "neutral",
  className,
  gradient = "primary"
}: DashboardCardProps) {
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
    <Card className={cn("card-hover group", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center text-white transition-bouncy group-hover:scale-110",
          gradientClasses[gradient]
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground font-heading">
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