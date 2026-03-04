/**
 * DOM and UI utilities for the portfolio
 */

export class DOMHelper {
  static setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  static removeLoadingClass() {
    document.body.classList.remove('loading');
  }

  static setupAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  static setupPreventPullToRefresh() {
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      // Prevent pull-to-refresh on iOS
      if (deltaY < 0 && window.scrollY === 0) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  static handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
      window.scrollTo(0, 0);
    });
  }
}

export function initializePortfolio() {
  DOMHelper.setCurrentYear();
  DOMHelper.setupAccessibility();
  DOMHelper.setupPreventPullToRefresh();
  DOMHelper.handleOrientationChange();
  
  // Wait for full load to remove loading state
  window.addEventListener('load', () => {
    DOMHelper.removeLoadingClass();
  });
}
