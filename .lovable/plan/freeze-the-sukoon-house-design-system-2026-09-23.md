# Freeze the Sukoon House design system

## Goal
Adopt the approved Haven Home Goods repository as the current product baseline, then make its existing Sukoon House visual language the single canonical system without changing the design, content, layout, or behavior.

## Implementation
- Bring the approved storefront, design-system reference page, brand components, UI components, and bundled imagery into this project unchanged as the visual baseline.
- Make `src/styles.css` the single source for the current palette, Manrope/Newsreader typography, spacing scale, radii, border roles, shadows, responsive breakpoints, and motion timings.
- Preserve the exact current colors: chalk, ink, olive, linen, clay, mineral, semantic states, overlays, and existing dark values.
- Add reusable semantic utilities/components for repeated page containers, section spacing, eyebrow labels, display headings, image treatments, focus states, and transitions.
- Consolidate button, badge, card, input, textarea, navigation, product-card, editorial-card, and status-state styling around those shared tokens and variants.
- Replace duplicated arbitrary values only where the rendered result remains equivalent; keep all existing screen structure and copy intact.
- Expand the existing `/design-system` reference so it documents the canonical tokens, breakpoints, navigation, cards, fields, controls, and reduced-motion behavior already in use.
- Preserve route-specific metadata and the existing responsive behavior at the current `sm`, `md`, and `lg` breakpoints.

## Verification
- Confirm `/` and `/design-system` compile and render with the approved imagery, fonts, navigation, controls, and layouts.
- Compare desktop and mobile screenshots against the imported approved baseline to catch visual drift.
- Check keyboard focus, disabled/invalid states, menus, drawers, and reduced-motion rules.
- Confirm there are no remaining placeholder screens, duplicated color literals in page code, or preview build errors.

## Boundaries
- No new features, backend work, new visual direction, or redesign.
- Future pages should compose these tokens and shared components rather than introducing page-specific styling conventions.
