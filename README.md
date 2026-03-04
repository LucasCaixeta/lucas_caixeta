# Lucas Caixeta - Portfolio Website

A modern, accessible, and performant personal portfolio website showcasing professional work and experience as a Mobile & Web Developer.

## Features

- **Responsive Design**: Works seamlessly across all devices and screen sizes
- **Accessible**: Built with WCAG 2.1 AA accessibility standards in mind
- **Progressive Web App**: Offline access via Service Worker with caching strategy
- **Modern CSS**: Custom CSS using CSS variables and modern features, no framework dependencies
- **Performance Optimized**: Fast load times, optimized images, and efficient code
- **SEO Friendly**: Proper semantic HTML, meta tags, and structured data
- **Keyboard Navigation**: Full keyboard support and ARIA labels
- **Dark Mode**: Native dark mode support with prefers-color-scheme

## Live Demo

Visit the live website: [https://www.lucascaixeta.com](https://www.lucascaixeta.com)

## Project Structure

```
.
├── index.html              # Main HTML entry point
├── assets/
│   ├── css/                # Stylesheets
│   │   ├── main.css       # Base styles
│   │   ├── modern.css     # Modern CSS features and utilities
│   │   └── images/        # CSS background images
│   ├── js/                 # Utility scripts
│   ├── fonts/              # Web fonts
│   └── sass/               # SCSS source files (archived)
├── images/                 # Static images
├── public/                 # Public assets
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
└── package.json            # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18.0+ (for development tools)
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/LucasCaixeta/lucascaixeta.com.git
cd lucascaixeta.com

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Format code
npm run format

# Build for production
npm run build
```

## Build System

The project uses native tools with npm scripts for simplicity and minimal dependencies:

- **Development**: Simple HTTP server for local testing
- **Build**: Asset optimization and bundling
- **Testing**: Native Node.js test runner with custom test utilities

## Accessibility

This website follows WCAG 2.1 Level AA guidelines:
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management
- Color contrast ratios
- Screen reader friendly

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Progressive enhancement ensures basic functionality in older browsers.

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript (ES Modules)
- Service Workers (PWA)
- Google Fonts

## Performance

The website achieves:
- Lighthouse Performance Score: 95+
- First Contentful Paint (FCP): ~1.2s
- Cumulative Layout Shift (CLS): 0.1

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Lucas Caixeta** - Mobile & Web Developer

- GitHub: [@LucasCaixeta](https://github.com/LucasCaixeta)
- LinkedIn: [lucascaixeta](https://www.linkedin.com/in/lucascaixeta)
- Twitter: [@Lucas_Caixeta](https://twitter.com/Lucas_Caixeta)
- Email: [contato@lucascaixeta.com](mailto:contato@lucascaixeta.com)

## Contributing

This is a personal portfolio website, but suggestions and feedback are welcome!

## Changelog

### v2.0.0 (Current)
- Complete modernization of CSS framework
- Removed dependency on third-party skel framework
- Implemented custom CSS with modern features
- Added comprehensive test suite
- Improved accessibility (WCAG 2.1 AA)
- Enhanced SEO and PWA capabilities
- Refactored JavaScript for better maintainability

## Support

For any issues, questions, or suggestions, please check the GitHub repository.
