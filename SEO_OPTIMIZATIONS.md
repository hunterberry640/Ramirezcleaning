# SEO Optimizations — Ramirez Cleaning and Detailing Service

Targeting the Dallas-Fort Worth (DFW) area for local search rankings. All changes applied to both English (`/en/`) and Spanish (`/es/`) pages.

---

## 1. robots.txt + sitemap.xml

- Created `robots.txt` at the project root to allow all crawlers and point to the sitemap.
- Created `sitemap.xml` with both `/en/` and `/es/` URLs, including `hreflang` cross-references and `x-default` for proper multilingual indexing.

## 2. DFW-Targeted Meta Tags

- **Title tags** updated to include "House Cleaning & Maid Service in Dallas-Fort Worth, TX" (EN) and "Limpieza de Casas y Servicio de Limpieza en Dallas-Fort Worth, TX" (ES).
- **Meta descriptions** rewritten to include "Dallas-Fort Worth", "DFW", "house cleaning", "maid service", and the specific cities served.
- **Open Graph title/description** updated to mirror the same DFW-targeted language for social sharing.

## 3. Enhanced JSON-LD Structured Data

Added to the existing `CleaningService` schema on both pages:

- **`areaServed`** — 6 City objects: Dallas, Fort Worth, Plano, Frisco, Irving, Lewisville (with Wikipedia `sameAs` links).
- **`geo`** — `GeoCoordinates` (latitude/longitude) for the business address in Dallas.
- **`image`** — Business logo URL for brand recognition in search results.
- **`hasOfferCatalog`** — 4 services (Regular House Cleaning, Deep Cleaning, Move-In/Out, Commercial) with DFW-targeted descriptions.
- **`review`** — Both real customer reviews (Kennedy T. and Kenton A.) as structured `Review` objects with 5-star ratings, enabling star-rating rich results in Google.

## 4. DFW Keywords in Page Content

Naturally integrated high-search-volume terms throughout the page:

- **Hero label**: "Professional House Cleaning & Maid Service in DFW"
- **Hero subtitle**: "Trusted house cleaning and maid service in Dallas-Fort Worth"
- **Services subtitle**: Mentions "house cleaning" and "Dallas-Fort Worth metroplex"
- **CTA banner**: "Get a free quote for house cleaning or maid service anywhere in Dallas-Fort Worth"
- **Footer brand description**: "proudly serving the Dallas-Fort Worth area"

Keywords added: "house cleaning", "maid service", "Dallas-Fort Worth", "DFW", "North Texas", "metroplex".

## 5. Twitter Card + og:locale Meta Tags

- Added `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` meta tags for rich link previews on Twitter/X.
- Added `og:locale` (en_US / es_MX) and `og:locale:alternate` tags for proper multilingual social sharing signals.

## 6. Expanded Service Area Section

Replaced the simple 6-city list with keyword-rich area cards. Each city now has a descriptive paragraph pairing the city name with service keywords:

- **Dallas** — "House cleaning and maid service in Dallas, including Oak Cliff, Uptown, Deep Ellum..."
- **Fort Worth** — "Professional cleaning service in Fort Worth — residential and commercial..."
- **Plano** — "Reliable house cleaning in Plano, TX. Regular cleanings, deep cleans..."
- **Frisco** — "Trusted maid service in Frisco and nearby communities..."
- **Irving** — "Quality cleaning service in Irving, TX — homes, apartments, and offices..."
- **Lewisville** — "Serving Lewisville with professional house cleaning and detail-oriented maid service."

This creates keyword-rich content that Google associates with each specific location.

## 7. Local SEO Image Alt Text

Updated key images (not all gallery images) with location-specific alt text:

- **Logo**: "Ramirez Cleaning and Detailing Service - House Cleaning in Dallas-Fort Worth TX"
- **Before/after bathroom**: Includes "Dallas TX house cleaning service"
- **Before/after kitchen**: Includes "DFW maid service"
- **Before/after sink**: Includes "Dallas-Fort Worth cleaning service"

---

## Files Modified

| File | Changes |
|------|---------|
| `robots.txt` | Created — crawler directives + sitemap reference |
| `sitemap.xml` | Created — bilingual URL index with hreflang |
| `en/index.html` | Meta tags, JSON-LD, content keywords, Twitter cards, og:locale, service area, alt text |
| `es/index.html` | Same as above, Spanish equivalents |
| `src/css/styles.css` | Added `.area-card` styles for expanded service area section |
