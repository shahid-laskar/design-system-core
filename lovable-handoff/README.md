# Sukoon House — Complete Lovable Handoff Package

This directory provides the complete handoff package required for Lovable and cloud development environments to build the **Sukoon House** storefront with real commerce data and approved visual design specifications.

---

## Package Overview

```
lovable-handoff/
├── lovable-storefront-spec.md      # The authoritative 23-section design & implementation specification
├── README.md                       # This usage and integration guide
└── snapshot/                       # Authoritative Medusa.js v2 Store API fixtures
    ├── medusa-products.json        # All products with variants, INR prices, options, categories
    ├── medusa-categories.json      # All 7 family pillar categories and hierarchy
    ├── medusa-collections.json     # Merchandising collections (Eid, Everyday, Jummah)
    ├── medusa-regions.json         # Region configuration (India / INR currency)
    ├── snapshot-manifest.json      # Export metadata, record counts, and timestamps
    └── medusa-store-snapshot.json  # Consolidated single-file snapshot
```

---

## Two Complementary Pillars

| Artifact | Role & Purpose |
| :--- | :--- |
| **`lovable-storefront-spec.md`** | **The Implementation & Design Blueprint:** Explains *how* the storefront must look and behave: brand positioning, Warm Indian Jewel palette tokens, page rendering order, PDP hierarchy, mobile sticky actions, size charts, cart thresholds, and accessibility standards. |
| **`snapshot/*.json`** | **The Real Commerce Fixtures:** Real product, category, variant, and pricing data exported directly from the local Medusa.js v2 Store API. These provide faithful development mocks so Lovable never relies on fabricated product info. |

---

## How to Supply This Package to Lovable

1. **Upload Fixtures:**  
   Copy the `snapshot/` JSON files into your Lovable workspace under `src/fixtures/` or `public/mock/`.
2. **Provide Specification:**  
   Prompt Lovable using `lovable-storefront-spec.md` as the context document to guide the layout, visual tokens, and component behavior.
3. **Connect Adapter:**  
   Point the storefront adapter (`src/lib/commerce/client.ts`) to read from the snapshot fixtures during development.
4. **Zero Refactoring on Production:**  
   When connecting to the live Medusa backend in staging or production, simply configure `VITE_MEDUSA_BACKEND_URL` and `VITE_MEDUSA_PUBLISHABLE_KEY`. The data structure is identical.

---

## Regenerating the Snapshot

To update the snapshot data after modifying products, categories, or prices in the Medusa Admin:

```bash
# 1. Ensure the Medusa backend is running
cd /opt/lifestyle-web/web/backend
docker compose up -d backend

# 2. Export and validate the snapshot
cd /opt/lifestyle-web/web/frontend
npm run snapshot:export
npm run snapshot:validate

# 3. Refresh the handoff snapshot directory
cp /opt/lifestyle-web/web/frontend/lovable-snapshot/medusa-*.json /opt/lifestyle-web/lovable-handoff/snapshot/
cp /opt/lifestyle-web/web/frontend/lovable-snapshot/snapshot-manifest.json /opt/lifestyle-web/lovable-handoff/snapshot/
```
