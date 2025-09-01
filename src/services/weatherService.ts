// OpenWeather API service for real-time weather data
const API_KEY = '6da3750953758ce395810814df0a79cf';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  id: number;
  location: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
  advisory: string;
  description: string;
  icon: string;
}

export interface ForecastData {
  date: string;
  temperature: number;
  rainfall: number;
  description: string;
  icon: string;
}

// City coordinates for all major Indian states and agricultural regions
const CITY_COORDINATES = {
  'Andhra Pradesh': { lat: 15.9129, lon: 79.7400, name: 'Kurnool' },
  'Arunachal Pradesh': { lat: 27.0844, lon: 93.6053, name: 'Itanagar' },
  'Assam': { lat: 26.2006, lon: 92.9376, name: 'Guwahati' },
  'Bihar': { lat: 25.0961, lon: 85.3131, name: 'Patna' },
  'Chhattisgarh': { lat: 21.2787, lon: 81.8661, name: 'Raipur' },
  'Goa': { lat: 15.2993, lon: 74.1240, name: 'Panaji' },
  'Gujarat': { lat: 23.0225, lon: 72.5714, name: 'Ahmedabad' },
  'Haryana': { lat: 29.0588, lon: 76.0856, name: 'Karnal' },
  'Himachal Pradesh': { lat: 31.1048, lon: 77.1734, name: 'Shimla' },
  'Jharkhand': { lat: 23.6102, lon: 85.2799, name: 'Ranchi' },
  'Karnataka': { lat: 15.3173, lon: 75.7139, name: 'Hubli' },
  'Kerala': { lat: 10.8505, lon: 76.2711, name: 'Thrissur' },
  'Madhya Pradesh': { lat: 23.2599, lon: 77.4126, name: 'Bhopal' },
  'Maharashtra': { lat: 19.7515, lon: 75.7139, name: 'Aurangabad' },
  'Manipur': { lat: 24.6637, lon: 93.9063, name: 'Imphal' },
  'Meghalaya': { lat: 25.4670, lon: 91.3662, name: 'Shillong' },
  'Mizoram': { lat: 23.1645, lon: 92.9376, name: 'Aizawl' },
  'Nagaland': { lat: 26.1584, lon: 94.5624, name: 'Kohima' },
  'Odisha': { lat: 20.9517, lon: 85.0985, name: 'Bhubaneswar' },
  'Punjab': { lat: 31.1471, lon: 75.3412, name: 'Ludhiana' },
  'Rajasthan': { lat: 26.9124, lon: 75.7873, name: 'Jaipur' },
  'Sikkim': { lat: 27.5330, lon: 88.5122, name: 'Gangtok' },
  'Tamil Nadu': { lat: 11.0168, lon: 76.9558, name: 'Coimbatore' },
  'Telangana': { lat: 17.1232, lon: 79.2088, name: 'Warangal' },
  'Tripura': { lat: 23.9408, lon: 91.9882, name: 'Agartala' },
  'Uttar Pradesh': { lat: 26.8467, lon: 80.9462, name: 'Lucknow' },
  'Uttarakhand': { lat: 30.0668, lon: 79.0193, name: 'Dehradun' },
  'West Bengal': { lat: 22.5726, lon: 88.3639, name: 'Kolkata' },
  // Union Territories
  'Delhi': { lat: 28.7041, lon: 77.1025, name: 'New Delhi' },
  'Jammu and Kashmir': { lat: 34.0837, lon: 74.7973, name: 'Srinagar' },
  'Ladakh': { lat: 34.1526, lon: 77.5771, name: 'Leh' },
  'Chandigarh': { lat: 30.7333, lon: 76.7794, name: 'Chandigarh' },
  'Puducherry': { lat: 11.9416, lon: 79.8083, name: 'Puducherry' },
  'Andaman and Nicobar Islands': { lat: 11.7401, lon: 92.6586, name: 'Port Blair' },
  'Lakshadweep': { lat: 10.5667, lon: 72.6417, name: 'Kavaratti' },
  'Dadra and Nagar Haveli and Daman and Diu': { lat: 20.1809, lon: 73.0169, name: 'Daman' }
};

export async function getCurrentWeather(location: string): Promise<WeatherData> {
  try {
    const coords = CITY_COORDINATES[location as keyof typeof CITY_COORDINATES];
    if (!coords) {
      throw new Error(`Location ${location} not found`);
    }

    const response = await fetch(
      `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();
    
    // Calculate rainfall from weather conditions
    const rainfall = data.rain?.['1h'] || data.rain?.['3h'] || 0;
    
    // Generate agricultural advisory based on weather conditions
    const advisory = generateAdvisory(data.main.temp, rainfall, data.main.humidity, data.weather[0].main);

    return {
      id: Date.now(),
      location,
      temperature: Math.round(data.main.temp),
      rainfall: rainfall,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      advisory,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return fallback data if API fails
    return getFallbackWeatherData(location);
  }
}

export async function getWeatherForecast(location: string): Promise<ForecastData[]> {
  try {
    const coords = CITY_COORDINATES[location as keyof typeof CITY_COORDINATES];
    if (!coords) {
      throw new Error(`Location ${location} not found`);
    }

    const response = await fetch(
      `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Forecast data fetch failed');
    }

    const data = await response.json();
    
    // Get daily forecasts (every 8th item represents ~24 hours)
    const dailyForecasts = data.list.filter((_: unknown, index: number) => index % 8 === 0).slice(0, 7);
    
    return dailyForecasts.map((item: {
      dt: number;
      main: { temp: number };
      weather: Array<{ description: string; icon: string }>;
      rain?: { '3h': number };
    }) => ({
      date: new Date(item.dt * 1000).toISOString().split('T')[0],
      temperature: Math.round(item.main.temp),
      rainfall: item.rain?.['3h'] || 0,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return getFallbackForecastData();
  }
}

export async function getAllLocationsWeather(): Promise<WeatherData[]> {
  const locations = Object.keys(CITY_COORDINATES);
  const weatherPromises = locations.map(location => getCurrentWeather(location));
  
  try {
    const weatherData = await Promise.all(weatherPromises);
    return weatherData;
  } catch (error) {
    console.error('Error fetching all locations weather:', error);
    return locations.map(location => getFallbackWeatherData(location));
  }
}

function generateAdvisory(temp: number, rainfall: number, humidity: number, condition: string): string {
  if (rainfall > 5) {
    return "Heavy rainfall expected. Ensure proper field drainage to prevent waterlogging. Avoid pesticide/fertilizer application.";
  } else if (temp > 35) {
    return "High temperature alert. Ensure adequate irrigation and provide shade for sensitive crops. Monitor for heat stress.";
  } else if (humidity > 80) {
    return "High humidity levels may promote fungal diseases. Improve air circulation and consider preventive fungicide application.";
  } else if (condition.toLowerCase().includes('clear') && temp > 25 && temp < 35) {
    return "Favorable weather conditions. Good time for field operations, spraying, and harvesting activities.";
  } else if (temp < 15) {
    return "Cool weather conditions. Protect sensitive crops from cold stress and adjust irrigation schedule.";
  } else {
    return "Moderate weather conditions. Continue regular farming activities with standard precautions.";
  }
}

function getFallbackWeatherData(location: string): WeatherData {
  // Fallback data based on typical conditions for each region
  const fallbackData: { [key: string]: Partial<WeatherData> } = {
    'Andhra Pradesh': { temperature: 30, rainfall: 1.5, humidity: 60 },
    'Arunachal Pradesh': { temperature: 20, rainfall: 6.0, humidity: 75 },
    'Assam': { temperature: 26, rainfall: 8.0, humidity: 80 },
    'Bihar': { temperature: 28, rainfall: 3.0, humidity: 65 },
    'Chhattisgarh': { temperature: 29, rainfall: 2.5, humidity: 55 },
    'Goa': { temperature: 28, rainfall: 4.0, humidity: 75 },
    'Gujarat': { temperature: 30, rainfall: 1.0, humidity: 50 },
    'Haryana': { temperature: 25, rainfall: 2.0, humidity: 60 },
    'Himachal Pradesh': { temperature: 15, rainfall: 3.5, humidity: 70 },
    'Jharkhand': { temperature: 27, rainfall: 4.0, humidity: 65 },
    'Karnataka': { temperature: 26, rainfall: 2.0, humidity: 55 },
    'Kerala': { temperature: 26, rainfall: 8.2, humidity: 85 },
    'Madhya Pradesh': { temperature: 28, rainfall: 2.5, humidity: 55 },
    'Maharashtra': { temperature: 28, rainfall: 0, humidity: 45 },
    'Manipur': { temperature: 22, rainfall: 5.0, humidity: 75 },
    'Meghalaya': { temperature: 20, rainfall: 10.0, humidity: 85 },
    'Mizoram': { temperature: 23, rainfall: 7.0, humidity: 80 },
    'Nagaland': { temperature: 21, rainfall: 6.5, humidity: 78 },
    'Odisha': { temperature: 29, rainfall: 3.5, humidity: 70 },
    'Punjab': { temperature: 18, rainfall: 2.5, humidity: 65 },
    'Rajasthan': { temperature: 25, rainfall: 0.5, humidity: 40 },
    'Sikkim': { temperature: 16, rainfall: 8.0, humidity: 80 },
    'Tamil Nadu': { temperature: 29, rainfall: 2.0, humidity: 55 },
    'Telangana': { temperature: 31, rainfall: 1.8, humidity: 58 },
    'Tripura': { temperature: 25, rainfall: 6.0, humidity: 78 },
    'Uttar Pradesh': { temperature: 22, rainfall: 3.0, humidity: 60 },
    'Uttarakhand': { temperature: 18, rainfall: 4.0, humidity: 68 },
    'West Bengal': { temperature: 24, rainfall: 5.0, humidity: 75 },
    'Delhi': { temperature: 26, rainfall: 2.0, humidity: 58 },
    'Jammu and Kashmir': { temperature: 12, rainfall: 3.0, humidity: 65 },
    'Ladakh': { temperature: 8, rainfall: 0.5, humidity: 45 },
    'Chandigarh': { temperature: 24, rainfall: 2.2, humidity: 62 },
    'Puducherry': { temperature: 28, rainfall: 3.0, humidity: 70 },
    'Andaman and Nicobar Islands': { temperature: 27, rainfall: 8.5, humidity: 85 },
    'Lakshadweep': { temperature: 29, rainfall: 4.0, humidity: 78 },
    'Dadra and Nagar Haveli and Daman and Diu': { temperature: 30, rainfall: 1.5, humidity: 65 }
  };

  const data = fallbackData[location] || fallbackData['Punjab'];
  return {
    id: Date.now(),
    location,
    temperature: data.temperature || 25,
    rainfall: data.rainfall || 2,
    humidity: data.humidity || 60,
    windSpeed: 12,
    advisory: generateAdvisory(data.temperature || 25, data.rainfall || 2, data.humidity || 60, 'clear'),
    description: 'partly cloudy',
    icon: '02d'
  };
}

function getFallbackForecastData(): ForecastData[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      temperature: 25 + Math.floor(Math.random() * 10) - 5,
      rainfall: Math.random() * 5,
      description: 'partly cloudy',
      icon: '02d'
    };
  });
}
