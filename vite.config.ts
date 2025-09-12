import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-slot', '@radix-ui/react-toast'],
          'animation-vendor': ['gsap'],
          'routing-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          
          // Feature chunks
          'marketplace': [
            './src/pages/Marketplace.tsx',
            './src/components/marketplace/ProductCard.tsx',
            './src/components/marketplace/CategoryFilter.tsx',
            './src/data/marketplaceData.ts'
          ],
          'auth': [
            './src/pages/Login.tsx',
            './src/pages/SignUp.tsx',
            './src/components/AccountSettings.tsx',
            './src/contexts/AuthContext.tsx'
          ]
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification with esbuild (default and faster than terser)
    minify: 'esbuild',
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable asset inlining for small files
    assetsInlineLimit: 4096
  },
  // Optimize dev server
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  // Enable dependency pre-bundling optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'gsap',
      'lucide-react',
      '@tanstack/react-query'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  // Enable CSS optimization
  css: {
    devSourcemap: false
  },
  // Use env-driven base so we can deploy to both Vercel ("/") and GH Pages ("/REPO/")
  base: process.env.VITE_BASE ?? "/",
});
