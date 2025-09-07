import { useState, useEffect, useCallback } from "react";
import { Wheat, MapPin, Calendar, TrendingUp, Bot, Cloud, Thermometer, Droplets, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cropAdvisoryData } from "@/data/sampleData";
import CropRecommendationForm from "@/components/CropRecommendationForm";

interface RegionalRecommendation {
  success: boolean;
  state: string;
  city: string;
  primary_recommendation: string;
  confidence: number;
  all_recommendations: Array<{
    crop: string;
    confidence: number;
    season: string;
    duration: string;
    water_requirement: string;
    soil_type: string;
  }>;
  conditions: {
    weather: {
      temperature: number;
      humidity: number;
      rainfall: number;
    };
    soil: {
      N: number;
      P: number;
      K: number;
      ph: number;
    };
  };
  timestamp: string;
}

export default function Advisory() {
  const [selectedState, setSelectedState] = useState("Punjab");
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const currentAdvisory = cropAdvisoryData.find(
    advisory => advisory.location === `${selectedState}, India`
  ) || cropAdvisoryData[0];

  const locations = [...new Set(cropAdvisoryData.map(item => item.location))];

  // Fetch regional recommendation function with mock data
  const fetchRegionalRecommendation = useCallback(async () => {
    setLoading(true);
    try {
      // Using mock data instead of API call
      setTimeout(() => {
        const mockData: RegionalRecommendation = {
          success: true,
          state: selectedState,
          city: "",
          primary_recommendation: "Wheat",
          confidence: 0.85,
          all_recommendations: [
            {
              crop: "Wheat",
              confidence: 0.85,
              season: "Rabi",
              duration: "120-150 days",
              water_requirement: "Medium",
              soil_type: "Loam"
            },
            {
              crop: "Barley",
              confidence: 0.75,
              season: "Rabi",
              duration: "100-120 days",
              water_requirement: "Low",
              soil_type: "Loam"
            },
            {
              crop: "Mustard",
              confidence: 0.68,
              season: "Rabi",
              duration: "90-110 days",
              water_requirement: "Low",
              soil_type: "Sandy Loam"
            }
          ],
          conditions: {
            weather: {
              temperature: 22,
              humidity: 65,
              rainfall: 15
            },
            soil: {
              N: 85,
              P: 32,
              K: 78,
              ph: 7.2
            }
          },
          timestamp: new Date().toISOString()
        };
        setRegionalData(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to recommendation service",
        variant: "destructive",
      });
      setLoading(false);
    }
  }, [selectedState, toast]);

  // Fetch available states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        // Using mock data instead of API call
        setAvailableStates(['Punjab', 'Maharashtra', 'Kerala', 'Rajasthan', 'Gujarat', 'Uttar Pradesh']);
      } catch (error) {
        console.error('Failed to fetch states:', error);
      }
    };
    fetchStates();
  }, []);

  // Fetch regional recommendation when state changes
  useEffect(() => {
    if (selectedState) {
      fetchRegionalRecommendation();
    }
  }, [selectedState, fetchRegionalRecommendation]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Crop Advisory
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get personalized crop recommendations based on your location, soil conditions, 
          and current weather patterns.
        </p>
      </div>

      {/* Tabs for different advisory types */}
      <Tabs defaultValue="ai-recommendation" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-recommendation" className="flex items-center space-x-2">
            <Bot className="h-4 w-4" />
            <span>AI Recommendation</span>
          </TabsTrigger>
          <TabsTrigger value="regional-advisory" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Regional Advisory</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-recommendation" className="space-y-6">
          <CropRecommendationForm />
        </TabsContent>

        <TabsContent value="regional-advisory" className="space-y-6">
          {/* Location Selector */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Select Your Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Choose location" />
                </SelectTrigger>
                <SelectContent>
                  {availableStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* AI-Powered Regional Recommendation */}
          {loading ? (
            <Card className="card-hover">
              <CardContent className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span>Getting AI recommendations for {selectedState}...</span>
                </div>
              </CardContent>
            </Card>
          ) : regionalData ? (
            <div className="space-y-6">
              {/* Weather & Soil Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Cloud className="h-5 w-5 text-blue-500" />
                      <span>Weather Conditions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-semibold">{regionalData.conditions.weather.temperature.toFixed(1)}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Humidity</span>
                      </div>
                      <span className="font-semibold">{regionalData.conditions.weather.humidity.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cloud className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Rainfall</span>
                      </div>
                      <span className="font-semibold">{regionalData.conditions.weather.rainfall.toFixed(0)}mm</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-green-500" />
                      <span>Soil Profile</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Nitrogen</div>
                        <div className="font-semibold">{regionalData.conditions.soil.N} mg/kg</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Phosphorus</div>
                        <div className="font-semibold">{regionalData.conditions.soil.P} mg/kg</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Potassium</div>
                        <div className="font-semibold">{regionalData.conditions.soil.K} mg/kg</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">pH Level</div>
                        <div className="font-semibold">{regionalData.conditions.soil.ph}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Recommendation */}
              <Card className="card-hover gradient-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 pulse-slow" />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wheat className="h-6 w-6" />
                      <span>AI Recommended Crop</span>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {Math.round(regionalData.confidence * 100)}% Confidence
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold font-heading mb-2">
                        {regionalData.primary_recommendation.toUpperCase()}
                      </h2>
                      <p className="text-lg opacity-90">
                        Best choice for {regionalData.state}{regionalData.city ? ` (${regionalData.city})` : ""}
                      </p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-semibold mb-2 flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Based on Current Conditions</span>
                      </h3>
                      <p className="text-sm opacity-90">
                        AI analysis of weather patterns, soil nutrients, and regional agricultural data suggests {regionalData.primary_recommendation} as the optimal crop for current conditions in {regionalData.state}.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="card-hover">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">Select a state to get AI-powered crop recommendations</p>
              </CardContent>
            </Card>
          )}

          {/* Alternative Recommendations */}
          {regionalData && (
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Alternative Crop Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {regionalData.all_recommendations.map((rec, index) => (
                    <Card key={index} className="transition-smooth hover:shadow-md">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{rec.crop}</CardTitle>
                          <Badge className={`${index === 0 ? 'gradient-primary' : 'gradient-fresh'} text-white border-0`}>
                            {Math.round(rec.confidence * 100)}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-sm space-y-1">
                          <p><strong>Season:</strong> {rec.season}</p>
                          <p><strong>Duration:</strong> {rec.duration}</p>
                          <p><strong>Water Need:</strong> {rec.water_requirement}</p>
                          <p><strong>Soil Type:</strong> {rec.soil_type}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="gradient-primary text-white border-0 h-16 transition-bouncy hover:scale-105">
              <div className="text-center">
                <div className="font-semibold">Get Detailed Plan</div>
                <div className="text-xs opacity-90">Cultivation timeline</div>
              </div>
            </Button>
            <Button variant="outline" className="h-16 transition-bouncy hover:scale-105">
              <div className="text-center">
                <div className="font-semibold">Soil Requirements</div>
                <div className="text-xs text-muted-foreground">Check compatibility</div>
              </div>
            </Button>
            <Button variant="outline" className="h-16 transition-bouncy hover:scale-105">
              <div className="text-center">
                <div className="font-semibold">Market Analysis</div>
                <div className="text-xs text-muted-foreground">Price trends</div>
              </div>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}