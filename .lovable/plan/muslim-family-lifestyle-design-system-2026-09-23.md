# Muslim Family Lifestyle Design System

## Visual direction

Create one restrained, editorial identity inspired by a sunlit contemporary Muslim home: chalk plaster, deep olive, ink, muted clay, and a sparing mineral-blue accent. The system will feel tactile rather than glossy, with fine rules, quiet tonal surfaces, square-to-soft corners, generous whitespace, and purposeful asymmetry.

Typography will pair an expressive, highly readable editorial serif for display moments with a precise humanist sans-serif for commerce and interface text. Fonts will be loaded in the document head and mapped into centralized semantic tokens. Islamic identity will come through measured composition, warm household imagery, language, and cadence—not decorative motifs.

## Build

- Replace the starter palette with centralized semantic color, type, spacing, radius, shadow, and motion tokens, including accessible light and dark values where the existing system expects them.
- Refine the shared UI primitives for buttons, icon buttons, inputs, text areas, badges, dividers, sheets, alerts, and skeletons. Include clear hover, focus, disabled, invalid, and loading states with comfortable touch targets.
- Add reusable commerce and editorial patterns:
  - product card with image, category, name, price, optional previous price, variants, availability, and an obvious add action
  - editorial card with image, topic, title, summary, and reading metadata
  - loading, empty, error, and success state components
- Build a responsive global shell with a slim service message, understated wordmark treatment, desktop navigation, search/account/bag controls, functional mobile menu sheet, and a substantial editorial footer.
- Create `/design-system` as the internal reference page, demonstrating foundations, typography, palette, spacing, controls, cards, navigation, drawers, and every requested state in realistic retail contexts.
- Replace the blank `/` screen with a redirect to `/design-system`, keeping this phase focused solely on the requested foundation.
- Use a small cohesive set of generated still-life and family-home images for the product and editorial examples; no external hotlinks or decorative cliché imagery.
- Add page-specific titles, descriptions, and social metadata for both content routes.

## Interaction and responsive behavior

- Mobile first, with single-column sections and product grids that expand naturally at larger widths without becoming dense.
- No horizontal scrolling; stable image ratios and component dimensions prevent layout shift.
- Header controls, menu sheet, quantity/variant examples, dismissible states, and drawer demonstrations will be usable rather than static mockups.
- Motion will be limited to short fades, subtle image scale, underline travel, and sheet transitions, with reduced-motion support.

## Technical approach

- Keep TanStack Start, Tailwind v4, the existing component library, and existing icon set.
- Extend existing primitives instead of adding packages or parallel component systems.
- Organize the new brand-facing patterns into focused reusable component files, with all visual values expressed through semantic tokens.
- Validate the finished page at mobile and desktop sizes, including menu/drawer interaction, keyboard focus, text fit, overflow, and console errors.

## Scope boundaries

- No store backend, authentication, checkout, payments, database, or Shopify connection.
- Product and editorial content are representative design-system fixtures only.
- Any displayed brand name will be clearly treated as a replaceable working label, not a naming recommendation.
