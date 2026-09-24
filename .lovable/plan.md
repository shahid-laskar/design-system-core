# Apparel-aware product detail upgrade

## Build

- Add a reusable Radix size-guide dialog with inch/centimeter tabs, the full women’s suit measurement table, measurement guidance, and fit note.
- Extend product data with an apparel/non-apparel type, apparel size stock, rating, pricing, fabric details, model note, legal declarations, shipping details, and technical specifications.
- Upgrade the gallery with animated image changes, desktop hover zoom, mobile horizontal swiping, thumbnails, and pagination dots.
- Rework the purchase panel for the requested Pure Cambric Cotton Set presentation: breadcrumb, category badge, reviews, price savings, colour, size availability, quantity, basket feedback, WhatsApp ordering, and free-shipping progress.
- Add prominent modest-fabric assurances plus the three structured accordions, including every required LMPC field and the 7-day doorstep exchange terms.
- Keep size controls and the guide exclusive to apparel SKUs; prayer and children’s objects will instead show dimensions/specifications.
- Add a mobile sticky Add to Basket bar that reflects the chosen apparel size and quantity.

## Product behavior

- Treat `the-everyday-pair` as the apparel SKU and also support `pure-cambric-cotton-set` as its direct product URL.
- Keep `the-stillness-set` and `first-forms-set` non-apparel, preserving their existing imagery while replacing sizing with their technical dimensions.
- Keep basket and WhatsApp actions frontend-only; no checkout, persistence, or backend integration.

## Validation

- Verify desktop and mobile layouts, image selection/swiping, every size and stock state, quantity totals, basket feedback, WhatsApp link contents, dialog open/close and unit tabs, all accordions, non-apparel fallback behavior, and page metadata.

## Technical details

- Reuse the existing Button, Dialog, Tabs, Accordion, token system, Newsreader/Manrope typography, and local product imagery.
- Keep all color and state styling semantic, include accessible labels/table structure/focus behavior, and respect reduced-motion preferences.
