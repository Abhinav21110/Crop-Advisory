// Performance monitoring utilities

// TypeScript interfaces for Web Performance APIs
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceMemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceWithMemory extends Performance {
  memory?: PerformanceMemoryInfo;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure function execution time
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    this.recordMetric(name, end - start);
    return result;
  }

  // Measure async function execution time
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    this.recordMetric(name, end - start);
    return result;
  }

  // Record a metric
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  // Get average for a metric
  getAverage(name: string): number {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  // Get all metrics
  getAllMetrics(): Record<string, { average: number; count: number; latest: number }> {
    const result: Record<string, { average: number; count: number; latest: number }> = {};
    
    this.metrics.forEach((values, name) => {
      result[name] = {
        average: this.getAverage(name),
        count: values.length,
        latest: values[values.length - 1] || 0
      };
    });
    
    return result;
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear();
  }

  // Log performance report
  logReport(): void {
    const metrics = this.getAllMetrics();
    console.group('🚀 Performance Report');
    Object.entries(metrics).forEach(([name, data]) => {
      console.log(`${name}: ${data.average.toFixed(2)}ms avg (${data.count} samples)`);
    });
    console.groupEnd();
  }
}

// Web Vitals monitoring
export const measureWebVitals = () => {
  // Check if PerformanceObserver is supported
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Measure Largest Contentful Paint (LCP)
  const measureLCP = () => {
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        if (lastEntry) {
          PerformanceMonitor.getInstance().recordMetric('LCP', lastEntry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP measurement not supported');
    }
  };

  // Measure First Input Delay (FID)
  const measureFID = () => {
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEventTiming) => {
          if (entry.processingStart && entry.startTime) {
            PerformanceMonitor.getInstance().recordMetric('FID', entry.processingStart - entry.startTime);
          }
        });
      }).observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID measurement not supported');
    }
  };

  // Measure Cumulative Layout Shift (CLS)
  const measureCLS = () => {
    try {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: LayoutShift) => {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
          }
        });
        PerformanceMonitor.getInstance().recordMetric('CLS', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS measurement not supported');
    }
  };

  // Initialize measurements
  measureLCP();
  measureFID();
  measureCLS();
};

// Image loading optimization
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch image preloading
export const preloadImages = async (urls: string[]): Promise<void> => {
  const monitor = PerformanceMonitor.getInstance();
  
  await monitor.measureAsyncFunction('preloadImages', async () => {
    const promises = urls.map(url => preloadImage(url));
    await Promise.allSettled(promises);
  });
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memory usage monitoring
export const getMemoryUsage = (): PerformanceMemoryInfo | null => {
  if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as PerformanceWithMemory)) {
    return (window.performance as PerformanceWithMemory).memory || null;
  }
  return null;
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const scripts = Array.from(document.querySelectorAll('script[src]')) as HTMLScriptElement[];
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
    
    console.group('📦 Bundle Analysis');
    console.log(`Scripts loaded: ${scripts.length}`);
    console.log(`Stylesheets loaded: ${styles.length}`);
    
    scripts.forEach((script, index) => {
      if (script.src) {
        console.log(`Script ${index + 1}: ${script.src}`);
      }
    });
    
    styles.forEach((style, index) => {
      if (style.href) {
        console.log(`Stylesheet ${index + 1}: ${style.href}`);
      }
    });
    console.groupEnd();
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') {
    return;
  }

  measureWebVitals();
  
  // Log performance report after page load
  if (document.readyState === 'complete') {
    setTimeout(() => {
      PerformanceMonitor.getInstance().logReport();
      analyzeBundleSize();
    }, 2000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        PerformanceMonitor.getInstance().logReport();
        analyzeBundleSize();
      }, 2000);
    });
  }
};
