import { useState, useRef } from "react";
import { MessageCircle, Send, User, Bot, Volume2, Languages, Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VoiceBot } from "@/components/VoiceBot";
import { useLanguage } from "@/hooks/useLanguage";
import { geminiChatbotService, GeminiChatQuery } from "@/services/geminiChatbotService";
import { LanguageSelector } from "@/components/LanguageSelector";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: string;
  data?: Record<string, unknown>;
  suggestions?: string[];
}

export default function Chatbot() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your CropCare AI assistant powered by Google Gemini 2.5 Pro and real agricultural data. I can provide intelligent recommendations for crops, soil management, pest control, fertilizers, and regional farming guidance. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Recommend crops for my farm",
        "Tell me about soil types",
        "Pest control methods",
        "Fertilizer requirements"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Removed auto-scroll to prevent unwanted scrolling behavior
  // Users can manually scroll to see new messages

  const getBotResponse = async (userInput: string) => {
    try {
      const query: GeminiChatQuery = {
        message: userInput,
        language: language, // Use language from context
        context: {
          location: undefined,
          soilType: undefined,
          season: undefined,
          cropType: undefined
        }
      }; 
      
      const response = await geminiChatbotService.processQuery(query);
      return response;
    } catch (error) {
      console.error('Error getting bot response:', error);
      return {
        text: language === "Hindi" 
          ? "मुझे खेद है, मुझे अभी तकनीकी समस्या का सामना करना पड़ रहा है। कृपया बाद में पुनः प्रयास करें।"
          : "I apologize, but I'm experiencing technical difficulties. Please try again later or ask a simpler question.",
        suggestions: [
          "Try a basic farming question",
          "Ask about crop types",
          "Tell me about soil"
        ]
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // Get real data-driven response
      const botResponse = await getBotResponse(currentInput);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        language: language,
        data: botResponse.data as Record<string, unknown>,
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        language: language
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    setInputMessage(text);
  };

  const playVoiceResponse = (messageText: string) => {
    try {
      // Use browser's speech synthesis to read the response
      const utterance = new SpeechSynthesisUtterance(messageText);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing voice response:', error);
    }
  };

  const quickQuestions = [
    "Recommend crops for my soil conditions",
    "Tell me about different soil types",
    "What are common crop pests and diseases?",
    "Fertilizer requirements for different crops",
    "Seasonal farming calendar",
    "Regional crop recommendations for my state"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading text-foreground mb-4">
          {t('cropCareAIAssistant') || 'CropCare AI Assistant'}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('aiAssistantDescription') || 'Get intelligent AI-powered answers to your farming questions with voice and multilingual support. Powered by Gemini 2.5 Pro with comprehensive agricultural data.'}
        </p>
      </div>

      {/* Voice & Language Controls */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('voiceLanguageControls') || 'Voice & Language Controls'}</span>
            <Badge variant="outline" className="bg-accent/10">
              {t('voiceSupported')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LanguageSelector />
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
            <span>{t('chatWithCropCareAI') || 'Chat with CropCare AI'}</span>
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
                  
                  {/* Bot suggestions */}
                  {message.sender === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2 hover:bg-accent"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
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
              placeholder={t('typeMessage') || 'Type your farming question...'}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
              disabled={isTyping}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isTyping || !inputMessage.trim()}
              className="gradient-primary text-white border-0"
            >
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
              Get assistance in Telugu, Hindi, Punjabi and other Indian languages using AI4BHARAT.
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
              AI-powered responses using Gemini 2.5 Pro with comprehensive agricultural knowledge.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}