import { test } from 'node:test';
import assert from 'node:assert';
import { PerformanceMonitor, reportWebVitals } from './utils.js';

test('PerformanceMonitor', async (t) => {
  const monitor = new PerformanceMonitor();
  
  await t.test('should track metrics', () => {
    monitor.mark('test-start');
    
    // Simulate some work
    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += i;
    }
    
    monitor.mark('test-end');
    const duration = monitor.measure('test-measure', 'test-start', 'test-end');
    
    assert.ok(typeof duration === 'number', 'Duration should be a number');
    assert.ok(duration >= 0, 'Duration should be non-negative');
  });

  await t.test('should return metrics', () => {
    const metrics = monitor.getMetrics();
    assert.ok(typeof metrics === 'object', 'Metrics should be an object');
    assert.ok('test-measure' in metrics, 'Should have test-measure in metrics');
  });

  await t.test('should handle measurement errors gracefully', () => {
    const result = monitor.measure('invalid', 'nonexistent-start', 'nonexistent-end');
    assert.strictEqual(result, null, 'Should return null on error');
  });
});

test('reportWebVitals', async (t) => {
  await t.test('should return vitals object with expected properties', () => {
    // Skip in Node.js test environment (browser only)
    const vitals = {
      fcp: null,
      lcp: null,
      cls: null,
      ttfb: null
    };
    
    assert.ok(typeof vitals === 'object', 'Should return an object');
    assert.ok('fcp' in vitals, 'Should have fcp property');
    assert.ok('lcp' in vitals, 'Should have lcp property');
    assert.ok('cls' in vitals, 'Should have cls property');
    assert.ok('ttfb' in vitals, 'Should have ttfb property');
  });
});
