# Sukoon House — Canonical Design System & Storefront

This repository is the consolidated, single source of truth for **Sukoon House** (formerly Haven Home Goods), a premium Muslim family lifestyle brand. It unites the brand visual identity, the canonical design token architecture, reusable UI primitives, and the responsive digital storefront.

---

## 🏛️ Repository Consolidation

This codebase consolidates three iterative Lovable generation repositories into a unified, clean monorepo structure:

1. **`haven-home-goods`** (Phase 1): Initial visual discovery, exploratory components, and design system foundation.
2. **`haven-home-goods-build`** (Phase 2): Storefront landing experience, high-resolution product/editorial assets, and responsive site shell.
3. **`design-system-core`** (Phase 3 & Current Baseline): Audited, frozen canonical design tokens, layout primitives (`PageContainer`, `Eyebrow`, `SectionHeading`), standardized motion rules, and comprehensive `/design-system` reference showcase.

Historical branches and commits from all three repositories are retained within this git repository for full provenance.

---

## 🎨 Design Philosophy: Spiritual Minimalism

The visual language communicates contemporary Islamic family identity through intentional composition, honest materiality, warmth, and typographic restraint rather than decorative clichés (no generic mosque silhouettes, excessive gold foil, or fake urgency badges).

### Typography
- **Display Serif:** [Newsreader](https://fonts.google.com/specimen/Newsreader) — expressive, warm, editorial headline voice.
- **Interface & Commerce Sans:** [Manrope](https://fonts.google.com/specimen/Manrope) — crisp, humanist, high-legibility sans-serif for commerce details, navigation, and body copy.

### Color Palette (Earth & Stone)
- **Background (Alabaster / Chalk):** `oklch(0.975 0.008 84)`
- **Foreground (Deep Ink / Charcoal):** `oklch(0.24 0.025 72)`
- **Muted Foreground:** `oklch(0.49 0.026 73)`
- **Primary (Deep Olive / Pine):** `oklch(0.33 0.054 128)`
- **Accent (Desert Clay):** `oklch(0.68 0.082 52)`
- **Mineral Blue:** `oklch(0.66 0.045 220)`
- **Card Surface:** `oklch(0.995 0.004 84)`
- **Border / Hairline:** `oklch(0.84 0.02 78)`

---

## 🧱 Architecture & Component Hierarchy

Built with **TanStack Start**, **Vite**, **Tailwind CSS v4**, and **Radix UI Primitives**.

```
src/
├── assets/                  # High-resolution lifestyle, product & editorial imagery
├── components/
│   ├── brand/               # Brand-specific patterns
│   │   ├── brand-mark.tsx   # Typography wordmark and logo
│   │   ├── design-primitives.tsx # PageContainer, Eyebrow, SectionHeading
│   │   ├── editorial-card.tsx    # Journal & editorial story card
│   │   ├── product-card.tsx      # Curated commerce product card
│   │   ├── site-shell.tsx        # Responsive header, banner, drawer, and footer
│   │   └── status-state.tsx      # Empty, loading, error, and success states
│   └── ui/                  # Accessible headless UI primitives (Button, Sheet, Input, Card...)
├── routes/
│   ├── __root.tsx           # Global document shell, fonts, and meta tags
│   ├── index.tsx            # Curated Storefront Landing Page
│   └── design-system.tsx    # Canonical Design System Live Specification
└── styles.css               # Centralized CSS variables, @theme tokens, and utilities
```

---

## 🚀 Key Routes

- **`/`** — Production storefront featuring:
  - Hero introduction with featured lifestyle photography
  - 01 Collection showcase with product cards and quick-save interactions
  - 02 Philosophy and approach narrative
  - 03 The Journal editorial stories
  - Interactive slide-out cart drawer & mobile navigation
- **`/design-system`** — Canonical design token specification and interactive component playground covering:
  - 01 Color Palette & Swatches
  - 02 Typography scale and sample compositions
  - 03 Controls, Buttons, Badges, and Form Fields
  - 04 Commerce cards & pricing layouts
  - 05 Editorial card layout
  - 06 Contextual Sheets and Drawers
  - 07 System states (Loading skeleton, Empty, Error, Success)
  - 08 Motion and transition guidelines

---

## 🛠️ Local Development

### Prerequisites
- Node.js 20+ (Node.js 22 LTS recommended)
- npm or bun

### Setup
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run linting
npm run lint

# Format codebase
npm run format

# Production build
npm run build
```

---

## 📦 Build with Lovable

This project syncs with the Lovable editor:
- Project URL: [https://lovable.dev/projects/cebf015f-beb5-4135-a390-04c71d33ed6f](https://lovable.dev/projects/cebf015f-beb5-4135-a390-04c71d33ed6f)
- Any pushes to `main` sync back directly into Lovable.
