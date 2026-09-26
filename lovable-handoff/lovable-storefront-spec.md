# Sukoon House — Storefront Implementation Specification for Lovable

> **Status:** Production Specification & Commerce Handoff  
> **Source of Truth:** `/opt/lifestyle-web/PROJECT_MASTER.md` & Local Medusa.js v2 Store API  
> **Target Audience:** Lovable Frontend Development & Engineering Teams  
> **Version:** 1.0 (India Launch)

---

## 1. Product & Brand Context

### 1.1 Brand Positioning
**Sukoon House** (`سكون` — *peace, tranquility, serenity*) is a curated online retail destination tailored for modern Muslim households in India. It offers high-quality, reasonably priced ethnic apparel (salwar suits, kurtas, abayas, children's ethnic wear), prayer essentials, family learning resources, and tasteful lifestyle goods in a unified, trustworthy store.

The brand directly solves the chronic market problems of:
- Extreme market fragmentation across chaotic Instagram sellers, WhatsApp groups, and unstructured local bazaars.
- Unreliable fabric quality and fit anxiety for modest apparel.
- Compromised modesty (transparent sheer fabrics, low necklines, short sleeves, absence of inner linings).
- High markups on genuine prayer goods and children's Islamic books.

### 1.2 Target Customer
The primary customer is the **educated Muslim homemaker/mother** (aged 24–44) residing in Tier 1 and Tier 2 Indian cities (household income ₹40,000–₹1,80,000/month). She coordinates family purchasing: modest clothing for herself, festive and Jummah wear for her husband, coordinated festival sets for children, daily prayer essentials, and gifts for family milestones.

### 1.3 Value Proposition & Core Guarantees
1. **Curated Quality over Market Chaos:** Hand-vetted textiles, durable high-density memory foam, authentic editorial content.
2. **Modesty Guarantee:** 100% non-transparent fabrics, opaque attached cotton voil linings across the torso, modest high necklines, and 2-inch generous inner tailoring margins for easy alteration.
3. **Convenience & Trust:** Multi-category family checkout, transparent pricing, 24–48 hour dispatch, automated WhatsApp order tracking, and a 7-day doorstep size exchange guarantee.

### 1.4 Commercial & Pricing Model ("Accessible Quality" / Masstige)
- **Individual Products:** ₹249 – ₹1,899.
- **Curated Gift Sets / Hampers:** ₹1,999 – ₹3,499.
- **Shipping Rule:** **Free Shipping** on orders **≥ ₹999**. Flat **₹70** shipping fee on orders below ₹999.
- **Payment Mix:** ~65% Prepaid (Razorpay: UPI, cards, netbanking) / ~35% COD (Cash on Delivery with automated phone confirmation).
- **Cluster Sourcing:** Surat (apparel & fabrics), Delhi-NCR (ethnic wear & tarbiyah boards), Jaipur/Ahmedabad (block prints), Panipat (20mm memory foam mats), Saharanpur (bentwood rehals), Moradabad (brass and metal art).
- **Launch Asset:** The founder's wife's existing salwar suit inventory deployed as Tier 1 stock (zero initial apparel procurement cash burn).

### 1.5 The Seven Core Family Pillars
1. **Women's Ethnic & Modest** (`women`): 3-piece cambric cotton & chanderi salwar suit sets, kurtas, modest dresses, hijabs.
2. **Men's Apparel** (`men`): Handloom cotton kurtas, kurta-pajama, pathani sets, kufi prayer caps.
3. **Children & Tarbiyah** (`children`): Boys' & girls' ethnic sets, Salah habit boards, Arabic flashcards, storybooks.
4. **Prayer & Worship** (`prayer`): 20mm orthopedic memory foam mats, pocket travel musallas, bentwood rehals, stone tasbihs.
5. **Learning & Books** (`learning`): Dua decks, Hadith cards, interactive Islamic children's books.
6. **Home & Ambiance** (`home`): Brass bakhoor burners, botanical attars (12ml), Islamic metal wall art, Ramadan countdowns.
7. **Milestone Gifts** (`gifts`): Serene Sanctuary sets, Eid family hampers, Nikah & housewarming gift boxes.

---

## 2. Visual Design System: "Warm Indian Jewel"

The visual language balances warmth, spiritual serenity, festive joy, and contemporary refinement. It deliberately avoids both chaotic discount marketplace aesthetics and cold luxury minimalism.

### 2.1 Color Palette & Tokens (CSS Variables)

```css
/* Base Canvas & Typography */
--color-warm-ivory: oklch(0.975 0.015 85);       /* #FBF8F3 - Main page background */
--color-blush-cream: oklch(0.95 0.02 75);        /* Secondary surface / card background */
--color-charcoal-ink: oklch(0.22 0.02 260);      /* #1F2429 - Deep primary text */
--color-muted-foreground: oklch(0.48 0.02 260);  /* Subtitles, meta info, breadcrumbs */

/* Brand Primaries */
--color-emerald: oklch(0.38 0.12 155);           /* #13583C - Primary CTA, badges, links */
--color-emerald-foreground: oklch(0.99 0 0);     /* White text on emerald */
--color-teal: oklch(0.44 0.11 205);              /* #1B6578 - Secondary buttons & badges */
--color-teal-foreground: oklch(0.99 0 0);

/* Accent Highlights */
--color-mango: oklch(0.78 0.16 75);              /* #E58D23 - Ratings, sale tags, highlights */
--color-berry: oklch(0.48 0.18 350);             /* #8B224E - Festive accents */
--color-coral: oklch(0.68 0.15 40);              /* #D86B4D - Warm alerts, free ship bar */
--color-blush: oklch(0.88 0.05 350);             /* Soft pink chip / hover tint */

/* Category Pillar Semantic Accents */
--color-pillar-women-accent: var(--color-berry);      /* Berry / Coral */
--color-pillar-men-accent: var(--color-teal);          /* Peacock Teal / Indigo */
--color-pillar-children-accent: var(--color-mango);    /* Mango / Turquoise */
--color-pillar-prayer-accent: var(--color-emerald);    /* Deep Emerald / Sage */
--color-pillar-learning-accent: oklch(0.72 0.14 70);   /* Marigold / Amber */
--color-pillar-home-accent: oklch(0.42 0.08 140);      /* Forest / Olive */
--color-pillar-gifts-accent: var(--color-coral);       /* Coral / Gold */
```

### 2.2 Typography
- **Headings & Display:** `Newsreader`, serif, `font-normal` or `font-medium`, tracking `-0.02em`. Used for editorial titles, product names on PDP, and hero headings.
- **Body & UI Controls:** `Manrope`, sans-serif, `font-medium` (400, 500, 600, 700). Used for navigation, prices, buttons, filters, product card titles, and forms.
- **Eyebrows & Labels:** `font-sans`, uppercase, `text-xs`, `tracking-[0.16em]`, `font-semibold`.

### 2.3 Radii, Borders, and Elevations
- **Corners:** Rounded cards (`rounded-2xl` / 16px), buttons (`rounded-full` or `rounded-xl`), inputs (`rounded-lg`).
- **Borders:** Subtle `border border-charcoal-ink/10` or `border-border`.
- **Shadows:** Soft diffuse shadows `shadow-sm` on rest, elevating to `shadow-md` or `shadow-lg` on card hover. Avoid stark black dropshadows.

---

## 3. Global Site Shell

```
┌────────────────────────────────────────────────────────────────────────┐
│  Announcement Bar: "Free Nationwide Delivery on Orders Above ₹999"      │
├────────────────────────────────────────────────────────────────────────┤
│  [Logo: SUKOON HOUSE]   [Search Bar]   [Account]  [Wishlist]  [Cart(2)]│
├────────────────────────────────────────────────────────────────────────┤
│  Women | Men | Children | Prayer & Worship | Learning | Home | Gifts   │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Announcement Bar
- **Content:** Rotating announcements:
  1. *"Free Nationwide Delivery on Orders Above ₹999 · ₹70 Flat Below"*
  2. *"Modesty Assured: 100% Opaque Fabrics with Attached Linings"*
  3. *"7-Day Doorstep Size Exchange Across India"*
- **Styling:** Emerald background (`bg-primary text-primary-foreground`), centered text, `text-xs font-medium py-2 px-4`.

### 3.2 Main Header (Sticky)
- **Left:** Mobile hamburger trigger (hidden on desktop `lg:hidden`), Brand Wordmark ("SUKOON HOUSE" in Newsreader serif with modest crescent emblem or clean typography).
- **Center:** Desktop search bar with instant autocomplete overlay and category drop-in.
- **Right:**
  - Pincode check / Delivery city chip (e.g., "Deliver to: Mumbai 400001").
  - Account icon / link (`/account`).
  - Wishlist icon with count pill.
  - Cart button with quantity badge (`bg-primary text-white rounded-full text-xs`). Clicking opens the Slide-out Cart Drawer.
- **Behavior:** `sticky top-0 z-50 backdrop-blur-md bg-warm-ivory/95 border-b border-border/60 transition-all`.

### 3.3 Category Navigation Bar (Desktop)
- Horizontal nav bar displaying the **7 Core Family Pillars**:
  `Women's Ethnic` · `Men's Kurtas` · `Children & Tarbiyah` · `Prayer & Worship` · `Learning & Books` · `Home & Lifestyle` · `Milestone Gifts`
- Hover reveals a rich mega-menu with curated subcategories, featured imagery, and editorial picks.

### 3.4 Mobile Navigation Drawer
- Slides in from left upon hamburger click.
- Features: Search input at top, family category accordions, "Shop by Occasion" (Eid, Ramadan, Jummah), Customer Service & WhatsApp support button, Shipping FAQ.

### 3.5 Global Footer
- **Pillars Directory:** Full column links for each of the 7 pillars.
- **Trust & Assurance Badges:** Opacity Guarantee, 7-Day Doorstep Exchange, Direct Cluster Procurement, Secure Razorpay Payments.
- **Newsletter:** "Join the Sukoon Family" (receive seasonal curation notes and Jummah reminder reflections).
- **Legal & Compliance:** Privacy Policy, Terms of Service, Return & Exchange Policy, Shipping Policy, CIN / Registered Business Info.

---

## 4. Homepage Specification

Rendered in the following order:

```text
1. Announcement Bar
2. Main Header
3. Hero: "Curated Modest Living for the Muslim Household"
4. Family Category Discovery (7 Pillar Cards)
5. Shop by Occasion (Ramadan Edit, Jummah Essentials, Festive Eid)
6. Featured Product Carousel (Real Medusa Catalog)
7. Women's Ethnic Showcase (Cambric Cotton & Salwar Suits)
8. The Prayer Sanctuary (20mm Memory Foam Mats & Rehals)
9. Modesty & Quality Guarantee Banner
10. Milestone & Occasion Gifting Edit
11. Journal & Tarbiyah Snippets
12. Trust Strip & Value Pillars
13. Global Footer
```

### 4.1 Hero Section
- **Headline:** *"Thoughtful Ethnic Wear & Daily Essentials for Modern Muslim Families"*
- **Subheadline:** *"Hand-vetted cambric cotton suits, orthopedic prayer mats, and children's tarbiyah tools. Guaranteed modesty, accessible pricing, delivered across India."*
- **CTAs:**
  - Primary (`bg-emerald text-white rounded-full px-8 py-3.5`): *"Explore Women's Collection"* (`/collection?category=women`)
  - Secondary (`border border-emerald text-emerald rounded-full px-8 py-3.5`): *"The Prayer Sanctuary"* (`/collection?category=prayer`)
- **Visuals:** High-res split lifestyle imagery showing mother in salwar suit and family living space.

### 4.2 Family Pillar Category Discovery
- 7 visual cards in horizontal scrolling container (mobile) or 7-column grid (desktop).
- Each card has category thumbnail, pillar name, accent border on hover, and link to `/collection?category={handle}`.

### 4.3 Featured Collections
- Pulled directly from `medusa-collections.json`:
  1. **Festive & Eid 2026** (`festive`)
  2. **Everyday Essentials** (`everyday`)
  3. **Jummah Essentials** (`jummah`)
- Tabbed switcher allows customer to view products dynamically filtered by collection ID.

---

## 5. Family Pillar Navigation & Routing

| Pillar Name | Handle | Route | Accent Color | Subcategories |
| :--- | :--- | :--- | :--- | :--- |
| **Women's Ethnic & Modest** | `women` | `/collection?category=women` | Berry / Coral | Salwar Suit Sets, Kurtas & Kurtis, Abayas, Hijabs |
| **Men's Apparel** | `men` | `/collection?category=men` | Peacock Teal | Handloom Kurtas, Kurta-Pajama, Pathani, Kufi Caps |
| **Children & Tarbiyah** | `children` | `/collection?category=children` | Mango / Amber | Boys' Ethnic, Girls' Sets, Habit Trackers, Flashcards |
| **Prayer & Worship** | `prayer` | `/collection?category=prayer` | Deep Emerald | 20mm Foam Mats, Travel Musallas, Bentwood Rehals, Tasbihs |
| **Learning & Books** | `learning` | `/collection?category=learning` | Marigold | Dua Decks, Arabic Learning Boards, Storybooks |
| **Home & Ambiance** | `home` | `/collection?category=home` | Forest / Olive | Brass Bakhoor Burners, Attars (12ml), Islamic Wall Art |
| **Milestone Gifts** | `gifts` | `/collection?category=gifts` | Coral / Gold | Serene Sanctuary Sets, Eid Hampers, Nikah Boxes |

---

## 6. Collection / Product Listing Page (PLP) Specification

### 6.1 PLP Header
- **Breadcrumbs:** `Home / Women's Ethnic & Modest / Salwar Suit Sets`
- **Title:** Category or collection title in serif display.
- **Description:** 1–2 sentence editorial summary (e.g., *"Pure 60s cambric cotton salwar suits designed with high necklines, attached cotton voil linings, and 2-inch tailoring margins."*)
- **Result Count:** Showing `X products`.

### 6.2 Filter Anatomy (Desktop Sidebar & Mobile Drawer)
- **Category Filter:** Radio or checkboxes mapped to `medusa-categories.json`.
- **Price Range Filter:** Multi-range slider or checkboxes (`Under ₹999`, `₹1,000 - ₹1,999`, `₹2,000 - ₹3,499`).
- **Size Filter:** Multi-select chips: `S`, `M`, `L`, `XL`, `XXL` (derived from variant options).
- **Color Filter:** Visual color swatches (Sage Green, Stone Grey, Natural Sand, Indigo, etc.).
- **Sort Options:**
  - *Featured* (Default)
  - *Price: Low to High*
  - *Price: High to Low*
  - *Newest Arrivals*

### 6.3 Product Card Anatomy
- **Aspect Ratio:** `4:5` portrait image ratio.
- **Image:** Primary thumbnail with secondary image cross-fade on hover.
- **Badge:**
  - `Guaranteed Opaque` (for apparel)
  - `20mm Orthopedic Foam` (for prayer mats)
  - `Free Delivery` (if price ≥ ₹999)
- **Title:** `font-sans font-medium text-sm text-charcoal-ink truncate hover:text-emerald`.
- **Category:** Subtitle in `text-xs text-muted-foreground`.
- **Pricing:**
  - Active Price: `₹{calculated_amount}` (`font-semibold text-emerald text-base`).
  - MRP / Original Price: `₹{original_amount}` (`line-through text-xs text-muted-foreground ml-2`).
  - Savings Chip: `Save ₹{mrp - price}` in subtle green/mango pill.
- **Available Sizes:** Size pills displayed on hover (`S`, `M`, `L`, `XL`).
- **Quick Add / View:** "Select Options" button on card hover.

---

## 7. Product Detail Page (PDP) Specification

The PDP is the critical conversion engine and must render in this exact hierarchy:

```text
1. Breadcrumb Trail: Home > Category > Product Title
2. Split Grid (Desktop: 7-col Gallery / 5-col Purchase Info)
   ├── Left: Sticky Vertical Thumbnail Strip + Main Zoomable Image
   └── Right:
       ├── Product Title & Subtitle
       ├── Price Display: Active Price (₹) + MRP + Savings Percentage
       ├── Tax & Free Shipping status ("Inclusive of all taxes · Free delivery")
       ├── Color Selector: Visual swatches with active ring
       ├── Size Selector: S, M, L, XL, XXL with stock indicators
       ├── Size Guide Modal Link ("View Garment Measurements & Margin Info")
       ├── Modesty & Fit Guarantee Box (Torso lining & 2-inch tailoring margin)
       ├── Pincode Serviceability & Expected Delivery Check
       ├── Quantity Selector (1 to 5)
       ├── "Add to Cart" (Primary CTA) & "Buy Now with 1-Click UPI" (Secondary CTA)
       ├── Trust Highlights: 7-day exchange, Cash on delivery available
       ├── Accordion 1: Product Description & Highlights
       ├── Accordion 2: Fabric, Lining & Care Instructions
       ├── Accordion 3: Garment Dimensions & Measurement Table
       ├── Accordion 4: Shipping & Doorstep Exchange Policy
3. Customer Reviews & Ratings Section
4. "Complete the Family Edit" / Related Products Carousel
```

### 7.1 Dynamic Behavior on Variant Selection
- When customer clicks a size or color:
  1. Update active variant ID in state.
  2. Update price and MRP display from `variant.calculated_price`.
  3. If variant is out of stock, disable "Add to Cart", change button text to *"Notify When Available"*, and show back-in-stock notification form.
  4. Reflect selected options in the SKU and URL parameters (`?variant={id}`).

### 7.2 Modesty Assurance Callout
An interactive card on every apparel PDP stating:
> **The Sukoon Modesty Guarantee**  
> ✓ **100% Non-Transparent:** Tested for zero opacity under direct light.  
> ✓ **Full Inner Lining:** Pre-attached soft cotton voil across torso.  
> ✓ **Tailoring Comfort:** 2-inch inner margins included on both side seams for easy home adjustment.

---

## 8. Apparel-Specific UX & Size Architecture

### 8.1 Women's Sizing Matrix (Indian Standard Measurements in Inches)

| Size | Kurta Bust | Waist | Hip | Shoulder | Kurta Length | Pant Length |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **S (36)** | 36" | 32" | 38" | 14.0" | 44" | 38" |
| **M (38)** | 38" | 34" | 40" | 14.5" | 44" | 38" |
| **L (40)** | 40" | 36" | 42" | 15.0" | 45" | 39" |
| **XL (42)** | 42" | 38" | 44" | 15.5" | 45" | 39" |
| **XXL (44)** | 44" | 40" | 46" | 16.0" | 45" | 39" |

*Every garment includes 2 inches of inner margin fabric on both sides.*

---

## 9. Cart & Cart Drawer Specification

### 9.1 Slide-Over Cart Drawer
- **Trigger:** Header cart icon or clicking "Add to Cart" on any product.
- **Header:** "Your Household Basket (`X items`)", close button.
- **Free Shipping Meter (Critical Business Rule):**
  - Threshold: **₹999**.
  - If `subtotal < 999`: *"Add ₹{999 - subtotal} more for FREE Nationwide Delivery"* (progress bar filled proportionally in emerald).
  - If `subtotal >= 999`: *"🎉 You have qualified for FREE Nationwide Delivery!"* (full green bar).
- **Line Item Card:**
  - Product thumbnail, Title, Selected Size & Color.
  - Quantity counter (`-` / `count` / `+`).
  - Unit and line price in INR.
  - Delete / Remove trash button.
- **Order Summary:**
  - Subtotal: `₹{subtotal}`
  - Estimated Delivery: `Free` or `₹70` (based on threshold)
  - Total Payable: `₹{total}`
- **Checkout CTA:** High-contrast full-width button *"Proceed to Secure Checkout"* (`bg-emerald text-white font-medium py-3.5 rounded-full`).
- **Empty State:** Clean illustration, *"Your basket is peaceful and empty"*, with a quick-link button *"Browse Salwar Suits & Essentials"*.

---

## 10. Checkout Specification

The checkout flow is a focused, distraction-free 2-step single-page experience:

### Step 1: Customer & Delivery Address
- **Contact:** Mobile number (essential for India WhatsApp dispatch updates and COD verification) and Email.
- **Delivery Address:**
  - Full Name
  - Flat / House No. / Building / Street
  - Pincode (triggers auto-lookup for City & State across India)
  - City & State
- **Guest Checkout:** Enabled by default (no forced account creation).

### Step 2: Payment & Order Review
- **Shipping Method:** Free Standard Delivery (3–5 business days) or Flat ₹70.
- **Payment Options:**
  1. **Prepaid (Razorpay):** Instant UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking. (~65% expected volume).
  2. **Cash on Delivery (COD):** Flat ₹50 handling charge or automated WhatsApp/OTP confirmation to prevent RTO (Return to Origin).
- **Security & Reassurance:** 256-bit encryption badge, 7-day exchange reminder.

---

## 11. Search Experience

- **Quick Search Input:** In global header with auto-focus and clear button.
- **Instant Autocomplete (Debounced 250ms):**
  - Searches product `title`, `description`, `handle`, and `category`.
  - Shows top 4 matching product cards with thumbnails and prices.
  - Shows matching category chips (e.g. *In "Prayer & Worship"*).
- **Recent Searches:** Stored locally for instant re-selection.
- **Empty / No Results State:** Helpful suggestions: *"Looking for cotton suits, memory foam prayer mats, or children's habit boards?"* with direct category links.

---

## 12. Occasion Merchandising

Sukoon House groups products across calendar occasions without duplicating the product database:
- **Ramadan Living:** Focus on memory foam prayer mats, attars, Quran stands, and habit trackers.
- **Festive & Eid Edit:** Coordinated salwar suits for women, cotton kurtas for men, festive sets for children.
- **Jummah Routine:** Pure cotton whites, pocket prayer mats, botanical attars.
- **Milestone Gifting:** Pre-curated gift boxes packaged in rigid magnetic-closure presentation boxes.

---

## 13. Blog & Tarbiyah Journal

Routes:
- `/blog`: Journal hub featuring lifestyle reflections, fabric care guides, and parenting tarbiyah tools.
- `/blog/$slug`: Reading view with estimated reading time, author, pull-quotes, and **"Shop Featured Products in this Story"** widget linking directly to Medusa products.

---

## 14. Reusable Empty, Loading, and Error States

All states must strictly adhere to the Warm Indian Jewel design system:
- **Skeleton Loaders:** Soft blush-cream shimmer blocks (`bg-blush-cream/60 animate-pulse rounded-xl`) matching product card dimensions.
- **Out of Stock Badge:** `bg-muted text-muted-foreground text-xs font-semibold px-2.5 py-1 rounded-full`.
- **API Failure / Offline:** Gentle toast or banner in Warm Coral: *"Unable to refresh inventory right now. Displaying saved catalog."* with a retry button.

---

## 15. Mobile-First UX Requirements

Over 80% of target shoppers browse via mobile devices:
1. **Touch Targets:** Minimum 44px for all clickable buttons, color swatches, and size pills.
2. **Sticky Bottom Action Bar on PDP:** On mobile scroll past the main buy box, pin a sticky bottom bar showing product title, price, and a persistent *"Add to Cart"* button.
3. **Horizontal Swipe Galleries:** Smooth CSS snap or Embla Carousel for PDP image gallery and homepage collection carousels.
4. **Slide-Out Bottom Sheets:** Size guide and filter options render as bottom sheets on mobile rather than center modals.

---

## 16. Accessibility (a11y) Standards

- **Semantic Elements:** `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`.
- **Contrast Ratios:** Charcoal Ink on Warm Ivory exceeds WCAG AAA (11.5:1). Emerald on Warm Ivory exceeds WCAG AA (4.8:1).
- **Screen Reader Tags:** Descriptive `aria-label` for cart button ("Shopping Cart with 2 items"), size selector ("Select size Medium"), and color swatches.
- **Keyboard Navigation:** Explicit visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`).

---

## 17. Data Architecture & Commerce Runtime Flow

```
┌────────────────────────────────────────────────────────┐
│              Medusa.js v2 Store API                    │
│      (http://localhost:9000/store/products)            │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    [Live API Mode]             [Lovable Development Mode]
    Live HTTP Fetch              Static Snapshot Fixtures
    (x-publishable-api-key)      (snapshot/*.json)
             │                           │
             └─────────────┬─────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│            Normalized Commerce Adapter                 │
│        (src/lib/commerce/client.ts & use-commerce.ts)  │
│  - Maps Medusa variants into UI size/color options     │
│  - Normalizes calculated prices & currency (INR)       │
│  - Standardizes image galleries and metadata           │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│                 React Storefront UI                    │
│     (Homepage, PLP Collection, PDP, Cart, Checkout)    │
└────────────────────────────────────────────────────────┘
```

The snapshot fixtures are **development mocks for Lovable**, preserving the exact schema returned by the live Medusa Store API. When connecting to production, zero component redesign is required.

---

## 18. Snapshot File Mapping

| Fixture File | Medusa Store Endpoint | Consuming Storefront Component |
| :--- | :--- | :--- |
| `snapshot/medusa-products.json` | `/store/products` | `product-card.tsx`, `collection.tsx` (PLP), `products.$productId.tsx` (PDP), search drawer |
| `snapshot/medusa-categories.json` | `/store/product-categories` | Global navigation bar, mobile menu, PLP category filter sidebar |
| `snapshot/medusa-collections.json` | `/store/collections` | Homepage featured collection tabs, seasonal occasion blocks |
| `snapshot/medusa-regions.json` | `/store/regions` | Currency formatting (`INR / ₹`), shipping and tax calculations |
| `snapshot/snapshot-manifest.json` | Export metadata | Cache validation and version verification |

---

## 19. Component Reuse & Clean Architecture

Lovable should reuse the existing audited components in `web/frontend`:
- `src/components/brand/site-shell.tsx`: Global navigation, announcement bar, mobile drawer, footer.
- `src/components/brand/product-card.tsx`: Complete product card with hover swap, badges, and pricing.
- `src/components/ui/*`: Radix primitives (Dialog, Sheet, Accordion, Select, Tabs, Tooltip).
- `src/lib/commerce/client.ts`: Live Medusa API client and data normalizer.
- `src/lib/commerce/cart-service.ts`: Cart lifecycle management.

---

## 20. Search Engine Optimization (SEO) & Meta

- **Canonical URLs:** `https://sukoonhouse.in/products/{handle}`
- **JSON-LD Structured Data:** Schema.org `Product` and `BreadcrumbList` on every PDP:
  ```json
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Blue Floral Salwar Suit",
    "image": ["https://sukoonhouse.in/..."],
    "description": "A breathable three-piece salwar suit in pure 60s cambric cotton...",
    "brand": { "@type": "Brand", "name": "Sukoon House" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "1499",
      "availability": "https://schema.org/InStock"
    }
  }
  ```

---

## 21. Performance & Optimization

- **Image Formats:** WebP/AVIF with responsive `srcset` (320w, 640w, 960w, 1200w).
- **Image Aspect Ratios:** Explicit `aspect-[4/5]` on all product images to eliminate Cumulative Layout Shift (CLS).
- **Font Optimization:** `font-display: swap` for Newsreader and Manrope Google fonts.
- **Client Bundle Size:** Keep dependencies modular; leverage TanStack Start SSR/prerendering where appropriate.

---

## 22. Implementation Constraints for Lovable

1. **Do NOT Invent Product Data:** Use the real products present in `snapshot/medusa-products.json`.
2. **Do NOT Hardcode Prices or Variants:** Always parse prices from `variant.calculated_price.calculated_amount` or metadata.
3. **Do NOT Fake Customer Reviews:** Only display reviews if real review objects are present; otherwise display the product rating without fabricating text testimonials.
4. **Do NOT Expose Secrets:** Publishable keys are safe for frontend; never bundle admin tokens, database credentials, or payment secrets.
5. **Preserve Cart Architecture:** Cart operations must flow through the normalized commerce adapter so swapping from snapshot mode to live Medusa mode is seamless.

---

## 23. Acceptance & Verification Checklist

- [x] **Real Data Verified:** `Blue Floral Salwar Suit` (`prod_01M39BVMFZ576J1P2MY4207N2P`) exists with 4 real variants and ₹1,499 active pricing.
- [x] **Pillars Verified:** All 7 core pillars exist in `medusa-categories.json`.
- [x] **Collections Verified:** `festive`, `everyday`, and `jummah` exist in `medusa-collections.json`.
- [x] **Region Verified:** India region with `INR` currency exists in `medusa-regions.json`.
- [x] **Design Tokens Documented:** Warm Indian Jewel palette completely specified with OKLCH values.
- [x] **Mobile Behavior Specified:** Sticky actions, bottom sheets, 44px touch targets defined.
- [x] **Free Shipping Rule Captured:** ₹999 threshold progress bar explicitly documented.
- [x] **Zero Secrets Present:** Security scan verified clean across all fixtures.
