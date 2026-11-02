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

- **Sanity.io** — headless CMS. Stores products (name, code, price, 1–5 images) + handles image hosting/CDN.
- **Next.js** — public site, fetches products live from Sanity on every page load (no rebuild needed when you add/remove products).
- **Vercel** — hosting for the Next.js site, free `.vercel.app` subdomain.
- **GitHub** — code backup, under DulajHP account.

## How to update products (day-to-day use)

1. Go to https://beto-shoes.sanity.studio
2. Click "Product" → "+ Create new"
3. Fill in: Product Name, Product Code (e.g. BT-101), Price (LKR), upload 1–5 images, toggle In Stock
4. Click **Publish** (top right) — site updates within seconds, no redeploy needed
5. To remove a product: open it → menu (•••) → Delete, then confirm

A demo product ("Classic Runner", code BT-101) is live right now — delete or edit it before sharing the link with real customers.

## WhatsApp inquire button

Each product card has a green "Inquire on WhatsApp" button that opens a chat to
+94 77 270 5267 with a pre-filled message including the product name, code, and price.
To change the number: edit `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel project env vars
(Settings → Environment Variables) and redeploy.

## If this becomes a paying client project later

Payment gateway (Stripe doesn't support Sri Lanka payouts directly — PayHere is the
usual local alternative) can be added as new pages/API routes in the same Next.js app.
Product data already lives in Sanity, so no migration needed — just new checkout code.

## Code locations

- `studio/` — Sanity Studio (schema + admin UI config)
- `site/` — Next.js frontend
- `studio/seed.js` — script used to create the demo product (needs SANITY_TOKEN env var)

## Local dev

```bash
cd site && npm run dev        # http://localhost:3000
cd studio && npm run dev      # local studio at http://localhost:3333
```
