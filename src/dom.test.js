import { test } from 'node:test';
import assert from 'node:assert';
import { DOMHelper } from './dom.js';

test('DOMHelper', async (t) => {
  await t.test('setCurrentYear', () => {
    // Create a mock DOM element
    const mockDiv = '<div id="year"></div>';
    assert.ok(typeof DOMHelper.setCurrentYear === 'function', 'setCurrentYear should be a function');
  });

  await t.test('removeLoadingClass', () => {
    assert.ok(typeof DOMHelper.removeLoadingClass === 'function', 'removeLoadingClass should be a function');
  });

  await t.test('setupAccessibility', () => {
    assert.ok(typeof DOMHelper.setupAccessibility === 'function', 'setupAccessibility should be a function');
  });

  await t.test('setupPreventPullToRefresh', () => {
    assert.ok(typeof DOMHelper.setupPreventPullToRefresh === 'function', 'setupPreventPullToRefresh should be a function');
  });

  await t.test('handleOrientationChange', () => {
    assert.ok(typeof DOMHelper.handleOrientationChange === 'function', 'handleOrientationChange should be a function');
  });
});
