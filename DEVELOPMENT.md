# Development Guide

This document provides detailed information for developers working on the Lucas Caixeta portfolio website.

## Project Overview

This is a modern, accessible, and performant personal portfolio website built with vanilla JavaScript, CSS3, and progressive enhancement principles.

### Key Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Accessibility (WCAG 2.1 AA)**: Full keyboard support, ARIA labels, semantic HTML
- **PWA Capabilities**: Service Worker caching, offline support, installable
- **Performance Optimized**: Fast load times, efficient CSS, minimal JavaScript
- **No Frameworks**: Pure HTML, CSS, and vanilla JavaScript for maximum control and performance
- **SEO Ready**: Semantic HTML, meta tags, Open Graph, structured data

## Architecture

### Directory Structure

```
src/                    # Source JavaScript files
├── utils.js           # Performance monitoring utilities
├── dom.js             # DOM manipulation and UI utilities
├── utils.test.js      # Unit tests for utils
└── dom.test.js        # Unit tests for DOM utilities

build/                 # Build scripts
├── dev-server.js     # Local development server
└── build.js          # Production build script

assets/               # Static assets
├── css/              # Stylesheets
│   ├── main.css     # Base styles and layout
│   ├── modern.css   # Modern CSS features and utilities
│   └── images/      # CSS background images
├── fonts/           # Web fonts
├── js/              # Frontend JavaScript
└── sass/            # SCSS source (archived)

images/              # Static images
public/              # Public assets
dist/                # Production build output
```

### CSS Architecture

The CSS is organized into two main files:

1. **main.css**: Contains all base styles, layout, typography, responsive design
2. **modern.css**: Contains modern CSS features, animations, utilities, accessibility features

#### CSS Variables

Core design tokens are defined as CSS custom properties:

```css
--primary-color: #348cb2;
--text-color: #ffffff;
--bg-color: #0a0e27;
--spacing-unit: 1rem;
--font-family: 'Source Sans Pro', sans-serif;
```

These variables are located in `:root` and can be overridden for themes or responsive design.

### JavaScript Architecture

#### utils.js
Provides performance monitoring and web vitals tracking:
- `PerformanceMonitor` class: Performance metrics collection
- `reportWebVitals()`: Web Vitals API integration

#### dom.js
Provides DOM manipulation and UI initialization:
- `DOMHelper` class: Static methods for DOM operations
- `initializePortfolio()`: Initialization function

### Service Worker Strategy

The Service Worker implements a hybrid caching strategy:

**Cache-First (for assets)**:
- CSS, JavaScript, fonts, images
- Faster loading, background updates

**Network-First (for HTML)**:
- Main documents and HTML
- Always fetch fresh content when possible

**Offline Fallback**:
- Cached HTML page or generic offline message
- Graceful degradation

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Navigate to http://localhost:8000
```

### Development

```bash
# Start in watch mode
npm run dev

# In another terminal, run tests
npm run test:watch

# Format code
npm run format

# Run linter (if ESLint is installed)
npm run lint
```

### Testing

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch
```

Tests use Node.js native test runner and are located in `src/*.test.js` files.

### Code Style

The project uses:
- **Prettier** for code formatting
- **ESLint** for linting
- Configuration in `.prettierrc` and `.eslintrc.json`

Key style rules:
- 2-space indentation
- Single quotes
- Semicolons required
- Line length: 100 characters

### Building for Production

```bash
npm run build
```

This creates an optimized `dist/` directory ready for deployment.

## Performance Optimization

### Strategies Implemented

1. **CSS Optimization**:
   - Removed unused skel framework code
   - CSS custom properties for simple theming
   - Media queries for responsive design
   - GPU-accelerated animations

2. **JavaScript**:
   - Minimal inline scripts in HTML
   - Deferred loading where possible
   - Event delegation
   - No external dependencies

3. **Service Worker**:
   - Aggressive caching strategies
   - Background cache updates
   - Offline support

4. **Resource Loading**:
   - Font preconnect and async loading
   - Image optimization
   - DNS prefetch for external resources

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

1. **Semantic HTML**:
   - Proper use of header, main, footer
   - Semantic link elements
   - Correct heading hierarchy

2. **Keyboard Navigation**:
   - Tab order follows visual order
   - Visible focus indicators
   - Skip links where appropriate

3. **Screen Reader Support**:
   - ARIA labels on interactive elements
   - Alternative text for images
   - Proper role attributes

4. **Color and Contrast**:
   - Sufficient color contrast (7:1 ratio)
   - No color-only information
   - Supports high contrast mode

5. **Motion**:
   - Respects prefers-reduced-motion
   - No disruptive animations
   - Graceful degradation

## Deployment

### GitHub Pages

The website is deployed to GitHub Pages. After building:

```bash
npm run build
git add dist/
git commit -m "chore: Update build"
git push origin main
```

GitHub Pages will automatically deploy the contents of the `dist/` directory.

### Custom Domain

CNAME file is configured for `www.lucascaixeta.com`.

## Browser Support

### Modern Browsers (Full Support)
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Graceful Degradation
- IE 11: Basic functionality (no PWA/Service Worker)
- Older versions: HTML fallback

## Maintenance

### Regular Checks

1. **Performance**: Use Lighthouse for periodic audits
2. **Accessibility**: Use Axe DevTools for compliance checks
3. **Security**: Keep dependencies updated
4. **Links**: Verify external links are still active

### Updating Dependencies

The project has minimal dependencies. When needed:

```bash
npm update
npm audit fix
```

## Debugging

### Development Server

The development server includes:
- Live file serving
- CORS headers for testing
- Proper MIME types
- 404 handling

### Service Worker Debugging

Chrome DevTools:
- Application tab > Service Workers
- Cache Storage to inspect cached assets
- Network tab to see Cache-only requests

### Performance Debugging

```javascript
// Check performance metrics
console.log(performance.getEntriesByType('navigation'));
console.log(performance.getEntriesByType('paint'));
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - See [LICENSE](./LICENSE) for details.

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include browser/environment details

---

Last Updated: March 4, 2024
Project Version: 2.0.0
