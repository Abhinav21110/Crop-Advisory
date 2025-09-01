import { useState } from "react";
import { MessageSquare, Star, Send, ThumbsUp, TrendingUp, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { feedbackData } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

export default function Feedback() {
  const [farmerName, setFarmerName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const categories = [
    "Crop Advisory",
    "Soil Health",
    "Weather Updates",
    "Pest Detection",
    "Market Prices",
    "App Experience",
    "General Feedback"
  ];

  const handleSubmitFeedback = () => {
    if (!farmerName || !location || !message || rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and provide a rating.",
        variant: "destructive"
      });
      return;
    }

    // Simulate feedback submission
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback. We'll use it to improve FarmWise.",
    });

    // Reset form
    setFarmerName("");
    setLocation("");
    setMessage("");
    setRating(0);
    setCategory("");
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const avgRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackData.length;
  const totalFeedback = feedbackData.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Farmer Feedback
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your feedback helps us improve FarmWise. Share your experience, suggestions, 
          and success stories with our farming community.
        </p>
      </div>

      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Average Rating</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                  <div className="flex">
                    {getRatingStars(Math.round(avgRating))}
                  </div>
                </div>
              </div>
              <Star className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover gradient-earth text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Feedback</p>
                <p className="text-2xl font-bold">{totalFeedback}+</p>
              </div>
              <MessageSquare className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover gradient-fresh text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Satisfaction Rate</p>
                <p className="text-2xl font-bold">96%</p>
              </div>
              <ThumbsUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Feedback */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5 text-primary" />
            <span>Share Your Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Name</label>
              <Input
                placeholder="Enter your name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                placeholder="Your farming location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Your Message</label>
            <Textarea
              placeholder="Share your experience, suggestions, or success stories..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Rating</label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      i < rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-muted-foreground hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating} out of 5 stars`}
              </span>
            </div>
          </div>

          <Button 
            onClick={handleSubmitFeedback}
            className="w-full gradient-primary text-white border-0 transition-bouncy hover:scale-105"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Community Feedback */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            <span>Community Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedbackData.map((feedback) => (
              <Card key={feedback.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {feedback.farmerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{feedback.farmerName}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{feedback.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {getRatingStars(feedback.rating)}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{feedback.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    "{feedback.message}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      Verified Farmer
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <span>Success Stories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <h3 className="font-semibold text-success mb-2">20% Yield Increase</h3>
              <p className="text-sm text-muted-foreground">
                "Following FarmWise soil recommendations, I achieved 20% higher wheat yield 
                compared to last season. The soil testing feature was incredibly accurate."
              </p>
              <div className="mt-2 text-xs text-success font-medium">- Ramesh Kumar, Punjab</div>
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Pest Prevention Success</h3>
              <p className="text-sm text-muted-foreground">
                "The pest detection feature helped me identify aphids early. Quick treatment 
                saved my cotton crop and prevented major losses."
              </p>
              <div className="mt-2 text-xs text-primary font-medium">- Priya Sharma, Maharashtra</div>
            </div>
            
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <h3 className="font-semibold text-accent mb-2">Better Market Timing</h3>
              <p className="text-sm text-muted-foreground">
                "Market price alerts helped me sell my produce at the right time. 
                Made 15% more profit than usual this season."
              </p>
              <div className="mt-2 text-xs text-accent font-medium">- Suresh Patel, Gujarat</div>
            </div>
            
            <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
              <h3 className="font-semibold text-secondary mb-2">Water Conservation</h3>
              <p className="text-sm text-muted-foreground">
                "Weather forecasts and irrigation advice helped me save 30% water 
                while maintaining crop health during dry season."
              </p>
              <div className="mt-2 text-xs text-secondary font-medium">- Anjali Reddy, Karnataka</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}