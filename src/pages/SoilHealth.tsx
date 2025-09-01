import { useState } from "react";
import { FlaskConical, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { soilData } from "@/data/sampleData";

export default function SoilHealth() {
  const [selectedLocation, setSelectedLocation] = useState("Punjab");
  
  const currentSoil = soilData.find(
    soil => soil.location === selectedLocation
  ) || soilData[0];

  const locations = [...new Set(soilData.map(item => item.location))];

  const getNutrientStatus = (value: number, type: 'N' | 'P' | 'K') => {
    const ranges = {
      N: { low: 60, high: 80 },
      P: { low: 25, high: 35 },
      K: { low: 70, high: 90 }
    };
    
    const range = ranges[type];
    if (value < range.low) return { status: 'Low', color: 'destructive', icon: TrendingDown };
    if (value > range.high) return { status: 'High', color: 'warning', icon: TrendingUp };
    return { status: 'Optimal', color: 'success', icon: CheckCircle };
  };

  const getPHStatus = (ph: number) => {
    if (ph < 6.0) return { status: 'Acidic', color: 'destructive', suggestion: 'Add lime to increase pH' };
    if (ph > 8.0) return { status: 'Alkaline', color: 'warning', suggestion: 'Add sulfur to decrease pH' };
    return { status: 'Optimal', color: 'success', suggestion: 'pH level is perfect for most crops' };
  };

  const phStatus = getPHStatus(currentSoil.pH);
  const nStatus = getNutrientStatus(currentSoil.nitrogen, 'N');
  const pStatus = getNutrientStatus(currentSoil.phosphorus, 'P');
  const kStatus = getNutrientStatus(currentSoil.potassium, 'K');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Soil Health Monitor
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive soil analysis and nutrient management recommendations 
          for optimal crop growth and yield.
        </p>
      </div>

      {/* Location Selector */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            <span>Select Field Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Choose location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Soil Overview */}
      <Card className="card-hover gradient-earth text-white overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-20 -translate-x-20 pulse-slow" />
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FlaskConical className="h-6 w-6" />
              <span>Soil Analysis - {currentSoil.location}</span>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {currentSoil.soilType} Soil
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold font-heading mb-1">
                {currentSoil.pH}
              </div>
              <div className="text-sm opacity-90">pH Level</div>
              <Badge 
                className={`mt-2 ${
                  phStatus.color === 'success' ? 'bg-success/20 text-success-foreground border-success/30' :
                  phStatus.color === 'warning' ? 'bg-warning/20 text-warning-foreground border-warning/30' :
                  'bg-destructive/20 text-destructive-foreground border-destructive/30'
                }`}
              >
                {phStatus.status}
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold font-heading mb-1">
                {currentSoil.nitrogen}
              </div>
              <div className="text-sm opacity-90">Nitrogen (N)</div>
              <Badge className={`mt-2 bg-white/20 text-white border-white/30`}>
                {nStatus.status}
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold font-heading mb-1">
                {currentSoil.phosphorus}
              </div>
              <div className="text-sm opacity-90">Phosphorus (P)</div>
              <Badge className={`mt-2 bg-white/20 text-white border-white/30`}>
                {pStatus.status}
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold font-heading mb-1">
                {currentSoil.potassium}
              </div>
              <div className="text-sm opacity-90">Potassium (K)</div>
              <Badge className={`mt-2 bg-white/20 text-white border-white/30`}>
                {kStatus.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nutrient Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Nutrient Levels</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nitrogen */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nitrogen (N)</span>
                <div className="flex items-center space-x-2">
                  <nStatus.icon className="h-4 w-4 text-success" />
                  <span className="text-sm">{currentSoil.nitrogen}</span>
                </div>
              </div>
              <Progress value={(currentSoil.nitrogen / 100) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Essential for leaf growth and chlorophyll production
              </p>
            </div>

            {/* Phosphorus */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Phosphorus (P)</span>
                <div className="flex items-center space-x-2">
                  <pStatus.icon className="h-4 w-4 text-warning" />
                  <span className="text-sm">{currentSoil.phosphorus}</span>
                </div>
              </div>
              <Progress value={(currentSoil.phosphorus / 50) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Important for root development and flowering
              </p>
            </div>

            {/* Potassium */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Potassium (K)</span>
                <div className="flex items-center space-x-2">
                  <kStatus.icon className="h-4 w-4 text-success" />
                  <span className="text-sm">{currentSoil.potassium}</span>
                </div>
              </div>
              <Progress value={(currentSoil.potassium / 100) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Helps in disease resistance and water regulation
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span>Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-foreground">
                Primary Recommendation
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentSoil.recommendation}
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-foreground">
                pH Management
              </h3>
              <p className="text-sm text-muted-foreground">
                {phStatus.suggestion}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  Schedule Soil Test
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  Order Fertilizers
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  Contact Expert
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Locations Data */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>All Field Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {soilData.map((soil) => (
              <Card 
                key={soil.id}
                className={`transition-smooth hover:shadow-md cursor-pointer ${
                  soil.location === selectedLocation 
                    ? "ring-2 ring-primary bg-primary/5" 
                    : ""
                }`}
                onClick={() => setSelectedLocation(soil.location)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{soil.location}</CardTitle>
                  <Badge variant="outline">{soil.soilType}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>pH: <span className="font-medium">{soil.pH}</span></div>
                    <div>N: <span className="font-medium">{soil.nitrogen}</span></div>
                    <div>P: <span className="font-medium">{soil.phosphorus}</span></div>
                    <div>K: <span className="font-medium">{soil.potassium}</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}