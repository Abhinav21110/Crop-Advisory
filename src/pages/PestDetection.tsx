import { useState } from "react";
import { Bug, Upload, Camera, Search, AlertTriangle, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { pestLibrary } from "@/data/sampleData";

export default function PestDetection() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [detectionResult, setDetectionResult] = useState<typeof pestLibrary[0] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredPests = pestLibrary.filter(pest =>
    pest.pestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.symptoms.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateDetection();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateDetection = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      // Randomly select a pest from library for demo
      const randomPest = pestLibrary[Math.floor(Math.random() * pestLibrary.length)];
      setDetectionResult(randomPest);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearDetection = () => {
    setUploadedImage(null);
    setDetectionResult(null);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (pestName: string) => {
    if (pestName.toLowerCase().includes('blight') || pestName.toLowerCase().includes('rot')) {
      return 'destructive';
    }
    if (pestName.toLowerCase().includes('aphid') || pestName.toLowerCase().includes('whitefly')) {
      return 'secondary';
    }
    return 'default';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Pest & Disease Detection
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload plant images for AI-powered pest and disease identification. 
          Get instant diagnosis and treatment recommendations.
        </p>
      </div>

      {/* Image Upload Section */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-primary" />
            <span>Upload Plant Image</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary transition-smooth">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Plant Photo</h3>
              <p className="text-muted-foreground mb-4">
                Take a clear photo of affected leaves, stems, or fruits for better detection accuracy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <label htmlFor="image-upload">
                  <Button className="cursor-pointer gradient-primary text-white border-0">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded plant"
                  className="w-full max-w-md mx-auto rounded-lg shadow-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={clearDetection}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {isAnalyzing && (
                <Alert className="max-w-md mx-auto">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                      <span>Analyzing image... This may take a few seconds.</span>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {detectionResult && !isAnalyzing && (
                <Card className="max-w-md mx-auto border-2 border-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span>Detection Result</span>
                      </div>
                      <Badge variant={getSeverityColor(detectionResult.pestName)}>
                        {detectionResult.pestName}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Symptoms Identified:</h4>
                      <p className="text-sm text-muted-foreground">
                        {detectionResult.symptoms}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recommended Treatment:</h4>
                      <p className="text-sm text-muted-foreground">
                        {detectionResult.remedy}
                      </p>
                    </div>
                    <Button className="w-full gradient-fresh text-white border-0">
                      Get Detailed Treatment Plan
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pest Library Search */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-accent" />
            <span>Pest & Disease Library</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            placeholder="Search by pest name or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPests.map((pest) => (
              <Card key={pest.id} className="card-hover group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Bug className="h-5 w-5 text-primary" />
                      <span>{pest.pestName}</span>
                    </CardTitle>
                    <Badge variant={getSeverityColor(pest.pestName)}>
                      {pest.pestName.toLowerCase().includes('blight') || pest.pestName.toLowerCase().includes('rot') 
                        ? 'High Risk' 
                        : pest.pestName.toLowerCase().includes('aphid') || pest.pestName.toLowerCase().includes('whitefly')
                        ? 'Medium Risk'
                        : 'Low Risk'
                      }
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Symptoms:</h4>
                    <p className="text-sm text-muted-foreground">
                      {pest.symptoms}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Treatment:</h4>
                    <p className="text-sm text-muted-foreground">
                      {pest.remedy}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full transition-bouncy group-hover:scale-105"
                  >
                    View Full Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPests.length === 0 && (
            <div className="text-center py-12">
              <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all pests above
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prevention Tips */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Prevention & Best Practices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Regular Monitoring</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Inspect plants weekly for early signs</li>
                <li>• Check undersides of leaves</li>
                <li>• Monitor during high humidity periods</li>
                <li>• Use sticky traps for early detection</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Cultural Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maintain proper plant spacing</li>
                <li>• Ensure good air circulation</li>
                <li>• Practice crop rotation</li>
                <li>• Remove infected plant debris</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Biological Control</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Encourage beneficial insects</li>
                <li>• Use companion planting</li>
                <li>• Apply organic treatments first</li>
                <li>• Maintain soil health</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}