# Elevate Catalog — Professional Theme-Based Showcase

A modern, multi-store product catalog platform built with Next.js 16, React 19, Sanity CMS, and Tailwind CSS. Deploy 5 professional store demos (Footwear, Clothing, Furniture, Grocery, Electronics) from a single codebase with instant bilingual support (English + Sinhala), banner sliders, proposal integration, and WhatsApp integration.

## 🚀 Features

✅ **5 Professional Store Demos** — One codebase, five complete e-commerce experiences  
✅ **Bilingual Support** — English & Sinhala throughout (UI, content, WhatsApp)  
✅ **Theme Switching** — Instant theme changes via URL parameters and dropdown  
✅ **24 Products per Store** — Real inventory management per store type  
✅ **Collections** — Compact, contextual product grouping  
✅ **WhatsApp Integration** — Direct customer engagement with pre-filled messages  
✅ **Banner Slider** — 3-image carousel on homepage with auto-rotation  
✅ **Proposal Integration** — Homepage displays Proposal V4 content (HTML embed or Sanity-managed)  
✅ **Mobile Responsive** — Fully optimized for all devices  
✅ **Production Ready** — Vercel deployment ready  
✅ **Headless CMS** — Sanity for dynamic content management  

## Live Links

- **Main Demo**: https://elevate-catalog.vercel.app
- **Admin Panel (Sanity Studio)**: https://[PROJECT_ID].sanity.studio
- **GitHub Repo**: https://github.com/elevatedigital-lk/elevate-catalog

## 📋 Store Types Included

1. **Footwear Store** (👟) — Shoes, boots, sandals, sports wear
2. **Clothing Store** (👕) — Apparel, fashion, casual & formal wear
3. **Furniture Store** (🛋️) — Home furniture, office solutions
4. **Grocery Store** (🛒) — Fresh produce, organic items, pantry staples
5. **Electronics Store** (📱) — Gadgets, computers, mobile devices

Each store has:
- 24 unique products with pricing
- Store-specific collections
- Filtered browsing (category, price, stock)
- WhatsApp contact option
- Professional branding

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **CMS**: Sanity (headless)
- **Deployment**: Vercel
- **Languages**: TypeScript
- **Package Manager**: npm (workspaces)

## 📦 Project Structure

```
elevate-catalog/
├── site/                    # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx    # Homepage with proposal + banners
│   │   │   ├── demo/       # Demo showcase page
│   │   │   ├── how-to-order/
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── BannerSlider.tsx        # (NEW) Homepage carousel
│   │   │   ├── ProposalSection.tsx     # (NEW) Proposal V4 content
│   │   │   ├── StoreTypeDropdown.tsx   # (NEW) Theme selector
│   │   │   ├── CatalogClient.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── ... (other components)
│   │   ├── sanity.ts       # Sanity queries (extended)
│   │   └── i18n.ts         # Bilingual support
│   └── package.json
│
├── studio/                  # Sanity CMS studio
│   ├── schemaTypes/
│   │   ├── storeType.ts         # (NEW) Store type configuration
│   │   ├── homepageContent.ts   # (NEW) Homepage blocks
│   │   ├── product.ts
│   │   ├── collection.ts
│   │   ├── category.ts
│   │   ├── productType.ts
│   │   ├── offer.ts
│   │   ├── siteSettings.ts
│   │   └── index.ts
│   ├── sanity.config.ts
│   └── package.json
│
├── scripts/
│   └── seed.mjs             # (NEW) Data seeding script
│
├── package.json             # Root workspace config
└── README.md
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (free tier available at sanity.io)
- GitHub account
- Vercel account (for deployment)

### 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/elevatedigital-lk/elevate-catalog.git
cd elevate-catalog

# Install dependencies (uses npm workspaces)
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the `site/` directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=68c6eq6z
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WHATSAPP_NUMBER=94771234567
```

### 4. Seed Sample Data

Get your Sanity authentication token from [Sanity Manage](https://manage.sanity.io) → API → Tokens, then:

```bash
export SANITY_AUTH_TOKEN="your_sanity_token_here"
npm run seed
```

This creates:
- ✅ 5 store types (Footwear, Clothing, Furniture, Grocery, Electronics)
- ✅ 120 products total (24 per store)
- ✅ Homepage content with proposal sections
- ✅ Sample collections per store

### 5. Start Development

```bash
# Frontend (Next.js)
npm run dev

# Sanity Studio (separate terminal, optional)
npm run studio
```

Visit:
- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333
- **Demo Page**: http://localhost:3000/demo

## 📱 Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with Proposal V4 + banner slider + CTA |
| `/demo` | Demo showcase (default: Footwear Store) |
| `/demo?store=footwear` | Footwear Store demo |
| `/demo?store=clothing` | Clothing Store demo |
| `/demo?store=furniture` | Furniture Store demo |
| `/demo?store=grocery` | Grocery Store demo |
| `/demo?store=electronics` | Electronics Store demo |
| `/how-to-order` | Customer instructions |

## 🎨 Customization

### Change Store Types

Edit `scripts/seed.mjs`:

```javascript
const storeTypes = [
  {
    name: 'Your Store Name',
    nameSi: 'ඔබේ ගබඩා නම',
    slug: {current: 'your-slug'},
    icon: '🎯',
    primaryColor: '#FF6B6B',
    order: 1,
    isDefault: true, // Shows on /demo load
  },
  // ... more stores
]
```

Then re-run: `npm run seed`

### Update Homepage Content

1. Go to Sanity Studio: `npm run studio`
2. Navigate to **Homepage Content**
3. Edit banners, proposal sections, CTA button text
4. Changes appear on `/` immediately (ISR enabled)

### Modify Proposal Content

**Option 1: HTML Embed** (for Proposal V4.html)
1. Open Sanity Studio
2. Go to **Homepage Content** → **Proposal V4 Content**
3. Paste HTML from `ELEVATE_CATALOG_PROPOSAL_V4.html`
4. Set **Show Proposal Sections** to `false`

**Option 2: Managed Sections** (recommended for live editing)
1. Set **Show Proposal Sections** to `true`
2. Add/edit sections: Problem → Solution → Features → Pricing → ROI → CTA
3. Support bilingual content (EN + SI)

### Manage Products

1. Open Sanity Studio
2. Create/edit products under **Product**
3. Link to store type via categories/collections
4. Upload images, set prices, manage inventory
5. Publish — site updates instantly

### Adjust Collections

Collections are smaller, sidebar-style groupings:

1. In Sanity Studio, go to **Collection**
2. Create collections like "Men's Shoes", "Women's Shoes"
3. Link products to collections
4. Products filter by collection on the demo page

## 🌍 Bilingual Support (English + Sinhala)

All content supports two languages natively:

### UI Elements
- File: `site/src/i18n.ts`
- Language picker in header (EN / සිංහල)
- Choice saved to localStorage

### Products & Taxonomy
- Product `name` (EN) + `nameSi` (SI)
- Category `name` + `nameSi`
- Type `name` + `nameSi`
- Fallback: Shows English if Sinhala not provided

### Homepage
- Banners: `headingEn`, `headingSi`, `subheadingEn`, `subheadingSi`
- Proposal sections: `titleEn`, `titleSi`, `contentEn`, `contentSi`
- CTA buttons: `ctaButtonEn`, `ctaButtonSi`

### WhatsApp Messages
- Auto-translated to customer's current language
- Product code, name, price included
- Format: "👟 FW-001: Classic Leather Oxford — ₨15,000"

## 💰 Product Pricing

Sample data includes realistic prices per category:

| Category | Price Range | Examples |
|----------|-------------|----------|
| Footwear | ₨3,000–22,000 | FW-001 to FW-024 |
| Clothing | ₨2,500–15,000 | CL-001 to CL-024 |
| Furniture | ₨2,500–45,000 | FR-001 to FR-024 |
| Grocery | ₨200–3,500 | GR-001 to GR-024 |
| Electronics | ₨1,000–185,000 | EL-001 to EL-024 |

Edit prices anytime in Sanity Studio.

## 🔗 WhatsApp Integration

Each product shows a green "Inquire on WhatsApp" button:

```
Message template (bilingual):
👟 FW-001: Classic Leather Oxford — ₨15,000
I'm interested in this product. Please send me more details.
```

### Configure Phone Number

Update in Sanity Studio → **Site Settings** → **WhatsApp Number** (format: `94XXXXXXXXX`)

Or use environment variable in `site/.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=94771234567
```

## 📊 CMS Schema Overview

### Store Types (`storeType`)
- `name`, `nameSi` — Display names
- `slug` — URL identifier (e.g., "footwear")
- `icon` — Emoji icon
- `primaryColor` — Brand accent color (hex)
- `order` — Display priority in dropdown
- `isDefault` — Show on `/demo` load

### Products (`product`)
- `code` — Unique identifier (e.g., "FW-001")
- `name`, `nameSi` — Product names
- `price` — Price in LKR
- `images` — 1–5 product photos
- `inStock` — Availability toggle
- `category` — Reference to category
- `productType` — Reference to type
- `colors`, `sizes` — Variants (optional)
- `description`, `descriptionSi` — Details

### Collections (`collection`)
- `name`, `nameSi` — Collection names
- `slug` — URL identifier
- `products` — Reference to products
- `description`, `descriptionSi` — Details
- `order` — Display priority

### Homepage Content (`homepageContent`)
- `title` — Page title
- `banners` — 3 carousel slides with images & text
- `proposalV4Content` — Raw HTML embed (paste from V4.html)
- `showProposalSections` — Toggle between HTML and sections
- `proposalSections` — Structured content blocks
- `ctaButtonEn`, `ctaButtonSi` — CTA text

### Categories & Types (existing)
- `category` — Men, Women, Kids, etc.
- `productType` — Casual, Office, Sports, etc.

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial Elevate Catalog with 5 store types"
git push origin main
```

### 2. Connect to Vercel

```bash
npm install -g vercel
vercel
```

Follow prompts:
- Link your GitHub repo
- Set environment variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=68c6eq6z`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER=94XXXXXXXXX`
- Deploy

### 3. Custom Domain

In Vercel dashboard → Project Settings → Domains  
Add your domain (e.g., `catalog.elevate-digital.lk`)

### 4. Enable Revalidation (optional)

In `site/next.config.ts`:

```typescript
export default nextConfig = {
  revalidate: 60, // Revalidate every 60 seconds
}
```

## 🎯 Daily Operations

### Adding a New Product

1. Go to Sanity Studio
2. Click **Products** → **+ Create new**
3. Fill in:
   - Code (e.g., "FW-025")
   - Name (EN + SI)
   - Price
   - Images (upload 1–5)
   - Category & Type
   - In Stock toggle
4. Click **Publish** — site updates in seconds

### Creating an Offer/Sale

1. Go to Sanity Studio
2. Click **Offer** → **+ Create new**
3. Fill in:
   - Title
   - Banner text (EN + SI)
   - Discount % (optional)
   - Start date & end date
   - Select products
4. Click **Publish**
5. Banner appears automatically on the date range

### Updating Homepage

1. Go to Sanity Studio
2. Click **Homepage Content**
3. Edit:
   - Banner images & text
   - Proposal sections (or paste HTML)
   - CTA button text
4. Click **Publish** — homepage updates immediately

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module 'sanity'" | `cd site && npm install` then `cd ../` |
| Products not showing | Check `.env.local` has correct `NEXT_PUBLIC_SANITY_PROJECT_ID` |
| Seed script fails | Run `export SANITY_AUTH_TOKEN="..."` before `npm run seed` |
| Banner slider broken | Check banners in Sanity → Homepage Content |
| WhatsApp button not opening | Verify phone number format: `94XXXXXXXXX` |
| Language not switching | Check localStorage → clear & reload browser |
| Sinhala text looks wrong | Browser fonts loaded? Check Network tab in DevTools |

## 📚 Documentation & Resources

- **Next.js**: https://nextjs.org/docs
- **React 19**: https://react.dev
- **Sanity**: https://www.sanity.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs

## 📄 License

UNLICENSED — Internal use only

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes & test locally
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request with clear description

## 📞 Support & Questions

For issues, feature requests, or clarifications:
1. Check existing GitHub Issues
2. Create a new Issue with:
   - Clear title & description
   - Steps to reproduce (if bug)
   - Expected vs actual behavior
3. Contact: contact@elevate-digital.lk

---

**Built with ❤️ by Elevate Digital**  
Transforming product catalogs into engaging, scalable experiences.

---

## 🎯 Timeline Reference

| Phase | Effort | Status |
|-------|--------|--------|
| Build homepage + layout | 30 min | ✅ Done |
| Create 5 store demos with sample data | 45 min | ✅ Done |
| Add banner slider | 15 min | ✅ Done |
| Make collections compact | 15 min | ✅ Done |
| Deploy + verify | 15 min | 🔲 Next |
| **Total** | **~2 hours** | |

Start from "Quick Start" section above and you'll have a live, production-ready demo in under 2 hours.

Happy showcasing! 🚀
