# Ramirez Cleaning Services

Bilingual (English/Spanish) landing page for Ramirez Cleaning Services - SEO optimized static site.

## Structure

- `/en/` - English version
- `/es/` - Spanish version
- `/src/` - CSS, JavaScript, and assets
- Root `index.html` - Language redirect page

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output goes to `/dist` directory.

## GitHub Pages Setup

This repository is configured to work with GitHub Pages:

1. **Go to your repository settings** on GitHub
2. Navigate to **Pages** (under Settings)
3. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Click **Save**

The site will be available at: `https://hunterberry640.github.io/Ramirezcleaning/`

### Important Files for GitHub Pages

- `.nojekyll` - Prevents Jekyll processing (required for subdirectories and certain file types)
- The site uses relative paths (`../src/css/styles.css`) which work correctly when served from root

### Custom Domain

If you have a custom domain (e.g., `ramirezcleaningservices.com`):

1. Add a `CNAME` file in the root with your domain name
2. Configure DNS records as per GitHub Pages documentation
3. Update canonical URLs and Open Graph URLs in `/en/index.html` and `/es/index.html`

## Features

- SEO optimized with meta tags, Open Graph, and JSON-LD structured data
- Bilingual support (English/Spanish) with proper hreflang tags
- Mobile-responsive design
- Scroll-reveal animations
- Before/After image slider
- Service area map/list
