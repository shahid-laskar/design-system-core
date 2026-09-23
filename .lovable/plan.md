# Collection experience

## Build
- Port the approved Sukoon House tokens, typography, motion rules, and canonical brand primitives without visual redesign.
- Add the shared SiteShell and update “The collection” navigation to `/collection` on desktop and mobile.
- Build `/collection` with editorial introduction, category tabs, count, sorting, desktop filters, mobile filter sheet, responsive product grid, empty state, and load-more control.
- Use realistic local mock products and repository product imagery; keep all filtering and sorting in the browser with no backend.

## Components
- Reuse the canonical `PageContainer`, `Eyebrow`, `SectionHeading`, `ProductCard`, `StatusState`, `Sheet`, and existing form/button primitives.
- Preserve the approved component APIs and styling; only add collection-specific composition and state.

## Verification
- Check filtering, sorting, clearing filters, mobile drawer, and load-more behavior in the running preview.
- Verify desktop and mobile layouts, route metadata, and current build diagnostics with no TypeScript or lint errors.
