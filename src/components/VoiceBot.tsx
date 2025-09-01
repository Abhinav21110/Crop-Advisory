import { useState, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface VoiceBotProps {
  onVoiceInput?: (text: string) => void;
  onVoiceOutput?: (text: string) => void;
}

export function VoiceBot({ onVoiceInput, onVoiceOutput }: VoiceBotProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { language, t } = useLanguage();

  // Check for speech recognition support
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  const startListening = () => {
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Set language based on current selection
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'te': 'te-IN'
    };
    recognition.lang = langMap[language] || 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onVoiceInput?.(text);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language for speech synthesis
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'hi': 'hi-IN', 
      'te': 'te-IN'
    };
    utterance.lang = langMap[language] || 'en-US';
    
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    onVoiceOutput?.(text);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <MicOff className="h-5 w-5" />
            Voice Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your browser doesn't support speech recognition. Please use a modern browser like Chrome or Edge.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="icon"
        onClick={handleVoiceToggle}
        className={`transition-all duration-300 ${
          isListening ? "animate-pulse shadow-glow" : "hover:scale-110"
        }`}
        title={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant={isSpeaking ? "destructive" : "outline"}
        size="icon"
        onClick={isSpeaking ? stopSpeaking : () => speak("Voice output test")}
        className={`transition-all duration-300 ${
          isSpeaking ? "animate-pulse" : "hover:scale-110"
        }`}
        title={isSpeaking ? "Stop speaking" : "Test voice output"}
      >
        {isSpeaking ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>

      {(isListening || isSpeaking) && (
        <Badge 
          variant={isListening ? "destructive" : "default"}
          className="animate-pulse"
        >
          {isListening ? t('listening') : 'Speaking...'}
        </Badge>
      )}
    </div>
  );
}