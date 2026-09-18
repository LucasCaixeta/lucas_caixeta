# lucascaixeta.com

Personal site of Lucas Caixeta, technical lead and front-end engineer.

Plain HTML + one CSS file. No framework, no runtime dependencies. Automatic light/dark theme, scroll effects via CSS only.

```bash
npm run dev     # http://localhost:8000
npm run build   # copies to ./dist (what CI deploys to GitHub Pages)
```

- `index.html`: content, SEO meta, JSON-LD
- `style.css`: all styling (design tokens at the top)
- `sw.js`: intentionally tiny: unregisters the old caching service worker from returning visitors. Safe to delete after a few months.

Pushing to `main` deploys via `.github/workflows/deploy.yml`.

MIT licensed.
