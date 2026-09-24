# Sukoon House — Master Implementation Roadmap

This roadmap tracks the development of the Sukoon House (Haven Home Goods) digital storefront and canonical design system.

## Phase 1: Visual Identity & Canonical Design System (Completed)

- [x] Establish global visual tokens (Chalk, Deep Olive, Ink, Linen, Clay, Mineral) and typography pairing (Newsreader / Manrope)
- [x] Standardize responsive layout primitives (`PageContainer`, `Eyebrow`, `SectionHeading`, `media-frame`)
- [x] Build reusable brand components (`SiteShell`, `ProductCard`, `EditorialCard`, `BrandMark`, `StatusState`)
- [x] Build comprehensive `/design-system` reference showcase documenting tokens, controls, cards, motion, and states
- [x] Deploy responsive storefront landing page (`/`) featuring hero, collection grid, philosophy, and journal
- [x] Consolidate 3 Lovable iterative generations (`haven-home-goods`, `haven-home-goods-build`, `design-system-core`) into single canonical repository

## Phase 2: Storefront Expansion & Product Experience

- [x] Build collection / product discovery experience at `/collection` with category tabs, sorting, responsive grid, mobile filter sheet, and empty states
- [x] Product Detail Page (PDP) layout at `/products/$productId` with multi-angle galleries, variant selectors, sticky purchase controls, and craft notes
- [x] Upgrade PDP with apparel sizing, measurement guide, modest-fabric assurances, LMPC declarations, and non-apparel specifications
- [ ] Curated Bundle Builder with interactive 3-step SKU pairing
- [ ] Editorial Journal reading experience and story index
- [ ] Brand Story & Ethical Sourcing page

## Phase 3: Commerce & Cart Experience

- [ ] Interactive slide-out cart drawer with free gift progress threshold
- [ ] Cart state shared across the header and product pages, family cross-sells, shipping summary, and WhatsApp order assist
- [ ] Empty bag, loading, error, and stock reservation states
- [ ] Shopify AJAX Cart API client integration for seamless cart synchronization

## Phase 4: Unboxing & Post-Purchase Experience

- [ ] Packaging QR unboxing micro-PWA applet
- [ ] Guided product care and ritual routines

## Phase 2: Storefront Expansion & Product Experience

- [ ] Update the global shell for seven family-store pillars, mobile navigation, cart trigger, and family footer
