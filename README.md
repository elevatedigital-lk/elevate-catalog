# Beto Shoes — Shareable Catalog

Simple, 100% free shoe catalog site for WhatsApp sharing. Built for a friend's
business (Beto) — potential future Elevate client if this takes off.

## Live links

- **Customer-facing site (share this on WhatsApp):** https://beto-shoes.vercel.app
- **Admin panel (add/remove products, upload photos):** https://beto-shoes.sanity.studio
  - Log in with the same Google/GitHub account used to create the Sanity project (dulajh.punchihewa@gmail.com via GitHub)
- **Code repo (private):** https://github.com/DulajHP/beto-shoes
- **Vercel project:** https://vercel.com/elevate-6e14/beto-shoes
- **Sanity project console:** https://www.sanity.io/manage/project/68c6eq6z

## Stack (all free tier)

- **Sanity.io** — headless CMS. Stores products (name, code, price, 1–5 images,
  category, type) + handles image hosting/CDN.
- **Next.js** — public site, fetches products live from Sanity on every page
  load (no rebuild needed when you add/remove products or edit taxonomy).
- **Vercel** — hosting for the Next.js site, free `.vercel.app` subdomain.
- **GitHub** — code backup, under DulajHP account.

## How to update products (day-to-day use)

1. Go to https://beto-shoes.sanity.studio
2. Click "Product" → "+ Create new"
3. Fill in: Product Name (English + optional Sinhala), Product Code (e.g.
   BT-101), Price (LKR), upload 1–5 images, toggle In Stock, pick Category and
   Type
4. Click **Publish** (top right) — site updates within seconds, no redeploy needed
5. To remove a product: open it → menu (•••) → Delete, then confirm

Demo products ("Classic Runner" BT-101, "Trail Sprinter" BT-205) are live right
now — delete or edit them before sharing the link with real customers.

## Categories, Types & Filters

- "Category" (Men / Women / Kids) and "Type" (Casual / Office / Sports /
  Sneakers / Sandals / Boots) are their own document types in the Studio
  sidebar — add/edit/remove them there any time, no code changes needed.
- Each Product references one Category and one Type.
- The public site shows a filter bar (Category, Type, min/max price, in-stock
  toggle) above the product grid — all filtering happens instantly in the
  browser, no reload.

## Bilingual (English / Sinhala)

- First-time visitors see a language picker (English / සිංහල); their choice is
  remembered (localStorage), with a small EN/සිං toggle in the header to switch
  any time.
- All UI labels, the WhatsApp message template, and Category/Type names are
  translated — see `site/src/i18n.ts` for the full dictionary (easy to edit:
  one object per language, just strings).
- Product names, Category names, and Type names each have an optional Sinhala
  field (`nameSi`) in the Studio — if left blank, the English name is shown as
  a fallback when a customer is browsing in Sinhala.
- Uses Google's free "Noto Sans Sinhala" font (via `next/font/google`) so
  Sinhala text renders correctly on all devices.

## WhatsApp inquire button

Each product card has a green "Inquire on WhatsApp" button that opens a chat to
+94 77 270 5267 with a pre-filled message (in the customer's chosen language)
including the product name, code, and price.
To change the number: edit `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel project env vars
(Settings → Environment Variables) and redeploy.

## If this becomes a paying client project later

Payment gateway (Stripe doesn't support Sri Lanka payouts directly — PayHere is the
usual local alternative) can be added as new pages/API routes in the same Next.js app.
Product data already lives in Sanity, so no migration needed — just new checkout code.

## Code locations

- `studio/` — Sanity Studio (schema + admin UI config)
  - `schemaTypes/product.ts`, `category.ts`, `productType.ts`
  - `seed*.js` — one-off scripts used to create demo data (need `SANITY_TOKEN` env var)
- `site/` — Next.js frontend
  - `src/i18n.ts` — all English/Sinhala UI text in one file
  - `src/components/LanguageProvider.tsx`, `LanguagePicker.tsx`, `LanguageToggle.tsx`
  - `src/components/CatalogClient.tsx` — filter bar + product grid

## Local dev

```bash
cd site && npm run dev        # http://localhost:3000
cd studio && npm run dev      # local studio at http://localhost:3333
```
