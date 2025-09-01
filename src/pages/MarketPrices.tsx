import { useState } from "react";
import { TrendingUp, TrendingDown, IndianRupee, Calendar, MapPin, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { marketPrices } from "@/data/sampleData";

export default function MarketPrices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("all");

  const markets = [...new Set(marketPrices.map(item => item.market))];
  
  const filteredPrices = marketPrices.filter(price => {
    const matchesSearch = price.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarket = selectedMarket === "all" || price.market === selectedMarket;
    return matchesSearch && matchesMarket;
  });

  const getTrendIcon = (change: string) => {
    if (change.startsWith('+')) return TrendingUp;
    if (change.startsWith('-')) return TrendingDown;
    return TrendingUp;
  };

  const getTrendColor = (change: string) => {
    if (change.startsWith('+')) return 'text-success';
    if (change.startsWith('-')) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const highestPrice = Math.max(...marketPrices.map(p => p.price));
  const lowestPrice = Math.min(...marketPrices.map(p => p.price));
  const avgPrice = Math.round(marketPrices.reduce((sum, p) => sum + p.price, 0) / marketPrices.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Market Prices
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time market prices across major agricultural trading centers. 
          Stay informed to make better selling decisions.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Highest Price</p>
                <p className="text-2xl font-bold">₹{highestPrice}</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover gradient-earth text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Average Price</p>
                <p className="text-2xl font-bold">₹{avgPrice}</p>
              </div>
              <IndianRupee className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover gradient-fresh text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Lowest Price</p>
                <p className="text-2xl font-bold">₹{lowestPrice}</p>
              </div>
              <TrendingDown className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                {markets.map((market) => (
                  <SelectItem key={market} value={market}>
                    {market}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrices.map((price) => {
          const TrendIcon = getTrendIcon(price.change);
          const trendColor = getTrendColor(price.change);
          
          return (
            <Card key={price.id} className="card-hover group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-heading">{price.crop}</CardTitle>
                  <div className={`flex items-center space-x-1 ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{price.change}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ₹{price.price}
                  </div>
                  <div className="text-sm text-muted-foreground">per quintal</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{price.market}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{price.date}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full transition-bouncy group-hover:scale-105"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredPrices.length === 0 && (
        <Card className="card-hover">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Market Analysis */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span>Market Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Price Trends</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Cotton prices are rising</span>
                  <Badge className="bg-success text-success-foreground">+5.8%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Onion market is volatile</span>
                  <Badge variant="destructive">-8.2%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Wheat showing stability</span>
                  <Badge variant="outline">+2.3%</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Market Insights</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Cotton prices have increased due to strong export demand and favorable weather conditions.</p>
                <p>• Onion prices are fluctuating due to seasonal factors and supply chain disruptions.</p>
                <p>• Wheat market remains stable with adequate government procurement and storage.</p>
                <p>• Rice prices expected to rise in coming weeks due to festival season demand.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}