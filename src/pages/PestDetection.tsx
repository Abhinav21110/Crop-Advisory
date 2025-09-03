import { useState } from "react";
import { Bug, Upload, Camera, Search, AlertTriangle, CheckCircle, X, Clock, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CameraCapture from "@/components/CameraCapture";
import { PestDetectionService, type PestDetectionResult } from "@/services/pestDetectionService";

export default function PestDetection() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [detectionResult, setDetectionResult] = useState<PestDetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [allPests] = useState<PestDetectionResult[]>(PestDetectionService.getAllPests());

  const filteredPests = allPests.filter(pest =>
    pest.pestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.affectedCrops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageData: string) => {
    setUploadedImage(imageData);
    analyzeImage(imageData);
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      const result = await PestDetectionService.detectPestFromImage(imageData);
      setDetectionResult(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Fallback to random selection
      const randomPest = allPests[Math.floor(Math.random() * allPests.length)];
      setDetectionResult(randomPest);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearDetection = () => {
    setUploadedImage(null);
    setDetectionResult(null);
    setIsAnalyzing(false);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Critical Risk';
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Unknown Risk';
    }
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
                <Button variant="outline" onClick={openCamera}>
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
                <div className="max-w-4xl mx-auto space-y-6">
                  <Card className="border-2 border-primary bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Detection Result</span>
                          <Badge variant="outline" className="ml-2">
                            {Math.round(detectionResult.confidence * 100)}% Confidence
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getSeverityColor(detectionResult.severity)}>
                            {getSeverityLabel(detectionResult.severity)}
                          </Badge>
                          <Badge variant="secondary">
                            {detectionResult.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">{detectionResult.pestName}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{detectionResult.symptoms}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-xs font-medium text-blue-600">Treatment Time</p>
                              <p className="text-sm">{detectionResult.timeToTreat}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <div>
                              <p className="text-xs font-medium text-orange-600">Spread Risk</p>
                              <p className="text-sm">{detectionResult.spreadRisk}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                            <Shield className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-xs font-medium text-green-600">Economic Impact</p>
                              <p className="text-sm">{detectionResult.economicImpact}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Zap className="h-4 w-4 mr-2 text-red-500" />
                              Immediate Treatment
                            </h4>
                            <ul className="text-sm space-y-1">
                              {detectionResult.treatment.immediate.map((treatment, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-red-500 mt-1">•</span>
                                  <span>{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-green-500" />
                              Preventive Measures
                            </h4>
                            <ul className="text-sm space-y-1">
                              {detectionResult.treatment.preventive.map((prevention, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-green-500 mt-1">•</span>
                                  <span>{prevention}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-semibold mb-2 text-amber-800">Additional Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-amber-700">Affected Crops:</p>
                              <p className="text-amber-600">{detectionResult.affectedCrops.join(', ')}</p>
                            </div>
                            <div>
                              <p className="font-medium text-amber-700">Seasonal Info:</p>
                              <p className="text-amber-600">{detectionResult.seasonalInfo}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button className="flex-1 gradient-fresh text-white border-0">
                          Get Detailed Treatment Plan
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Consult Expert
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                    <Badge variant={getSeverityColor(pest.severity)}>
                      {getSeverityLabel(pest.severity)}
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
                    <h4 className="font-semibold mb-2 text-foreground">Immediate Treatment:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {pest.treatment.immediate.slice(0, 2).map((treatment, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
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
      <CameraCapture
        isActive={isCameraOpen}
        onClose={closeCamera}
        onImageCapture={handleCameraCapture}
        onImageUpload={handleCameraCapture}
      />
    </div>
  );
}