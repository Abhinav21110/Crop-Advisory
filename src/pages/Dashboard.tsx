import { useEffect, useState } from "react";
import { 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  Wheat, 
  FlaskConical,
  CloudRain,
  IndianRupee,
  AlertTriangle
} from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { weatherData, soilData, marketPrices, cropAdvisoryData } from "@/data/sampleData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const [animateCards, setAnimateCards] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get latest data for dashboard
  const currentWeather = weatherData[0];
  const currentSoil = soilData[0];
  const topMarketPrice = marketPrices[0];
  const currentAdvisory = cropAdvisoryData[0];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl gradient-hero p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold font-heading mb-2">
            {t('welcome')}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Your intelligent farming companion providing real-time insights for better crop management, 
            soil health monitoring, and market analysis.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 pulse-slow" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 pulse-slow" />
      </div>

      {/* Key Metrics */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${animateCards ? 'animate' : ''}`}>
        <DashboardCard
          title="Temperature"
          value={`${currentWeather.temperature}°C`}
          description="Current temperature"
          icon={<Thermometer className="h-4 w-4" />}
          trend="Normal range"
          trendDirection="neutral"
          gradient="primary"
          className="fade-in-up"
        />
        
        <DashboardCard
          title="Humidity"
          value={`${currentWeather.humidity}%`}
          description="Relative humidity"
          icon={<Droplets className="h-4 w-4" />}
          trend="Optimal level"
          trendDirection="up"
          gradient="fresh"
          className="fade-in-up"
        />
        
        <DashboardCard
          title="Soil pH"
          value={currentSoil.pH}
          description="Current soil acidity"
          icon={<FlaskConical className="h-4 w-4" />}
          trend="Within ideal range"
          trendDirection="up"
          gradient="earth"
          className="fade-in-up"
        />
        
        <DashboardCard
          title="Wheat Price"
          value={`₹${topMarketPrice.price}`}
          description="Per quintal"
          icon={<IndianRupee className="h-4 w-4" />}
          trend={topMarketPrice.change}
          trendDirection="up"
          gradient="primary"
          className="fade-in-up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weather Alert */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CloudRain className="h-5 w-5 text-primary" />
              <span>Weather Advisory</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <Badge variant="outline">{currentWeather.location}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rainfall</span>
              <span className="font-medium">{currentWeather.rainfall}mm</span>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">{currentWeather.advisory}</p>
            </div>
          </CardContent>
        </Card>

        {/* Crop Advisory */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wheat className="h-5 w-5 text-accent" />
              <span>Crop Advisory</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Recommended</span>
              <Badge className="gradient-fresh text-white border-0">
                {currentAdvisory.recommendedCrop}
              </Badge>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">{currentAdvisory.reasoning}</p>
            </div>
          </CardContent>
        </Card>

        {/* Soil Health */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FlaskConical className="h-5 w-5 text-secondary" />
              <span>Soil Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-muted rounded">
                <div className="text-lg font-bold text-foreground">N</div>
                <div className="text-xs text-muted-foreground">{currentSoil.nitrogen}</div>
              </div>
              <div className="p-2 bg-muted rounded">
                <div className="text-lg font-bold text-foreground">P</div>
                <div className="text-xs text-muted-foreground">{currentSoil.phosphorus}</div>
              </div>
              <div className="p-2 bg-muted rounded">
                <div className="text-lg font-bold text-foreground">K</div>
                <div className="text-xs text-muted-foreground">{currentSoil.potassium}</div>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">{currentSoil.recommendation}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Prices Table */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Today's Market Prices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {marketPrices.map((price) => (
              <div key={price.id} className="p-4 border rounded-lg hover:bg-muted transition-smooth">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{price.crop}</span>
                  <Badge 
                    variant={price.change.startsWith('+') ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {price.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  ₹{price.price}
                </div>
                <div className="text-xs text-muted-foreground">{price.market}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-muted transition-smooth text-left group">
              <FlaskConical className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-medium">Test Soil</div>
              <div className="text-xs text-muted-foreground">Get soil analysis</div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-muted transition-smooth text-left group">
              <CloudRain className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-medium">Weather</div>
              <div className="text-xs text-muted-foreground">Check forecast</div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-muted transition-smooth text-left group">
              <TrendingUp className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-medium">Markets</div>
              <div className="text-xs text-muted-foreground">View prices</div>
            </button>
            <button className="p-4 border rounded-lg hover:bg-muted transition-smooth text-left group">
              <Wheat className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-medium">Advisory</div>
              <div className="text-xs text-muted-foreground">Get recommendations</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}