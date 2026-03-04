/**
 * Performance utilities and observers
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }

  mark(name) {
    performance.mark(name);
  }

  measure(name, startMark, endMark) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      this.metrics[name] = measure.duration;
      return measure.duration;
    } catch (error) {
      console.warn(`Failed to measure ${name}:`, error);
      return null;
    }
  }

  getMetrics() {
    return this.metrics;
  }

  logWebVitals() {
    if ('PerformanceObserver' in window) {
      try {
        // Observe long tasks
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('Long task:', entry.duration);
          }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.log('Long tasks not supported');
      }
    }
  }
}

export function reportWebVitals() {
  const vitals = {
    fcp: null,
    lcp: null,
    cls: null,
    ttfb: null
  };

  // Track First Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.fcp = lastEntry.startTime;
      });
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.log('Paint timing not available');
    }
  }

  return vitals;
}
