# Calm Collection

check https://github.com/shahid-laskar/design-system-core.git 
 Using the existing approved design system, build the main shopping/collection experience at /collection.

    Do NOT redesign the theme, colors, typography, or existing components.
    Reuse the canonical tokens, PageContainer, Eyebrow, SectionHeading, and ProductCard components.

    OBJECTIVE

    Make shopping calm, intentional, and efficient.

    The visitor should be able to:
    - Understand the collection through a concise editorial introduction
    - Scan products quickly across Home & Prayer, Little Ones, Modest Essentials, and Bundles
    - Filter by category and sort by price/featured
    - Access filter controls easily on mobile via a slide-out drawer
    - Reach product cards without marketplace visual clutter

    STRUCTURE

    1. Collection introduction & category tabs (All, Home & Prayer, Little Ones, Modest Essentials, Bundles)
    2. Product count and sorting dropdown
    3. Filter controls (Category, Material, Price tier)
    4. Responsive product grid (2 columns on mobile, 3–4 columns on desktop)
    5. Mobile filter drawer using the existing Sheet primitive
    6. Empty filter state using the StatusState component
    7. Refined pagination or "Load more" control
    8. Update the header navigation in SiteShell so "The collection" links to /collection

    PRODUCT CARD

    Reuse the existing ProductCard component (@/components/brand/product-card).
    Show:
    - High-quality product image
    - Category eyebrow
    - Product name
    - Short material / variant descriptor
    - Price (and previous price where relevant)
    - Save / quick-action button

    Avoid:
    - Giant promotional sale badges
    - Excessive metadata or countdown timers
    - Marketplace-like density

    TECHNICAL CONSTRAINTS

    - Build the route as /collection (or src/routes/collection.tsx).
    - Do not add backend APIs or custom databases; use realistic mock product data.
    - Ensure 0 TypeScript or lint errors.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1036e410-8d52-4731-8ee0-678ebccf6ce2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
