import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Advisory from "./pages/Advisory";
import SoilHealth from "./pages/SoilHealth";
import Weather from "./pages/Weather";
import PestDetection from "./pages/PestDetection";
import MarketPrices from "./pages/MarketPrices";
import Chatbot from "./pages/Chatbot";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="cropcare-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/advisory" element={<Advisory />} />
                <Route path="/soil" element={<SoilHealth />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/pests" element={<PestDetection />} />
                <Route path="/market" element={<MarketPrices />} />
                <Route path="/chat" element={<Chatbot />} />
                <Route path="/feedback" element={<Feedback />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
