import React, { Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Layout } from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { initPerformanceMonitoring } from '@/utils/performance';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Advisory = React.lazy(() => import('@/pages/Advisory'));
const SoilHealth = React.lazy(() => import('@/pages/SoilHealth'));
const Weather = React.lazy(() => import('@/pages/Weather'));
const PestDetection = React.lazy(() => import('@/pages/PestDetection'));
const MarketPrices = React.lazy(() => import('@/pages/MarketPrices'));
const Marketplace = React.lazy(() => import('@/pages/Marketplace'));
const Chatbot = React.lazy(() => import('@/pages/Chatbot'));
const Feedback = React.lazy(() => import('@/pages/Feedback'));
const Login = React.lazy(() => import('@/pages/Login'));
const SignUp = React.lazy(() => import('@/pages/SignUp'));
const AccountSettings = React.lazy(() => import('@/pages/AccountSettings'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

// Create a query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="cropcare-theme">
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <HashRouter>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    
                    {/* Protected routes */}
                    <Route path="/" element={
                      <ProtectedRoute>
                        <Layout>
                          <Dashboard />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/advisory" element={
                      <ProtectedRoute>
                        <Layout>
                          <Advisory />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/soil" element={
                      <ProtectedRoute>
                        <Layout>
                          <SoilHealth />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/weather" element={
                      <ProtectedRoute>
                        <Layout>
                          <Weather />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/pests" element={
                      <ProtectedRoute>
                        <Layout>
                          <PestDetection />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/market" element={
                      <ProtectedRoute>
                        <Layout>
                          <MarketPrices />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/marketplace" element={
                      <ProtectedRoute>
                        <Layout>
                          <Marketplace />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/chat" element={
                      <ProtectedRoute>
                        <Layout>
                          <Chatbot />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/feedback" element={
                      <ProtectedRoute>
                        <Layout>
                          <Feedback />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Layout>
                          <AccountSettings />
                        </Layout>
                      </ProtectedRoute>
                    } />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </HashRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
