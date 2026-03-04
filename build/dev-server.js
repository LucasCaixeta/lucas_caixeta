#!/usr/bin/env node

/**
 * Development server for local testing
 * Serves the portfolio locally with live reload capabilities
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8000;
const ROOT = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Default to index.html for root
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Construct the file path
  let filePath = path.join(ROOT, pathname);

  // Prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // Try to read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 404 Not Found
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>404 Not Found</title>
            <style>
              body { font-family: sans-serif; text-align: center; padding: 50px; }
              h1 { color: #333; }
              p { color: #666; }
              a { color: #0066ff; }
            </style>
          </head>
          <body>
            <h1>404</h1>
            <p>The page you requested could not be found.</p>
            <p><a href="/">Go back home</a></p>
          </body>
        </html>
      `);
      return;
    }

    // Set the content type
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    
    // Add CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Add cache headers
    if (['js', 'css', 'svg', 'woff', 'woff2', 'ttf', 'otf'].includes(ext.slice(1))) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }

    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
  🚀 Development Server Running!
  
  Open your browser at: http://localhost:${PORT}
  
  Press Ctrl+C to stop the server
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
