# Sukoon House — Medusa Snapshot Files

These JSON files are **development fixtures** generated from the local Medusa.js v2 backend.  
They exist so that Lovable and cloud development environments can work with real product data  
without requiring a live connection to the local backend.

---

## Purpose

| File | Contents |
|------|----------|
| `medusa-products.json` | All products with variants, pricing, images, categories, options |
| `medusa-categories.json` | All product categories and their hierarchy |
| `medusa-collections.json` | All product collections |
| `medusa-regions.json` | Configured regions (India, currency, countries) |
| `snapshot-manifest.json` | Export metadata (timestamp, counts, source) |

---

## Source of Truth

**Medusa remains authoritative.**

These snapshots are read-only copies. Do not manually edit them.  
To update them, re-run the export after making changes in Medusa Admin.

---

## Generation

Make sure the local Medusa backend is running first:

```bash
# In one terminal — start Medusa backend
cd web/backend/apps/backend
npx medusa start
```

Then export from the frontend directory:

```bash
# In another terminal
cd web/frontend
npm run snapshot:export
npm run snapshot:validate
```

---

## Files Explained

### `medusa-products.json`

Medusa Store API product response. Each product includes:
- `id`, `handle`, `title`, `description`, `subtitle`, `status`
- `thumbnail`, `images[]` — product images with URLs
- `options[]` — e.g. Size, Color
- `variants[]` — each variant has `id`, `sku`, `title`, `options`, `calculated_price`
- `categories[]` — linked product categories
- `collection` — linked collection if any
- `tags[]`
- `metadata` — custom fields (e.g. `mrp`, `original_price`)

### `medusa-categories.json`

Product category tree from the Medusa Store API.  
Sukoon House's seven family pillars are expected here:
- Women, Men, Children, Prayer & Worship, Learning & Books, Home & Lifestyle, Gifts & Occasions

### `medusa-collections.json`

Merchandising collections (e.g. New Arrivals, Eid Edit, Ramadan, Jummah, Family Essentials, Gifting).

### `medusa-regions.json`

Region configuration — India (INR currency) and any other configured regions.

### `snapshot-manifest.json`

Metadata about the export: timestamp, record counts, export version.

---

## Update Workflow

```
1. Add or update products in Medusa Admin
2. Verify inventory / prices / variants are correct
3. Start Medusa (if not already running)
4. npm run snapshot:export
5. npm run snapshot:validate
6. Commit the updated snapshot files
7. Upload / sync into Lovable
```

---

## Important Rules

- **Snapshots are not a replacement for the live Medusa API.**  
  For production, the storefront must connect to the real Medusa backend.

- **Never edit these files by hand.**  
  Run the exporter to regenerate them from source.

- **Never commit secrets.**  
  These files contain only public catalog information.  
  The exporter actively checks for and refuses to write secrets.

- **Local image URLs won't render in Lovable.**  
  If images are stored only on your local machine, upload them to a CDN  
  and update the Medusa product records before exporting.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot reach Medusa at http://localhost:9000` | Start Medusa: `npx medusa start` |
| `MEDUSA_PUBLISHABLE_KEY missing` | Set in `.env` or shell: `export MEDUSA_PUBLISHABLE_KEY=pk_...` |
| Products have no pricing | Ensure a region exists with currency configured |
| Images show local URLs | Upload images to a CDN, update Medusa product records, re-export |
| Validation fails with duplicate IDs | Database integrity issue in Medusa — run `medusa db:sync` |
