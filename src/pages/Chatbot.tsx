import { useState, useRef } from "react";
import { MessageCircle, Send, User, Bot, Volume2, Languages, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chatbotResponses, voiceResponses } from "@/data/sampleData";
import { VoiceBot } from "@/components/VoiceBot";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: string;
}

export default function Chatbot() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your CropCare assistant. I can help you with farming questions, crop advice, pest management, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Hindi", "Marathi", "Telugu", "Tamil", "Gujarati"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Removed auto-scroll to prevent unwanted scrolling behavior
  // Users can manually scroll to see new messages

  const findBotResponse = (userInput: string, language: string) => {
    // Find matching response from sample data
    const response = chatbotResponses.find(
      r => r.language === language && 
      (userInput.toLowerCase().includes(r.userInput.toLowerCase()) || 
       r.userInput.toLowerCase().includes(userInput.toLowerCase()))
    );
    
    if (response) return response.botResponse;
    
    // Fallback responses based on keywords
    if (userInput.toLowerCase().includes('weather')) {
      return "Based on current weather data, I recommend monitoring humidity levels and preparing for potential rainfall. Check the weather section for detailed forecasts.";
    }
    if (userInput.toLowerCase().includes('soil')) {
      return "For soil health, I suggest regular pH testing and nutrient analysis. Our soil health monitor can provide detailed recommendations for your specific field conditions.";
    }
    if (userInput.toLowerCase().includes('pest') || userInput.toLowerCase().includes('disease')) {
      return "For pest and disease management, early detection is key. Use our pest detection feature to identify issues and get treatment recommendations.";
    }
    if (userInput.toLowerCase().includes('market') || userInput.toLowerCase().includes('price')) {
      return "Current market prices are available in our market section. I can help you track price trends and find the best selling opportunities.";
    }
    
    // Default response
    return language === "Hindi" 
      ? "मैं आपकी मदद करने के लिए यहाँ हूँ। कृपया अपना प्रश्न और विस्तार से बताएं।"
      : "I'm here to help you with your farming questions. Could you please provide more details about what you'd like to know?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = findBotResponse(inputMessage, selectedLanguage);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleVoiceInput = (text: string) => {
    setInputMessage(text);
  };

  const playVoiceResponse = (messageText: string) => {
    // Find matching voice response
    const voiceResponse = voiceResponses.find(
      r => messageText.toLowerCase().includes(r.command)
    );
    
    if (voiceResponse) {
      // In a real app, this would play the actual audio
      console.log("Playing voice response:", voiceResponse.response);
      // Simulate audio playback
      const utterance = new SpeechSynthesisUtterance(messageText);
      speechSynthesis.speak(utterance);
    }
  };

  const quickQuestions = [
    "What crops should I plant this season?",
    "How do I test my soil?",
    "What are today's market prices?",
    "How to control pests naturally?",
    "When should I irrigate my crops?",
    "Weather forecast for farming"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          CropCare {t('chatbot')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get instant answers to your farming questions with voice and multilingual support. 
          Ask about crops, soil, weather, pests, and market prices.
        </p>
      </div>

      {/* Voice & Language Controls */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Voice & Language Controls</span>
            <Badge variant="outline" className="bg-accent/10">
              {t('voiceSupported')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <VoiceBot 
              onVoiceInput={handleVoiceInput}
              onVoiceOutput={(text) => console.log('Voice output:', text)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-accent" />
            <span>Chat with CropCare AI</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="h-96 overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground'
                  }>
                    {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.sender === 'bot' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => playVoiceResponse(message.text)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border shadow-sm p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder={`Type your farming question in ${selectedLanguage}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="gradient-primary text-white border-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Quick Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left h-auto p-3 transition-bouncy hover:scale-105"
                onClick={() => setInputMessage(question)}
              >
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover text-center">
          <CardContent className="p-6">
            <Languages className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Multilingual Support</h3>
            <p className="text-sm text-muted-foreground">
              Get assistance in your preferred local language for better understanding.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover text-center">
          <CardContent className="p-6">
            <Mic className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Voice Commands</h3>
            <p className="text-sm text-muted-foreground">
              Ask questions using voice input and get audio responses back.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover text-center">
          <CardContent className="p-6">
            <Bot className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Responses</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered answers based on your location, crop, and season data.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}