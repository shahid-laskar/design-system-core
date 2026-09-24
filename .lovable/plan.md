# Family Store Global Shell

## Goal
Update the shared Sukoon House shell for the seven family shopping pillars while preserving the approved Earth & Stone styling, typography, spacing, and layout primitives.

## Changes
- Replace the announcement copy and restyle it as a calm chalk-toned strip with a subtle divider.
- Centralize the seven pillars, their subcategories, and occasion links in the shared shell configuration.
- Rebuild desktop navigation with type-safe collection links, active/hover underlines, an Occasions menu, and existing search/cart utilities.
- Rebuild the mobile Sheet with accordion groups for all seven pillars and the requested support links.
- Make the shopping bag open a controlled Sheet, with an optional `onCartOpen` callback for future cart integration and a dynamic count prop.
- Replace the footer with the requested four-column brand, shopping, customer-care, and trust/newsletter layout plus the new legal bar.
- Keep collection route query strings intact and avoid changes to product data, styling tokens, or backend behavior.

## Validation
- Check the shared shell and menu interactions at 1440px desktop and 375px mobile.
- Confirm all pillar links include the correct `category` query parameter, drawers open and close, and no horizontal overflow appears.
- Confirm the current preview builds without errors.

## Boundaries
No redesign, new commerce functionality, backend integration, or edits to global color, typography, container, or breakpoint definitions.
