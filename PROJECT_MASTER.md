# PROJECT MASTER — SUKOON HOUSE

> **The Single Authoritative Source of Truth for Sukoon House**  
> *Curated Online Retail Store for Modern Muslim Households*  
> **Status:** Active Authoritative Baseline · **Last Updated:** 2026-09-24  
> **Repository:** `/opt/lifestyle-web/web/frontend` (`shahid-laskar/design-system-core`)  
> **Backend Repository:** `TBD` — to be scaffolded at `/opt/lifestyle-web/web/backend/`

---

## 1. Project Overview

Sukoon House is a curated online retail destination for modern Muslim households, offering good-quality, reasonably priced apparel (salwar suits, kurtas, abayas, children's ethnic wear), prayer essentials, family learning tools, and thoughtful lifestyle items in one trusted, convenient store. It solves the extreme fragmentation, poor fabric quality, and fit anxiety faced by middle-class Muslim families shopping across unreliable Instagram sellers, chaotic marketplaces, and local bazaars by providing vetted products, guaranteed modest opaque cuts, transparent pricing, and reliable nationwide delivery.

The storefront frontend is built and stable. The next objective is a **fully functional production commerce system** the founder can operate without touching the database or source code.

---

## 2. Current Business Model

### Target Customer
Urban and semi-urban middle-class to upper-middle-class Muslim families in Tier 1 and Tier 2 cities in India (monthly household income ₹40,000–₹1,80,000). The primary shopper is the **educated Muslim woman/mother**, managing clothing purchases for herself and her children, household prayer essentials, and festive/milestone gifting.

### Value Proposition
- **Curated Quality over Market Chaos:** Hand-vetted fabrics, durable memory foam, authentic content.
- **Modesty Guarantees:** 100% non-transparent fabrics, attached linings, high necklines, generous inner tailoring margins.
- **Convenience & Trust:** Multi-category family shopping in a single checkout, transparent pricing, 24–48h dispatch, WhatsApp order updates, 7-day doorstep size exchange.

### Commercial Model
Merchant-First Cluster Procurement: partner with established manufacturers and master wholesalers in India's leading industrial clusters, QC-test samples, retail online with healthy margins.

### Pricing Architecture ("Accessible Quality" / Masstige)
- **Individual Products:** ₹249–₹1,899.
- **Curated Gift Hampers:** ₹1,999–₹3,499.
- **Gross Margins:** 58%–62% apparel; 66%–73% hard goods.
- **Shipping:** Free on orders ≥ ₹999 · Flat ₹70 below ₹999.
- **Payment Mix:** ~65% Prepaid (Razorpay UPI) / ~35% COD (automated phone confirmation).

### Sourcing Clusters
| Cluster | Products |
| :--- | :--- |
| Surat (Gujarat) | Modal fabrics, suits, abayas, hijabs |
| Delhi-NCR | Ready ethnic wear, men's kurtas, packaging, habit boards |
| Jaipur / Ahmedabad | Handloom cotton kurtas, block prints, children's wear |
| Panipat (Haryana) | 20mm memory foam prayer mats, chenille musallas |
| Saharanpur (UP) | Bentwood rehals, wooden stands |
| Moradabad (UP) | Laser-cut metal wall art, brass bakhoor burners |

**Launch Asset:** Founder's wife's existing salwar suit inventory deployed as Tier 1 stock (zero initial apparel procurement cash burn). New pilot stock capped at ₹45,000–₹60,000.

---

## 3. Product & Category Architecture

7 Core Family Pillars:

```
Sukoon House Catalog
├── 1. Women's Ethnic & Modest
│    ├── Salwar Suit Sets (Cambric cotton, Chanderi, Modal silk)
│    ├── Kurtas & Kurtis · Modest Dresses · Abayas
│    └── Hijabs & Modesty Accessories
├── 2. Men's Apparel
│    ├── Cotton Kurtas · Kurta-Pajama · Pathani · Thobes
│    └── Kufi Prayer Caps
├── 3. Children & Tarbiyah
│    ├── Boys' / Girls' Ethnic Sets
│    ├── Salah Habit Trackers
│    └── Islamic Board Books
├── 4. Prayer & Worship
│    ├── 20mm Memory Foam Mats · Pocket Travel Mats
│    ├── Bentwood Rehals · Stone Tasbihs
├── 5. Learning & Books
│    ├── Dua & Hadith Decks · Arabic Boards · Storybooks
├── 6. Home & Ambiance
│    ├── Brass Bakhoor Burners · Metal Wall Art
│    ├── Botanical Attars (12ml) · Ramadan Countdowns
└── 7. Milestone Gifts
     ├── Serene Sanctuary Set · Eid Family Hamper
     └── Nikah & Housewarming Sets
```

**Curated Occasions:** Eid Gifting · Ramadan Living · Jummah Essentials.

---

## 4. Customer & Shopping Model

### Who Shops Here
Muslim mother/homemaker (24–44 years old) who coordinates family purchasing: her modest clothing, husband's festive kurtas, children's ethnic sets, prayer mats, educational tools, and occasion gift boxes.

### Key Shopping Missions
1. **Ramadan & Eid Family Wardrobe:** Coordinated modest festive apparel for the whole family in one checkout.
2. **Tarbiyah Mission:** Islamic educational tools (habit boards, flashcards) for children.
3. **Jummah & Spiritual Routine:** Memory foam mat upgrade, attar oils, prayer caps.
4. **Gifting Mission:** Elegant, ready-to-gift Islamic presentation boxes.

### Purchase Decision Drivers
- **Opacity Guarantee** — No see-through fabric. Highest fear for online women's clothing.
- **Fit Confidence** — Garment vs. body measurements + 2-inch inner margins.
- **Doorstep Exchange Assurance** — Free reverse pickup on size errors.
- **Pincode Delivery Visibility** — Delivery dates and COD confirmation before checkout.

---

## 5. Product Experience (Storefront — Currently Implemented)

### Product Detail Page (PDP)
`src/routes/products.$productId.tsx` — 2-column desktop / single-column mobile:

1. Semantic breadcrumbs (full category trail).
2. Fixed 4:5 portrait gallery with lightbox.
3. Price + MRP strikethrough + savings badge + tax inclusion.
4. Color swatches + size chips with real-time stock badges (in-stock / low-stock / sold-out).
5. **Modesty Assurance Pill** — 100% Non-Transparent, attached cotton lining, 2-inch margins.
6. **Pincode Checker** — delivery date, COD status, exchange policy (persisted in `localStorage`).
7. Qty stepper (1–8) + Add to Basket + WhatsApp Concierge.
8. Free shipping progress meter (₹999 threshold).
9. 5-tier Accordion — Fabric/Modesty · Dimensions · Care · LMPC · Shipping/Exchange.
10. "Complete Your Modest Ensemble" companion cross-sell.
11. **Customer Review Hub** — 5-star histogram, sentiment bars (Opacity 98%, Softness 96%, True to Size 94%), customer photo lightbox, filter pills, helpful vote counters.
12. Mobile persistent bottom action dock with size-drawer fallback.

### Collection Discovery (PLP)
`src/routes/collection.tsx` — pillar tabs, subcategory pills, mobile filter sheet, sort options, responsive 3-col grid.

---

## 6. Apparel Experience

### Women's Apparel
- **Sizes:** XS, S, M, L, XL, XXL, 3XL. Procurement curve: 1:2:2:1 (S:M:L:XL).
- **Modesty:** 100% opaque, attached cotton lining, max 6.5" neckline, min ¾-sleeve, 2" tailoring margins.

### Men's Apparel
- **Sizes:** 38 (S) – 46 (XXL). Relaxed cut for namaz ease.

### Children's Apparel
- **Sizes:** 2–3Y to 12–13Y. 100% combed cotton, elasticized waistbands.

### Multi-Pillar Size Guide (`SizeGuideDialog`)
Women / Men / Children tabs · Garment vs. Body measurement toggle · Inch ↔ Cm unit switcher.

---

## 7. UX/UI & Design System

### Design Philosophy
Spiritual Minimalism — contemporary Islamic family identity through composition, warmth, and typographic restraint. No mosque silhouettes, no gold foil, no fake urgency timers.

> **Positioning:** Visually polished and editorial, but business is strictly **accessible middle-class retail** (₹249–₹1,899). Not a luxury brand.

### Typography
- **Display Serif:** Newsreader (editorial headlines, product titles).
- **Commerce Sans:** Manrope (navigation, pricing, specifications, filters).

### OKLCH Color Tokens (`src/styles.css`) — DO NOT MODIFY
| Token | Value |
| :--- | :--- |
| Background | `oklch(0.975 0.008 84)` — Alabaster Chalk |
| Foreground | `oklch(0.24 0.025 72)` — Deep Ink |
| Primary | `oklch(0.33 0.054 128)` — Deep Olive |
| Accent / Clay | `oklch(0.68 0.082 52)` — Desert Terracotta |
| Mineral Blue | `oklch(0.66 0.045 220)` |
| Success | `oklch(0.62 0.14 142)` |

### Layout Primitives
`PageContainer` · `Eyebrow` · `SectionHeading` — defined in `src/components/brand/design-primitives.tsx`.

### Breakpoints
`sm` 40rem · `md` 48rem · `lg` 64rem · `xl` 80rem.

---

## 8. Information Architecture

### Route Hierarchy
```text
/                         ← Storefront homepage
/collection               ← 7-pillar catalog + filters
/products/:productId      ← Full V2 PDP
/design-system            ← Design token reference
```

### Site Shell
- Announcement bar · Brand wordmark · 7-pillar mega-menu · Search · Cart badge.
- Mobile accordion drawer (7 Pillars + Occasions).
- Global footer: pillar links · customer service · LMPC declarations.

---

## 9. Technical Architecture

### Frontend (Stable — Do Not Redesign)
| Layer | Technology |
| :--- | :--- |
| Framework | TanStack Start v1.160+ (React 19, SSR) |
| Router | @tanstack/react-router |
| Data Fetching | @tanstack/react-query |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Components | Radix UI primitives + Lucide React |
| Server Engine | Nitro (`cloudflare-module` preset) |
| Deployment | Cloudflare Pages / Workers |
| Language | TypeScript |

### Commerce Backend (To Be Built — see §19–20)
| Layer | Technology |
| :--- | :--- |
| Platform | **Medusa.js v2** (self-hosted) |
| Language | TypeScript / Node.js |
| Database | PostgreSQL 16 |
| Cache | Redis (required in production) |
| Object Storage | Cloudflare R2 (S3-compatible, free egress) |
| Blog/CMS | Directus (self-hosted, PostgreSQL) |
| VPS | Hetzner CX32 (4 vCPU / 8 GB / 80 GB SSD, ~₹2,000/month) |
| Reverse Proxy | Caddy (automatic HTTPS) |
| Container Mgmt | Docker Compose |

### API Boundary
```
Cloudflare Pages (TanStack Start)
         ↕  HTTPS REST API
Hetzner VPS → Caddy → Medusa.js v2 (Port 9000)
         ↕
PostgreSQL 16 (same VPS) + Redis
         ↕
Cloudflare R2 (product/review images)
```

---

## 10. Current Project Structure

```text
/opt/lifestyle-web/
├── PROJECT_MASTER.md              ← This file
├── backend.md                     ← Commerce architecture mission spec
└── web/
    └── frontend/                  ← TanStack Start storefront (stable)
        ├── AGENTS.md              ← Lovable sync guardrails
        ├── PROJECT_MASTER.md      ← Copy of this file (repo root)
        ├── src/
        │   ├── styles.css         ← OKLCH design tokens (DO NOT MODIFY)
        │   ├── lib/
        │   │   ├── cart-context.tsx   ← Cart state (to be replaced with API)
        │   │   └── utils.ts
        │   ├── components/brand/  ← Core brand components
        │   └── routes/
        │       ├── index.tsx          ← Homepage
        │       ├── collection.tsx     ← Catalog (mock data → API)
        │       └── products.$productId.tsx  ← PDP (mock data → API)
        └── [config files]
```

**Backend target structure (to be created):**
```text
/opt/lifestyle-web/web/backend/    ← Medusa.js v2 project
    ├── medusa-config.ts
    ├── src/
    │   ├── modules/               ← Custom modules (PO, Supplier, Blog)
    │   ├── workflows/             ← Shiprocket, Razorpay flows
    │   └── subscribers/           ← Background event handlers
    ├── docker-compose.yml
    └── Caddyfile
```

---

## 11. Current Data Model (Frontend Mock — To Be Replaced by Medusa)

### ProductDetail (frontend mock type, `products.$productId.tsx`)
```typescript
type ProductDetail = {
  id: string;          // slug
  sku: string;         // e.g. "SH-WCS-014-SG"
  kind: "apparel" | "non-apparel";
  name: string;
  category: string;    // display category
  categoryTrail: string[];
  price: number;       // selling price INR
  mrp: number;         // MRP INR
  rating: string;
  reviewCount: number;
  description: string;
  gallery: Array<{ src: string; alt: string; position: string }>;
  colors: Array<{ name: string; swatch: string }>;
  sizes?: Array<{ name: SizeName; stock: "in-stock" | "low" | "sold-out" }>;
  modelNote?: string;
  specifications: Array<[string, string]>;
  genericName: string;   // LMPC
  netQuantity: string;   // LMPC
  countryOfOrigin: string; // LMPC
};
```

### Cart Entity (`src/lib/cart-context.tsx`)
```typescript
type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
};
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_PRICE = 70;
```

---

## 12. Current Integrations (Live)

1. **WhatsApp Concierge Checkout Intent** — pre-filled WhatsApp message in `CartDrawer` and PDP.
2. **Pincode Estimator** — mock regional simulation + `localStorage` persistence.
3. **Cloudflare Edge** — Nitro `cloudflare-module` Nitro preset.
4. **Lovable Git Bridge** — `AGENTS.md` governs git history protection.

---

## 13. Business Rules

1. **LMPC Compliance:** Every PDP must display Generic Name, Net Quantity, Country of Origin, MRP (tax-inclusive), Manufacturer/Packer, Consumer Care contact.
2. **Modesty Standard:** Women's apparel must disclose opacity and lining. Sheer fabrics must have attached cotton slip. Max neckline depth 6.5". Min ¾-sleeve.
3. **Tailoring Margins:** Minimum 2-inch inner margins on all adult women's ethnic kurtas.
4. **Free Shipping Threshold:** ₹999. Flat ₹70 below.
5. **7-Day Doorstep Exchange:** Free reverse pickup on size errors. Unwashed, unworn, original tags.
6. **Sizing Procurement Curve:** 1:2:2:1 (S:M:L:XL) for adult ethnic wear.
7. **Transparent Pricing:** All prices inclusive of GST.
8. **COD Restriction:** COD orders must receive automated phone confirmation before dispatch.

---

## 14. Current State

### Completed
- [x] Canonical design system (OKLCH tokens, typography, Tailwind v4, Radix UI primitives).
- [x] 7-Pillar site shell (navigation, announcement bar, mobile drawer, footer) — `SiteShell`.
- [x] Storefront homepage (`/`).
- [x] Collection catalog page with 7-pillar tabs, filter sheet, sort, responsive grid (`/collection`).
- [x] Full V2 Product Detail Page — gallery, modesty pill, pincode checker, size guide, review hub, cross-sell, mobile dock (`/products/$productId`).
- [x] Slide-out cart drawer with ₹999 meter, companion upsells, WhatsApp CTA.
- [x] Production build verified (Vite 8 + Nitro `cloudflare-module`, 0 errors).
- [x] Documentation consolidated into single `PROJECT_MASTER.md`.
- [x] **Commerce architecture decision made** — Medusa.js v2 (see §19).
- [x] **Milestone A — Commerce Foundation Completed:**
  - Medusa.js v2.21.1 backend bootstrapped in `/opt/lifestyle-web/web/backend/`.
  - PostgreSQL 16 containerized with persistent storage (`sukoon-postgres`), health checks.
  - Redis 7 containerized (`sukoon-redis`) for event bus, workflow engine, and caching.
  - Medusa Admin dashboard active and accessible at `http://localhost:9000/app`.
  - Admin user created (`admin@sukoonhouse.in`).
  - Store initialized as "Sukoon House" with India Region (INR default currency).
  - 7 Core Pillar categories and collections seeded.
  - Multi-variant apparel model with variant-level inventory tracking (S, M, L, XL, XXL) tested and verified.
  - Acceptance product "Blue Floral Salwar Suit" verified live in Store API and database ledger.
  - Frontend commerce client and TanStack Query hooks implemented in `src/lib/commerce/`.
  - Storefront `/collection` and `/products/$productId` integrated with live Medusa catalog data with zero style changes.
  - All automated Milestone A acceptance tests passing (`test-milestone-a.sh`).

### In Progress
- [ ] Physical audit of wife's existing salwar suit inventory.
- [ ] Sourcing paid 2-unit samples from Panipat (mats) and Saharanpur (rehals).

### Pending (Next Milestones)
- [ ] Milestone B: Purchasing + Checkout + Payments:
  - Razorpay payment gateway integration.
  - Medusa Cart API persistence across sessions.
  - Shiprocket courier serviceability & fulfillment workflow.
  - Custom Purchase Order & Supplier management module.
- [ ] Milestone C: Post-Purchase, Returns, Reviews & Content:
  - Customer accounts, order history, and returns portal.
  - Directus blog CMS integration.
  - Reviews moderation and photo upload.

### Known Limitations
- Cart is client-side context only (persisted Medusa cart planned for Milestone B).
- Pincode estimator is mock simulation (Shiprocket serviceability API planned for Milestone B).
- No payment processing capability (Razorpay integration planned for Milestone B).

### Known Technical Debt
- Product type interfaces duplicated between `collection.tsx` and `products.$productId.tsx`. Extract to `src/types/catalog.ts` during API integration.

### Unresolved Decisions
- **Payment Gateway:** Razorpay (Medusa community plugin exists) vs. Cashfree (**TBD**).
- **Inventory Audit:** Wife's salwar suit stock count (**TBD — Week 2**).

---

## 15. Roadmap

### Now (Weeks 1–3: Inventory Audit + Backend Bootstrap)
- Physical audit of wife's salwar suit stock.
- Pilot fabric samples from Panipat and Saharanpur.
- Provision Hetzner CX32 VPS; scaffold Medusa.js v2 with Docker Compose.
- Configure PostgreSQL + Redis + Cloudflare R2.
- Implement Razorpay payment plugin in Medusa.
- Connect `/collection` and `/products/$productId` to Medusa catalog API.

### Next (Weeks 4–8: Commerce Core Live)
- Build custom PurchaseOrder + Supplier module in Medusa.
- Implement Shiprocket fulfillment workflow (AWB + tracking webhook).
- Connect cart and checkout to Medusa cart API.
- Launch with 18–20 initial SKUs; soft launch to warm circles.
- Organic Instagram Reels on fabric opacity and memory foam comfort.
- Micro-creator barter gifting (10 Muslim lifestyle creators).

### Later (Months 3–6: Full Commerce Operations)
- Customer accounts, order history, and returns portal (storefront integration).
- Directus blog CMS integration + editorial content pipeline.
- Curated 3-Step Bundle Builder for Eid/Nikah gift sets.
- Review collection workflow (email post-delivery, moderation, publish).
- Coupon codes and promotional pricing.
- Replenish proven SKUs in 30–50 unit batches; expand men's/children's collections.

---

## 16. Current Decisions

| Decision | Current Position | Rationale |
| :--- | :--- | :--- |
| **Business Positioning** | Accessible Muslim Family Retail (₹249–₹1,899) | Not luxury; everyday family shopping destination. |
| **Target Customer** | Middle-class Muslim families, Tier 1/2, ₹40k–₹1.8L/mo | 8x larger market than elite niche. |
| **Apparel Role** | Dual-Engine: high-freq acquisition + repeat (3–5x/year) | Largest share of family wallet; wife's existing stock as launch asset. |
| **Free Shipping** | ≥ ₹999 free; ₹70 flat below | Protects margin on single items; incentivizes basket building. |
| **Commerce Backend** | **Medusa.js v2** (self-hosted, VPS) | TypeScript throughout; best headless REST API; PostgreSQL; MIT license; no Shopify. |
| **Database** | **PostgreSQL 16** | Superior ACID guarantees for inventory and order transactional integrity. |
| **Object Storage** | **Cloudflare R2** | S3-compatible; zero egress fees; integrates with Cloudflare CDN; MIT-compatible. |
| **Blog/CMS** | **Directus** (self-hosted) | Self-hostable, PostgreSQL-native, MIT, polished admin, REST + GraphQL. |
| **Payments** | **Razorpay** | Best Indian UPI + Cards + Wallets + COD ecosystem. Community plugin for Medusa exists. |
| **Shipping** | **Shiprocket** | Covers 17+ couriers (Delhivery, DTDC, BlueDart); official REST API; webhook support. |
| **Reverse Proxy** | **Caddy** | Auto-HTTPS; simpler than Nginx for solo-operator VPS. |
| **Sourcing** | Merchant-First Cluster Procurement | Zero custom OEM tooling; fast turnaround from Indian hubs. |
| **Tech Stack** | TanStack Start + Tailwind v4 + Cloudflare | Preserves existing frontend; edge performance; full TypeScript. |

---

## 17. Non-Goals

- **NO Shopify** or any recurring SaaS commerce-platform subscription.
- **NO Luxury Brand Positioning.** Accessible middle-class family store only.
- **NO Native Mobile Apps** (iOS/Android). Responsive web + WhatsApp covers all customer needs.
- **NO Custom Factory Tooling.** We curate finished goods from established clusters.
- **NO International Shipping (Phase 1).** India-only until 500 domestic orders validated.
- **NO Complex AI Workforce.** Solo founder + AI-assisted coding. No autonomous multi-agent orchestrators.
- **NO Microservices / Kubernetes.** Docker Compose on a single VPS. Scale architecture when demand requires.
- **NO Vendure** (GPLv3 license + weakest Indian payment/shipping ecosystem).
- **NO WooCommerce headless** (PHP/MySQL mismatch with TypeScript stack; headless cart pain).
- **NO Artificial Urgency.** No countdown timers, fake stock counters, or flash popups.

---

## 18. Agent Instructions

1. **Read `PROJECT_MASTER.md` First.** This is the single source of truth. Do not revive obsolete docs.
2. **Inspect the implementation before proposing changes.** Check `src/` before writing frontend code; check the Medusa module structure before writing backend code.
3. **Preserve the design system.** Never modify OKLCH tokens in `src/styles.css`, Newsreader/Manrope typography, or spacing primitives without explicit instruction.
4. **Reuse existing components.** Prefer `SiteShell`, `ProductCard`, `PageContainer`, `Eyebrow`, `SectionHeading`, `SizeGuideDialog`, `CartDrawer`.
5. **Never rewrite git history.** This repo connects to Lovable. No force-push, rebase, or amend of published commits.
6. **Update `PROJECT_MASTER.md`** when any fundamental business, architecture, or integration decision changes.
7. **Zero documentation fragmentation.** All active project context lives here. Create separate technical artifacts (ER diagrams, API contracts) only when genuinely necessary.
8. **Backend language is TypeScript.** Medusa.js v2 is TypeScript + Node.js. All backend code, custom modules, and workflows are TypeScript.

---

## 19. Technology Decision Record (Commerce Backend)

### The Situation
The frontend is stable and complete. There is currently **zero backend**. The `server.ts` is purely an SSR wrapper for Cloudflare Workers. All product data is in-memory mock fixtures. There is no cart persistence, no payment processing, no order management, no inventory management, no admin interface.

The mission: build a self-hosted, open-source commerce backend without Shopify or any recurring SaaS subscription.

---

### Option A — Extend the Existing Backend
**What exists:** Nothing. The "backend" is Cloudflare Workers running SSR only. There are no API routes, no database, no authentication, no services.

**Verdict:** Building a complete commerce system from scratch (catalog, inventory, cart, checkout, payments, shipping, returns, reviews, promotions, blog) without a framework would be a multi-month undertaking. Rejected. Use an open-source commerce platform instead.

---

### Option B — Medusa.js v2 ✅ SELECTED

| Criterion | Assessment |
| :--- | :--- |
| License | MIT — fully free, commercial use, no distribution restrictions |
| Language | TypeScript / Node.js — identical to the frontend stack |
| API Type | REST-first (native); GraphQL via community plugin |
| Database | PostgreSQL 16 — superior transactional integrity for inventory/orders |
| Admin UI | ★★★★☆ — React/Vite/Radix UI; usable for daily ops |
| Multi-variant Products | ✅ Native product option/variant + SKU model |
| Inventory | ✅ Native multi-warehouse, stock reservations, levels |
| Purchase Orders | ❌ Not built-in — custom module (2–4 weeks dev) |
| Razorpay | ⚠️ Community plugin (SGFGOV/medusa-payment-plugins, v2-compatible) |
| Shiprocket | ⚠️ Custom Medusa workflow via Shiprocket REST API |
| Self-hosting | 4 services: API server, worker, PostgreSQL, Redis |
| VPS Minimum | 4 GB RAM, 2 vCPU (Hetzner CX22, ~₹1,500/month) |

**Why Medusa.js v2 is selected:**
1. **TypeScript throughout.** Frontend (TanStack Start) and backend (Medusa.js) are both TypeScript. AI coding agents operate in a single language context. Every custom module, workflow, and integration is written in the same language as the storefront. This eliminates a permanent context-switch tax present with PHP-based alternatives.
2. **Best-in-class headless REST API.** Medusa's Store REST API is designed to be consumed by custom frontends — exactly what TanStack Start requires. API routes are clean, versioned, and fully documented.
3. **PostgreSQL.** Superior ACID compliance for order transactional integrity, inventory reservations, and concurrent stock modifications vs. MySQL/MariaDB alternatives.
4. **MIT license.** Zero legal anxiety for commercial operation or future distribution.
5. **Modular architecture.** Medusa's Data Model Language (DML) allows building a custom PurchaseOrder + Supplier module that integrates natively with inventory and workflow engine — the same module system used by Medusa's own first-party modules.
6. **Razorpay gap is solvable.** A production-grade community plugin exists (`medusa-payment-plugins`, SGFGOV). Shiprocket integration is a Medusa workflow calling Shiprocket's REST API — straightforward to implement.

---

### Option C — Vendure v3 ❌ REJECTED

| Issue | Detail |
| :--- | :--- |
| License | Changed from MIT to **GPLv3** in 2025–2026. Not suitable for commercial distribution without commercial license. |
| Indian Payments | No community plugins for Razorpay or Cashfree. Full custom `PaymentMethodHandler` TypeScript plugin required from scratch. |
| Indian Shipping | No community plugins for Shiprocket or Delhivery. Full custom `FulfillmentHandler` required. |
| Admin UI | Less polished than Medusa v2 (migrated from Angular to React). ★★★☆☆ |
| Self-Hosting | Same complexity as Medusa (Node + PostgreSQL + Redis). No advantage. |

**Verdict:** Weakest Indian payment/shipping ecosystem of all evaluated options. GPLv3 license concern. Most from-scratch development required. **Rejected.**

---

### Option D — WooCommerce (Headless on VPS) ❌ REJECTED

| Issue | Detail |
| :--- | :--- |
| Language | PHP + WordPress — permanent mismatch with TypeScript-first stack and AI coding workflow. |
| Database | MySQL only — PostgreSQL not supported natively. |
| Headless Cart/Checkout | WordPress sessions conflict with stateless React/SSR patterns. Headless checkout requires custom bridging code. |
| REST Performance | Every REST request bootstraps full WordPress PHP environment → high TTFB. |
| Plugin Compatibility | Many WooCommerce plugins inject HTML output and break in headless mode. |

**Why WooCommerce loses despite Indian ecosystem strength:** Its best-in-class Indian payment and shipping plugins (official Razorpay, Cashfree, Shiprocket, Delhivery) are real and valuable. However, the architectural mismatch with a headless TanStack SSR frontend is severe. Cart state management, session handling, and checkout with WordPress's PHP session model creates lasting technical debt. Every future AI coding session would context-switch between TypeScript frontend and PHP backend — this eliminates one of the core advantages of the AI-assisted development model. **Rejected.**

---

### Option E — Bagisto v2 ❌ REJECTED (Short-listed, not selected)

Bagisto (MIT, PHP/Laravel, MySQL, both REST + GraphQL, Razorpay native) was the closest alternative. It was rejected for the same core reason as WooCommerce: **PHP vs. TypeScript stack mismatch**. While Laravel is a better-architected PHP framework than WordPress, the fundamental problem remains. The entire development and operations workflow for this project is TypeScript-first. AI coding agents working on a PHP backend alongside a TypeScript frontend create unnecessary complexity. The marginal advantage of Razorpay being "native in core" rather than "community plugin" does not justify the permanent language-boundary tax.

---

### Technology Decision Summary

| Evaluation Axis | Medusa.js v2 | Bagisto v2 | WooCommerce | Vendure v3 |
| :--- | :---: | :---: | :---: | :---: |
| TypeScript consistent | ✅ | ❌ PHP | ❌ PHP | ✅ |
| PostgreSQL | ✅ | ⚠️ MySQL | ❌ MySQL | ✅ |
| MIT License | ✅ | ✅ | ✅ | ❌ GPLv3 |
| REST API quality | ✅ | ✅ | ⚠️ | ❌ GQL-only |
| Razorpay (India) | ⚠️ Plugin | ✅ Native | ✅ Official | ❌ Custom |
| Shiprocket (India) | ⚠️ Custom | ✅ Extension | ✅ Official | ❌ Custom |
| Purchase Orders | ⚠️ Custom | ✅ Extension | ✅ Plugin | ❌ Custom |
| Headless TanStack fit | ✅ | ✅ | ❌ | ✅ |
| AI dev workflow fit | ✅ | ❌ | ❌ | ✅ |
| **SELECTED** | **✅** | | | |

---

## 20. Commerce Architecture

### System Diagram

```text
                         CUSTOMER (Browser)
                              │
                    Cloudflare Pages (CDN + Edge)
                              │
                    TanStack Start Frontend (SSR)
                              │  HTTPS REST API
                              ▼
              ┌──── Caddy Reverse Proxy (Hetzner VPS) ────┐
              │                                           │
              ▼                                           ▼
    Medusa.js v2 API Server (Port 9000)        Directus CMS (Port 8055)
              │                                           │
         ┌────┴────────────────┐                  PostgreSQL DB
         │                     │                 (blog tables)
         ▼                     ▼
    PostgreSQL 16          Redis (cache +
    (commerce DB)          job queue)
         │
         ▼
    Cloudflare R2
    (product + review
     images, blog media)
         │
    Razorpay (payments)
    Shiprocket (fulfillment)
    Resend (transactional email)
```

### Medusa Module Structure

| Module | Implementation |
| :--- | :--- |
| Product Catalog | Medusa v2 native (`@medusajs/product`) |
| Inventory | Medusa v2 native (`@medusajs/inventory`) |
| Cart | Medusa v2 native (`@medusajs/cart`) |
| Orders | Medusa v2 native (`@medusajs/order`) |
| Fulfillment | Medusa v2 native + custom Shiprocket workflow |
| Payments | Medusa v2 native + Razorpay community plugin |
| Customers / Auth | Medusa v2 native (`@medusajs/customer`, `@medusajs/auth`) |
| Promotions | Medusa v2 native (`@medusajs/promotion`) |
| **Purchase Orders** | **Custom module** (`src/modules/purchase-order`) |
| **Suppliers** | **Custom module** (`src/modules/supplier`) |
| **Reviews** | **Custom module** (`src/modules/review`) |
| **Blog** | **Directus CMS** (separate service) |

---

## 21. Database Model

### Entity Relationship Overview

```mermaid
erDiagram
    Product ||--o{ ProductVariant : "has"
    Product }o--|| Category : "belongs to"
    Product }o--o{ Collection : "tagged in"
    Product ||--o{ ProductMedia : "has"
    Product ||--o{ ProductAttribute : "has"

    ProductVariant ||--o{ InventoryItem : "tracked as"
    InventoryItem ||--o{ InventoryMovement : "has ledger"
    InventoryItem }o--|| InventoryLocation : "at"

    Supplier ||--o{ PurchaseOrder : "supplies"
    PurchaseOrder ||--o{ PurchaseOrderItem : "contains"
    PurchaseOrderItem }o--|| ProductVariant : "for"

    Customer ||--o{ Address : "has"
    Customer ||--o{ Order : "places"

    Cart ||--o{ CartItem : "contains"
    CartItem }o--|| ProductVariant : "selects"

    Order ||--o{ OrderItem : "contains"
    Order ||--|| Payment : "has"
    Order ||--o{ Shipment : "generates"
    Order ||--o{ Return : "can have"

    Return ||--o{ ReturnItem : "contains"

    Review }o--|| Product : "on"
    Review }o--|| Customer : "by"
    Review }o--o| Order : "verifies purchase"

    Promotion }o--o{ Order : "applied to"
```

### Key Entities (Medusa Native)

| Entity | Key Fields |
| :--- | :--- |
| **Product** | id, title, handle/slug, description, status, category_id, metadata (LMPC fields, modesty attrs) |
| **ProductVariant** | id, product_id, sku, title, options (size, color), price, cost_price, weight, inventory_quantity |
| **InventoryItem** | id, variant_id, location_id, stocked_quantity, reserved_quantity, incoming_quantity |
| **InventoryMovement** | id, item_id, quantity, type (PURCHASE_RECEIVED / ORDER_RESERVED / ORDER_FULFILLED / RETURN_RECEIVED / DAMAGED / MANUAL_ADJUSTMENT), reference_id, note |
| **Order** | id, customer_id, status, payment_status, fulfillment_status, items, total, shipping_address, display_id |
| **Payment** | id, order_id, provider (razorpay), provider_transaction_id, amount, status, captured_at |
| **Shipment** | id, order_id, provider (shiprocket), awb_number, tracking_url, status, dispatched_at, delivered_at |
| **Customer** | id, email, phone, first_name, last_name, addresses |
| **Return** | id, order_id, status, items, refund_amount, exchange_order_id |
| **Promotion** | id, code, type (percentage/fixed), value, conditions (min_amount, category, product), usage_limit, valid_from, valid_to |

### Custom Entities (Built as Medusa Modules)

| Entity | Key Fields |
| :--- | :--- |
| **Supplier** | id, name, contact_name, phone, email, address, city, cluster (Surat/Panipat/etc.), categories, lead_days, payment_terms, quality_notes |
| **PurchaseOrder** | id, supplier_id, po_number, status (DRAFT/ORDERED/PARTIALLY_RECEIVED/RECEIVED/CANCELLED), expected_delivery, total_cost, notes |
| **PurchaseOrderItem** | id, po_id, variant_id, variant_sku, ordered_qty, received_qty, rejected_qty, unit_cost |
| **Review** | id, product_id, customer_id, order_id, rating, title, body, size_feedback, opacity_rating, softness_rating, colorfastness_rating, is_verified_purchase, status (PENDING/PUBLISHED/REJECTED), helpful_count, photos |

### Apparel-Specific Metadata (stored as Medusa `metadata` on Product/Variant)
```json
{
  "kind": "apparel",
  "lmpc_generic_name": "Women's 3-Piece Stitched Salwar Suit Set",
  "lmpc_net_quantity": "1 Set",
  "lmpc_country_of_origin": "India",
  "lmpc_manufacturer": "Sukoon House Textiles",
  "lmpc_consumer_care": "care@sukoonhouse.in",
  "opacity_guarantee": "100% Non-Transparent",
  "attached_lining": true,
  "lining_material": "Pure Cotton Voil",
  "inner_margin_inches": 2,
  "neckline_depth_inches": 5.5,
  "modesty_confirmed": true
}
```

---

## 22. Inventory Model

### Stock States
```
ON_HAND       = Physical units in warehouse
RESERVED      = Held for confirmed orders awaiting fulfillment
INCOMING      = Ordered from supplier, not yet received
DAMAGED       = Received but unsellable units
RETURNED      = Customer-returned units (may be restocked after inspection)

AVAILABLE = ON_HAND − RESERVED
```

### Stock Ledger — Every movement creates an `InventoryMovement` record
```
SKU: SH-WCS-014-SG-L (Salwar Suit Sage Green / L)

Date        Type                 Qty   Reference         Balance
2026-10-01  PURCHASE_RECEIVED   +10   PO-2026-001        10
2026-10-03  ORDER_RESERVED       -1   ORD-1021           9
2026-10-05  ORDER_FULFILLED      -1   ORD-1021 (ship)    8  ← RESERVED released
2026-10-07  ORDER_RESERVED       -1   ORD-1035           7
2026-10-08  DAMAGED              -1   Manual (torn seam) 6
2026-10-10  RETURN_RECEIVED      +1   RET-0012           7
2026-10-10  MANUAL_ADJUSTMENT    -1   Recheck QC (fail)  6
```

**Rule:** No silent inventory modifications. Every quantity change has a `type`, `reference_id`, and optional `note`.

### Low Stock Alerts
- Trigger when `available_quantity ≤ low_stock_threshold` (configurable per variant; default: 3 units).
- Alert surfaced in Medusa admin dashboard.

---

## 23. Purchasing & Supplier Model

### Supplier Fields
```typescript
{
  name: string;             // "Raza Textiles, Surat"
  contact_name: string;
  phone: string;            // WhatsApp-reachable
  email?: string;
  address: string;
  cluster: string;          // "Surat" | "Delhi-NCR" | "Panipat" | ...
  categories: string[];     // ["Women's Suits", "Hijabs"]
  lead_days: number;        // avg days from order to delivery
  payment_terms: string;    // "50% advance, 50% on delivery"
  quality_notes: string;    // "Pre-wash fabric before shipment"
  reliability_score?: number; // 1-5, updated after each PO
}
```

### Purchase Order Lifecycle
```
DRAFT           ← Admin creates PO, selects supplier, adds variants+quantities+costs
ORDERED         ← PO sent to supplier (WhatsApp/email) — inventory shows as INCOMING
PARTIALLY_RECEIVED ← Some items received; partial inventory update
RECEIVED        ← All items received; inventory fully updated; PO closed
CANCELLED       ← PO cancelled; INCOMING removed
```

### Stock Receiving Workflow
```
1. Open PO in Admin
2. Select PO items to receive
3. Enter received_qty per variant (may differ from ordered_qty)
4. Enter rejected_qty (damaged, quality-fail units)
5. Confirm → InventoryMovement(PURCHASE_RECEIVED) created automatically
6. Product availability on storefront updates immediately
```

---

## 24. Order Lifecycle

```
Customer adds items → Cart (Medusa cart API, persisted)
                ↓
      Customer enters address + pincode
                ↓
      Checkout (apply promotions, calculate shipping)
                ↓
      Payment initiation (Razorpay)
                ↓
   ┌─────────────────────────────────┐
   │ PAYMENT PENDING                 │  ← Order created; stock NOT yet reserved
   └─────────────────────────────────┘
                ↓ Razorpay webhook: payment.captured
   ┌─────────────────────────────────┐
   │ PAYMENT CONFIRMED               │  ← Stock RESERVED; ORDER CONFIRMED email sent
   └─────────────────────────────────┘
                ↓ Admin marks ready
   ┌─────────────────────────────────┐
   │ PROCESSING                      │  ← Packing, quality check, label printing
   └─────────────────────────────────┘
                ↓ Shiprocket pickup scheduled
   ┌─────────────────────────────────┐
   │ SHIPPED                         │  ← AWB generated; tracking URL sent to customer
   └─────────────────────────────────┘
                ↓ Shiprocket webhook: delivered
   ┌─────────────────────────────────┐
   │ DELIVERED                       │  ← Stock FULFILLED; review request email sent
   └─────────────────────────────────┘
```

**Failure Cases:**
- `payment.failed` → Order status `PAYMENT_FAILED`; no stock reservation.
- `payment.captured` but webhook delayed → Idempotent webhook handler (deduplicate by Razorpay `payment_id`).
- COD order → Stock reserved on order creation; `PAYMENT_PENDING_COD` status; phone confirmation required before dispatch.
- RTO (Return to Origin) → Shiprocket webhook triggers `ORDER_RTO`; stock returned to `RETURNED` state pending inspection.

---

## 25. Payment Lifecycle

### Provider: Razorpay (primary)
```
Frontend (TanStack) → Razorpay Orders API → razorpay_order_id
       ↓
Razorpay Checkout (UPI / Cards / Net Banking / Wallets / EMI)
       ↓
payment.captured webhook → Medusa payment webhook handler
       ↓ Verify HMAC signature (razorpay_signature)
       ↓
Order status: PAID → inventory reserved
```

### Payment States (Medusa Payment entity)
```
PENDING         ← Initiated, not yet captured
CAPTURED        ← Payment confirmed (webhook received + verified)
PARTIALLY_REFUNDED ← Partial refund processed
REFUNDED        ← Full refund processed
FAILED          ← Payment failed or cancelled
```

### COD Workflow
- Order created with `payment_provider: cod`.
- Admin system requires phone verification before dispatching.
- Stock reserved immediately on order creation.
- `PAYMENT_PENDING_COD` until delivery confirmed.

### Refunds
- Refunds issued via Razorpay Refunds API from Medusa admin.
- Partial refunds supported (e.g., refund one item from multi-item order).
- `Payment.refund_amount` tracked cumulatively.

---

## 26. Shipping Lifecycle

### Provider: Shiprocket (primary — covers 17+ couriers including Delhivery, DTDC, Ekart)

```
Order PAID → Admin reviews → Shiprocket shipment created via API
       ↓
AWB number assigned + courier assigned (auto or manual)
       ↓
Pickup scheduled (1–2 business days in metro cities)
       ↓
Shiprocket webhook: IN_TRANSIT → update Shipment.status
       ↓
Shiprocket webhook: DELIVERED → Order.fulfillment_status = DELIVERED
                              → InventoryMovement(ORDER_FULFILLED)
                              → Review request email sent
```

### Shipping Rule
- Orders ≥ ₹999: Free delivery (shipping_amount = 0).
- Orders < ₹999: Flat ₹70 delivery fee.
- COD: Available nationwide (Shiprocket manages COD collection and remittance).

### Failed Delivery / RTO
- 3 delivery attempts standard.
- RTO webhook → `ORDER_RTO`; stock re-ingested as `RETURN_RECEIVED`; customer notified.

---

## 27. Returns & Exchanges Lifecycle

### Return States
```
RETURN_REQUESTED  ← Customer initiates in portal or via WhatsApp
RETURN_APPROVED   ← Admin approves (within 7 days of delivery)
PICKUP_SCHEDULED  ← Shiprocket reverse pickup created
RECEIVED          ← Item received at warehouse
INSPECTED         ← Condition verified (pass / fail / partial)
REFUND_APPROVED   ← Refund initiated (Razorpay Refunds API)
RESTOCKED         ← Item back in available inventory
CLOSED            ← Return fully resolved
```

### Exchange Flow (most common for apparel)
```
Customer requests size exchange (e.g., M → L)
       ↓ Admin approves
       ↓ Shiprocket reverse pickup scheduled for M
       ↓ New shipment for L created immediately (available stock check first)
       ↓ M received + inspected
       ↓ If pass → InventoryMovement(RETURN_RECEIVED) + restocked
       ↓ If fail (worn/washed/damaged) → InventoryMovement(DAMAGED); no restock
       ↓ Return CLOSED
```

**Business Rule:** Exchange window is 7 days from delivery. Items must be unwashed, unworn, original tags intact. Reverse pickup is free (Sukoon House's cost).

---

## 28. Customer System

### Guest Checkout
- No account required. Email + phone collected for order communication only.
- `localStorage` cart persists until order placed.

### Account Creation
- Optional — prompted post-purchase for order tracking convenience.
- Fields: name, email, phone, addresses (billing + delivery).

### Customer Portal (Post-Login)
- Order history with status tracking.
- Return/exchange initiation.
- Saved addresses.
- Wishlist.
- Review submission (post-delivery prompt).

**Rule:** Do not force account creation before checkout. Conversion rate priority.

---

## 29. Reviews System

### Review Fields
```typescript
{
  product_id: string;
  customer_id?: string;      // null for guest (email-verified)
  order_id: string;          // required for "Verified Purchase" badge
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  photos: string[];          // Cloudflare R2 URLs
  // Apparel-specific sentiment
  true_to_size: 1 | 2 | 3 | 4 | 5;  // 1=runs small, 5=runs large
  opacity_rating: 1 | 2 | 3 | 4 | 5;
  softness_rating: 1 | 2 | 3 | 4 | 5;
  colorfastness_rating?: 1 | 2 | 3 | 4 | 5;
  purchased_size?: string;
  purchased_color?: string;
  status: "PENDING" | "PUBLISHED" | "REJECTED";
  helpful_count: number;
}
```

**Verified Purchase Logic:** `is_verified_purchase = true` only when `order_id` resolves to a delivered order for this customer and product. Never inferred or faked.

**Moderation:** All reviews enter `PENDING`. Admin publishes or rejects via Medusa admin. Automated pre-screening for profanity (`pending → flagged`).

---

## 30. Promotions

### Supported Promotion Types (Medusa native `@medusajs/promotion`)
- Percentage discount (`10%` off)
- Flat discount (`₹100` off)
- Free shipping (override shipping amount to 0)
- BOGO (not in initial scope)

### Conditions Supported
- Minimum order amount (e.g., `min ₹999`)
- Specific products or categories
- First-time customer only
- Usage limit (e.g., max 500 uses total, max 1 per customer)
- Validity date range (Eid / Ramadan campaigns)

### Coupon Codes
- Admin creates codes in Medusa admin.
- Customer applies code at checkout.
- Stackability: disabled (only one promotion per order in V1).

---

## 31. Blog / CMS Architecture

### Platform: Directus (self-hosted)
- **License:** BSL 1.1 / MIT (MIT after 4 years) — fully free for self-hosting.
- **Database:** PostgreSQL (shared instance or separate schema on same PostgreSQL server).
- **Admin:** Polished no-code content admin; rich text editor, media library, scheduled publishing.
- **API:** REST + GraphQL native.

### Blog Collections (Directus data model)
```
Posts
  ├── title (string)
  ├── slug (string, unique)
  ├── excerpt (text)
  ├── body (rich text / markdown)
  ├── featured_image (file → Cloudflare R2)
  ├── author (string)
  ├── category → BlogCategory
  ├── tags → [BlogTag]
  ├── status (draft / published / scheduled)
  ├── published_at (datetime)
  ├── seo_title (string)
  ├── seo_description (text)
  └── related_products (JSON array of Medusa product IDs)

BlogCategory: id, name, slug
BlogTag: id, name, slug
```

### Frontend Blog Routes (to be built)
```
/blog                    ← Article index + category nav
/blog/:slug              ← Article with inline related product cards
/blog/category/:category ← Filtered article index
```

### Content → Product Journey
Editorial article on "How to Choose the Right Salwar Suit" embeds `related_products` → TanStack frontend fetches Medusa product API for each ID → renders inline product cards → customer clicks → PDP → checkout.

---

## 32. Admin Architecture

### Medusa Admin Dashboard (built-in)
Access at `https://admin.sukoonhouse.in` (subdomain, served by Caddy).

### Core Admin Workflows

```
Dashboard
  ├── Today's Orders
  ├── Today's Revenue
  ├── Low Stock Alerts (≤3 units)
  ├── Pending Returns
  ├── Outstanding POs (INCOMING inventory)
  └── Recent Reviews (PENDING)

Catalog
  ├── Products (create, edit, variants, pricing, images, metadata)
  ├── Categories (7 Pillars + subcategories)
  ├── Collections (Eid 2026, Ramadan Collection, etc.)
  └── Media Library (Cloudflare R2)

Inventory
  ├── Stock Levels (per variant + location)
  ├── Movements Ledger
  ├── Low Stock Report
  └── Manual Adjustments

Purchasing
  ├── Suppliers (CRUD)
  ├── Purchase Orders (create, receive, track)
  └── PO Receipt (receive quantities, mark damaged)

Orders
  ├── All Orders (filter by status)
  ├── Processing Queue
  ├── Shipped Orders
  ├── Delivered (review request sent)
  └── RTO Queue

Returns
  ├── Return Requests (approve/reject)
  ├── Inspections
  └── Refunds / Exchanges

Reviews
  ├── Pending Moderation
  ├── Published
  └── Rejected

Promotions
  ├── Coupon Codes
  └── Discount Rules

Reports
  ├── Sales (revenue, orders, AOV, refunds)
  ├── Products (top sellers, sell-through)
  ├── Inventory (stock value, ageing, low stock)
  └── Profitability (where cost data is available)

Settings
  ├── Shipping Zones & Rates
  ├── Payment Providers
  ├── Return Policy
  └── Notifications (email templates)
```

**Founder Operability Test** — Admin must answer these without SQL:
- What products do I sell and how many units remain?
- Which sizes are low?
- What stock is incoming (ORDERED from suppliers)?
- Which supplier did I buy this from and what did I pay?
- Which products are selling? Which are not?
- What orders need attention today?
- Which returns are pending?
- How much inventory value is tied up?
- What did customers say about this product?

---

## 33. Frontend Integration (Replacing Mock Data)

### Migration Strategy: Mock → Live API

| Frontend Area | Current State | Target State |
| :--- | :--- | :--- |
| `collection.tsx` product list | In-memory `products[]` array | `GET /store/products?category_id=&limit=&offset=` |
| `products.$productId.tsx` | In-memory `catalog{}` object | `GET /store/products/{handle}` |
| `cart-context.tsx` | Client-only React context | Medusa cart API (`POST /store/carts`, session via cookie) |
| Checkout | None | Medusa checkout flow (address, shipping, payment) |
| Customer auth | None | `POST /store/auth` (JWT tokens) |
| Order history | None | `GET /store/orders?customer_id=` |
| Reviews | Hardcoded mock | `GET /store/products/{id}/reviews` + `POST /store/reviews` |
| Blog | None | `GET {directus_url}/items/posts` |
| Pincode check | Mock simulation | Shiprocket serviceability API |

### API Client Architecture
```typescript
// src/lib/api.ts — centralized API client
const MEDUSA_URL = import.meta.env.VITE_MEDUSA_URL; // e.g. https://api.sukoonhouse.in
const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL;

// TanStack Query hooks:
// useProducts(filters) → /store/products
// useProduct(handle) → /store/products?handle={handle}
// useCart() → managed via Medusa JS SDK
// useBlogPosts(category?) → Directus REST
```

### Environment Variables (Frontend)
```
VITE_MEDUSA_URL=https://api.sukoonhouse.in
VITE_DIRECTUS_URL=https://cms.sukoonhouse.in
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
VITE_SHIPROCKET_SERVICEABILITY_KEY=xxxxx
```

---

## 34. Infrastructure & Deployment

### Production Architecture

```
Internet
    ↓ DNS (Cloudflare)
Cloudflare Pages → TanStack Start Frontend (Cloudflare Workers)
    ↓ API calls (HTTPS)
Hetzner CX32 VPS (4 vCPU / 8 GB RAM / 80 GB SSD, ~₹2,000/month)
    ↓
Caddy (ports 80/443, automatic HTTPS + HTTP/2)
    ├── api.sukoonhouse.in → Medusa.js v2 (port 9000)
    ├── admin.sukoonhouse.in → Medusa Admin (port 9000/admin)
    └── cms.sukoonhouse.in → Directus (port 8055)
    ↓
PostgreSQL 16 (port 5432, localhost only)
Redis (port 6379, localhost only)
    ↓
Cloudflare R2 (object storage — product images, review photos, blog media)
    ↓
Razorpay (payment webhooks → api.sukoonhouse.in/webhooks/razorpay)
Shiprocket (shipping webhooks → api.sukoonhouse.in/webhooks/shiprocket)
Resend (transactional email — order confirms, shipping, review requests)
```

### Docker Compose Services (`docker-compose.yml`)
```yaml
services:
  medusa:
    image: node:22-alpine
    command: npm run start
    ports: ["9000:9000"]
    env_file: .env
    depends_on: [postgres, redis]

  worker:
    image: node:22-alpine
    command: npm run worker
    env_file: .env
    depends_on: [postgres, redis]

  postgres:
    image: postgres:16-alpine
    volumes: ["pgdata:/var/lib/postgresql/data"]
    environment:
      POSTGRES_DB: sukoon_commerce
      POSTGRES_USER: sukoon
      POSTGRES_PASSWORD: ${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    volumes: ["redisdata:/data"]

  directus:
    image: directus/directus:latest
    ports: ["8055:8055"]
    env_file: .env.directus
    depends_on: [postgres]

  caddy:
    image: caddy:2-alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data

volumes:
  pgdata:
  redisdata:
  caddy_data:
```

### Environment Variables (Backend `.env`)
```
DATABASE_URL=postgresql://sukoon:${DB_PASSWORD}@postgres:5432/sukoon_commerce
REDIS_URL=redis://redis:6379
JWT_SECRET=<generate with: openssl rand -base64 64>
COOKIE_SECRET=<generate with: openssl rand -base64 64>
STORE_CORS=https://sukoonhouse.in,https://www.sukoonhouse.in
ADMIN_CORS=https://admin.sukoonhouse.in
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
SHIPROCKET_EMAIL=xxxxx
SHIPROCKET_PASSWORD=xxxxx
CLOUDFLARE_R2_BUCKET=sukoon-media
CLOUDFLARE_R2_ACCESS_KEY=xxxxx
CLOUDFLARE_R2_SECRET_KEY=xxxxx
CLOUDFLARE_R2_ENDPOINT=https://<account>.r2.cloudflarestorage.com
RESEND_API_KEY=re_xxxxx
```

---

## 35. Security

| Layer | Implementation |
| :--- | :--- |
| **HTTPS** | Caddy automatic Let's Encrypt (or Cloudflare origin cert) |
| **Admin Auth** | Medusa admin JWT (email + password); 2FA optional via TOTP |
| **Customer Auth** | Medusa JWT session; short-lived access token + refresh token |
| **Webhook Verification** | Razorpay: HMAC SHA-256 signature on `razorpay_signature`; Shiprocket: API token header |
| **Input Validation** | Medusa request validation (Zod schemas on all endpoints) |
| **Rate Limiting** | Caddy rate limiting plugin (or Cloudflare WAF at edge) |
| **Media Upload** | File type whitelist (JPEG, PNG, WebP only); max 10 MB; virus scan via ClamAV or skip (low-risk for product images) |
| **DB Access** | PostgreSQL accessible only on localhost (no public port) |
| **Redis Access** | Redis accessible only on localhost (no public port) |
| **Secrets** | Stored in `.env` on server; never committed to git; managed via `docker secret` or Hetzner Cloud secrets |
| **Audit Logging** | Medusa admin action logs (user, action, timestamp, entity, before/after); ship to file + optional Grafana |
| **Inventory / Order Protection** | All stock mutations via service layer only; no direct `UPDATE inventory SET` from API controllers |

---

## 36. Backup & Restore

### Backup Schedule
```
PostgreSQL:    Daily at 02:00 IST via pg_dump → Cloudflare R2 (sukoon-backups/db/)
Redis:         RDB snapshot daily (acceptable data loss: <24h for cache; cart data is ephemeral)
Media (R2):    R2 versioning enabled; multi-region redundancy via Cloudflare
Configuration: Git-tracked (docker-compose.yml, Caddyfile, medusa-config.ts)
Secrets:       Hetzner Cloud Secret Store or encrypted off-site (Bitwarden export)
```

### Backup Retention
- Daily backups: 7 days.
- Weekly backups: 4 weeks (every Sunday).
- Monthly backups: 12 months.

### Restore Procedure
```bash
# 1. Provision new VPS
# 2. Install Docker + Docker Compose
# 3. Clone config repo / restore Caddyfile + docker-compose.yml
# 4. Restore .env secrets
# 5. Pull latest DB backup from R2:
aws s3 cp s3://sukoon-backups/db/latest.dump . --endpoint-url $R2_ENDPOINT
# 6. Restore database:
pg_restore -U sukoon -d sukoon_commerce latest.dump
# 7. Start services:
docker compose up -d
# 8. Verify: admin login, product catalog, order list
```

**Target Recovery Time Objective (RTO): < 2 hours.**  
**Recovery Point Objective (RPO): < 24 hours (daily backup).**

---

## 37. Testing Strategy

Tests target business workflows, not code coverage metrics.

### Critical Workflow Tests

| Workflow | Test Scope |
| :--- | :--- |
| **Catalog** | Create product → publish → appears in `/store/products` |
| **Inventory** | Receive PO → stock updated → variant shows available on storefront |
| **Order Happy Path** | Cart → checkout → Razorpay capture webhook → inventory reserved → order confirmed |
| **COD Order** | Cart → checkout (COD) → order created → phone verified → dispatched |
| **Shipment** | Order paid → Shiprocket AWB created → tracking webhook → delivered |
| **Return** | Return requested → approved → pickup → received → inspect pass → refund issued → inventory restocked |
| **Exchange** | Return M → approve → new L shipment → M received pass → M restocked → closed |
| **Review** | Delivered order → review submitted → pending → admin publishes → appears on PDP |
| **Blog** | Directus post draft → publish → appears at `/blog` → related products render |
| **Promotions** | Apply coupon code at checkout → discount applied correctly → usage count incremented |

### Failure Case Tests

| Failure | Expected Behaviour |
| :--- | :--- |
| Payment failed | Order stays `PAYMENT_FAILED`; no inventory reserved |
| Duplicate Razorpay webhook | Idempotent handler; no double inventory reservation |
| Stock race condition (2 orders, 1 unit left) | First order reserves; second gets `insufficient stock` error |
| Order cancelled after payment | Inventory reservation released; refund initiated |
| Shiprocket RTO | Stock returned to `RETURNED`; customer notified |
| Damaged return item | Stock NOT restocked; `DAMAGED` movement recorded; no refund on damage |

---

## 38. Implementation Sequence

Order is dependency-driven. Each step must be verified before the next begins.

| Step | Task | Priority |
| :---: | :--- | :--- |
| 1 | Provision Hetzner CX32 VPS; install Docker Compose | Infrastructure |
| 2 | Scaffold Medusa.js v2 project; configure PostgreSQL + Redis | Backend core |
| 3 | Configure Caddy reverse proxy + SSL (api / admin subdomains) | Infrastructure |
| 4 | Configure Cloudflare R2 bucket + Medusa file provider | Storage |
| 5 | Set up product Category tree (7 pillars + subcategories) | Catalog |
| 6 | Build product catalog in Medusa admin (20 initial SKUs with variants) | Catalog |
| 7 | Connect `/collection` TanStack route to Medusa `GET /store/products` | Frontend API |
| 8 | Connect `/products/$productId` to Medusa `GET /store/products/{handle}` | Frontend API |
| 9 | Implement Razorpay payment provider in Medusa (community plugin) | Payments |
| 10 | Implement Medusa cart API + replace `cart-context.tsx` with Medusa JS SDK | Cart |
| 11 | Implement checkout flow (address, shipping rate, payment) in storefront | Checkout |
| 12 | Implement Razorpay webhook handler + HMAC verification | Payments |
| 13 | Implement Shiprocket fulfillment workflow (create shipment, AWB, webhook) | Shipping |
| 14 | Build custom `PurchaseOrder` + `Supplier` Medusa module | Purchasing |
| 15 | Build PO admin UI routes in Medusa admin | Purchasing |
| 16 | Implement Returns workflow (request → approve → pickup → inspect → refund) | Returns |
| 17 | Implement Customer auth + order history + returns portal | Customers |
| 18 | Build custom `Review` Medusa module + admin moderation view | Reviews |
| 19 | Connect storefront review display to Review API | Reviews |
| 20 | Implement Promotions (coupon codes, % and flat discounts) | Promotions |
| 21 | Set up Directus CMS on VPS; configure PostgreSQL schema + R2 media | Blog |
| 22 | Build `/blog`, `/blog/:slug`, `/blog/category/:cat` TanStack routes | Blog |
| 23 | Implement product search (Medusa full-text + filters) in `/collection` | Search |
| 24 | Set up Resend transactional emails (order confirm, shipping, review request) | Notifications |
| 25 | Verify and test backup + restore procedure | Backup |
| 26 | Security hardening audit (headers, rate limits, webhook verification) | Security |
| 27 | End-to-end operational scenario test (§42 in backend.md) | Testing |
| 28 | Production go-live (DNS cutover, smoke test, monitor 24h) | Deployment |

---

## 39. Critical Risks

| Risk | Likelihood | Impact | Mitigation |
| :--- | :---: | :---: | :--- |
| Razorpay community plugin compatibility breaks on Medusa update | Medium | High | Pin Medusa version; test plugin on every upgrade; have Razorpay direct REST API as fallback |
| Shiprocket API rate limits or downtime | Medium | High | Cache serviceability results; queue shipment creation; Delhivery as manual fallback |
| VPS goes down | Low | Critical | Daily DB backups to R2; RTO < 2h documented; Hetzner uptime SLA 99.9% |
| Inventory race condition on flash sale | Low | Medium | PostgreSQL row-level locking on inventory reservation; prevent oversell at DB level |
| Size exchange dead stock (broken size curves) | High | Medium | 1:2:2:1 procurement curve; enforce at PO creation; low-stock alerts at ≤3 units |
| COD RTO (non-delivery) | Medium | High | COD phone verification mandatory; limit COD to ≤₹1,499; Shiprocket COD audit reports |
| PO custom module development delay | Medium | Medium | Use manual ATUM-style spreadsheet temporarily; PO module is step 14, not day 1 |
