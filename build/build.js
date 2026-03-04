#!/usr/bin/env node

/**
 * Build script for production
 * Optimizes assets and prepares files for deployment
 */

import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

console.log('🔨 Building for production...\n');

// Create dist directory
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
fs.mkdirSync(DIST, { recursive: true });

// Copy files to dist
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ ${path.relative(ROOT, destPath)}`);
    }
  });
}

// Copy necessary files
const filesToCopy = ['index.html', 'manifest.json', 'sw.js', 'CNAME', '.well-known'];
const dirsToCopy = ['assets', 'images', 'public'];

filesToCopy.forEach(file => {
  const src = path.join(ROOT, file);
  const dest = path.join(DIST, file);

  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
      console.log(`✓ ${path.relative(ROOT, dest)}`);
    }
  }
});

dirsToCopy.forEach(dir => {
  const src = path.join(ROOT, dir);
  const dest = path.join(DIST, dir);

  if (fs.existsSync(src)) {
    copyDir(src, dest);
  }
});

console.log('\n✅ Build complete! Files ready in ./dist\n');
console.log('📊 Build Summary:');
console.log(`   Output: ${path.relative(ROOT, DIST)}`);
console.log('   Ready for deployment to GitHub Pages or any static host\n');
