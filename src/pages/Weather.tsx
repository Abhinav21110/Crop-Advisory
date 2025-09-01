import { useState, useEffect, useCallback } from "react";
import { CloudRain, Sun, Wind, Droplets, Thermometer, Eye, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentWeather, getWeatherForecast, getAllLocationsWeather, WeatherData, ForecastData } from "@/services/weatherService";

export default function Weather() {
  const [selectedLocation, setSelectedLocation] = useState("Punjab");
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [allWeatherData, setAllWeatherData] = useState<WeatherData[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locations = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", 
    "Ladakh", "Chandigarh", "Puducherry", "Andaman and Nicobar Islands", 
    "Lakshadweep", "Dadra and Nagar Haveli and Daman and Diu"
  ];

  const loadWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      const [current, all] = await Promise.all([
        getCurrentWeather(selectedLocation),
        getAllLocationsWeather()
      ]);
      setCurrentWeather(current);
      setAllWeatherData(all);
      setError(null);
    } catch (err) {
      setError('Failed to load weather data');
      console.error('Weather data error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedLocation]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  useEffect(() => {
    if (selectedLocation && !loading) {
      loadCurrentWeather(selectedLocation);
      loadForecast(selectedLocation);
    }
  }, [selectedLocation, loading]);

  const loadCurrentWeather = async (location: string) => {
    try {
      const weather = await getCurrentWeather(location);
      setCurrentWeather(weather);
    } catch (err) {
      console.error('Current weather error:', err);
    }
  };

  const loadForecast = async (location: string) => {
    try {
      const forecast = await getWeatherForecast(location);
      setForecastData(forecast);
    } catch (err) {
      console.error('Forecast error:', err);
    }
  };

  const getWeatherIcon = (temp: number, rainfall: number) => {
    if (rainfall > 5) return CloudRain;
    if (temp > 30) return Sun;
    return Sun;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error || !currentWeather) {
    return (
      <div className="text-center space-y-4 p-8">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-semibold">Weather Data Unavailable</h2>
        <p className="text-muted-foreground">{error || 'Unable to load weather information'}</p>
        <button 
          onClick={loadWeatherData}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  const getWeatherStatus = (temp: number, rainfall: number, humidity: number) => {
    if (rainfall > 5) return { status: "Rainy", color: "bg-blue-500", description: "Heavy rainfall expected" };
    if (temp > 35) return { status: "Hot", color: "bg-red-500", description: "High temperature alert" };
    if (humidity > 80) return { status: "Humid", color: "bg-yellow-500", description: "High humidity levels" };
    return { status: "Pleasant", color: "bg-green-500", description: "Favorable conditions" };
  };

  const WeatherIcon = getWeatherIcon(currentWeather.temperature, currentWeather.rainfall);
  const weatherStatus = getWeatherStatus(currentWeather.temperature, currentWeather.rainfall, currentWeather.humidity);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Weather Monitoring
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time weather conditions and agricultural advisories to help you 
          make informed farming decisions.
        </p>
      </div>

      {/* Location Selector */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>Select Location</span>
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

      {/* Current Weather */}
      <Card className="card-hover gradient-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 pulse-slow" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 pulse-slow" />
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WeatherIcon className="h-6 w-6" />
              <span>Current Weather - {currentWeather.location}</span>
            </div>
            <Badge className={`${weatherStatus.color} text-white border-0`}>
              {weatherStatus.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold font-heading mb-1">
                {currentWeather.temperature}°C
              </div>
              <div className="text-sm opacity-90">Temperature</div>
            </div>
            
            <div className="text-center">
              <CloudRain className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold font-heading mb-1">
                {currentWeather.rainfall}mm
              </div>
              <div className="text-sm opacity-90">Rainfall</div>
            </div>
            
            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold font-heading mb-1">
                {currentWeather.humidity}%
              </div>
              <div className="text-sm opacity-90">Humidity</div>
            </div>
            
            <div className="text-center">
              <Wind className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold font-heading mb-1">
                {currentWeather.windSpeed}km/h
              </div>
              <div className="text-sm opacity-90">Wind Speed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Advisory */}
      <Alert className="border-l-4 border-l-primary bg-primary/5">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          <strong>Agricultural Advisory:</strong> {currentWeather.advisory}
        </AlertDescription>
      </Alert>

      {/* Weather Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-accent" />
              <span>Today's Forecast</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Morning (6-12 PM)</span>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{currentWeather.temperature - 5}°C</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Afternoon (12-6 PM)</span>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{currentWeather.temperature + 2}°C</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Evening (6-12 AM)</span>
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{currentWeather.temperature - 2}°C</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Farming Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentWeather.rainfall > 5 ? (
                <>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      ⚠️ <strong>Drainage Alert:</strong> Ensure proper field drainage to prevent waterlogging.
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      🚫 <strong>Spraying Warning:</strong> Avoid pesticide/fertilizer application during rain.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ <strong>Good Conditions:</strong> Ideal time for field operations and spraying.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💧 <strong>Irrigation:</strong> Monitor soil moisture and irrigate if needed.
                    </p>
                  </div>
                </>
              )}
              
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  🌡️ <strong>Temperature Watch:</strong> {currentWeather.temperature > 30 
                    ? "High temperature may stress crops. Ensure adequate water supply." 
                    : "Temperature is favorable for crop growth."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Forecast */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudRain className="h-5 w-5 text-primary" />
            <span>7-Day Forecast</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {forecastData.length > 0 ? forecastData.map((forecast, i) => {
              const date = new Date(forecast.date);
              
              return (
                <div key={i} className="text-center p-4 border rounded-lg hover:bg-muted transition-smooth">
                  <div className="text-xs text-muted-foreground mb-2">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="mb-2">
                    {forecast.rainfall > 5 ? (
                      <CloudRain className="h-6 w-6 text-blue-500 mx-auto" />
                    ) : (
                      <Sun className="h-6 w-6 text-yellow-500 mx-auto" />
                    )}
                  </div>
                  <div className="text-sm font-medium">{forecast.temperature}°C</div>
                  <div className="text-xs text-muted-foreground">{forecast.rainfall.toFixed(1)}mm</div>
                </div>
              );
            }) : (
              Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const temp = currentWeather.temperature + Math.floor(Math.random() * 6) - 3;
                const rain = Math.random() * 10;
                
                return (
                  <div key={i} className="text-center p-4 border rounded-lg hover:bg-muted transition-smooth">
                    <div className="text-xs text-muted-foreground mb-2">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="mb-2">
                      {rain > 5 ? (
                        <CloudRain className="h-6 w-6 text-blue-500 mx-auto" />
                      ) : (
                        <Sun className="h-6 w-6 text-yellow-500 mx-auto" />
                      )}
                    </div>
                    <div className="text-sm font-medium">{temp}°C</div>
                    <div className="text-xs text-muted-foreground">{rain.toFixed(1)}mm</div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Locations Weather */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Weather Across Regions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allWeatherData.map((weather) => {
              const Icon = getWeatherIcon(weather.temperature, weather.rainfall);
              const status = getWeatherStatus(weather.temperature, weather.rainfall, weather.humidity);
              
              return (
                <Card 
                  key={weather.id}
                  className={`transition-smooth hover:shadow-md cursor-pointer ${
                    weather.location === selectedLocation 
                      ? "ring-2 ring-primary bg-primary/5" 
                      : ""
                  }`}
                  onClick={() => setSelectedLocation(weather.location)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{weather.location}</CardTitle>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-sm text-center">
                      <div>
                        <div className="font-medium">{weather.temperature}°C</div>
                        <div className="text-xs text-muted-foreground">Temp</div>
                      </div>
                      <div>
                        <div className="font-medium">{weather.rainfall.toFixed(1)}mm</div>
                        <div className="text-xs text-muted-foreground">Rain</div>
                      </div>
                      <div>
                        <div className="font-medium">{weather.humidity}%</div>
                        <div className="text-xs text-muted-foreground">Humidity</div>
                      </div>
                    </div>
                    <Badge className={`${status.color} text-white border-0 w-full justify-center`}>
                      {status.status}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}