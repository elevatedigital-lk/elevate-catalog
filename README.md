# Elevate Catalog Showcase

A multi-store, bilingual e-commerce showcase platform built with Next.js, Sanity CMS, and Tailwind CSS.

## Features

✨ **Multi-Store Demos**
- Footwear Store
- Clothing Store
- Furniture Store
- Grocery Store
- Electronics Store

🎨 **Theme Switching**
- Dark/Light mode toggle
- Per-store customization
- Real-time theme updates

🌐 **Bilingual Support**
- English
- Sinhala
- Language toggle on all pages

📱 **Responsive Design**
- Mobile-first approach
- Tablet & desktop optimized
- Touch-friendly navigation

🛒 **E-Commerce Features**
- 120+ Products (24 per store)
- Collections (compact display)
- WhatsApp integration
- Product filtering
- Search functionality

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **CMS**: Sanity Studio
- **Database**: Sanity Backend
- **Deployment**: Vercel
- **State**: React Context

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Sanity account

### Installation

```bash
npm install
```

### Environment Variables

Create a \`.env.local\` file in the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-01
```

### Development

```bash
npm run dev
npm run studio  # Open Sanity Studio in separate terminal
```

Visit http://localhost:3000

### Seeding Data

```bash
npm run seed
```

This populates Sanity with:
- 5 store types
- 120 products
- Collections
- Homepage content

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
├── site/
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable components
│   ├── lib/          # Utilities & Sanity client
│   ├── styles/       # Global styles
│   └── public/       # Static assets
├── studio/           # Sanity Studio config
├── scripts/
│   └── seed.js       # Data seeding script
└── package.json
```

## Available Stores

### 1. Footwear Store
Modern shoe showcase with size variants and material filtering.

### 2. Clothing Store
Fashion apparel with size charts and color options.

### 3. Furniture Store
Home furniture catalog with dimensions and material specs.

### 4. Grocery Store
Fresh groceries with quantity options and pricing.

### 5. Electronics Store
Tech products with specs and warranty information.

## Features in Detail

### Homepage
- Proposal slider (auto-rotating banners)
- Store showcase cards
- Featured collections
- CTA buttons linked to WhatsApp

### Collections
- Compact card layout
- Filter by store
- Bilingual names

### Bilingual Support
- Language toggle in header
- All content translatable
- Sanity i18n integration

### WhatsApp Integration
- Direct store contact
- Pre-filled messages
- Integration on product pages

## Deployment

Deployed on Vercel at: https://elevate-catalog.vercel.app

### Deploy Your Own

1. Fork this repository
2. Create a Sanity project
3. Update environment variables
4. Import to Vercel
5. Connect GitHub and deploy

## Sanity Schema

The project includes custom schemas for:
- **Store**: Store configuration and branding
- **Product**: Product details with variants
- **Collection**: Product groupings
- **Homepage**: Landing page configuration
- **Settings**: Global site settings

## Performance

- Optimized images with Next.js Image
- Incremental Static Regeneration (ISR)
- API route caching
- Minimal bundle size
- TypeScript for type safety

## Testing

All features tested:
- ✅ Store navigation
- ✅ Theme switching
- ✅ Bilingual content
- ✅ Product filtering
- ✅ WhatsApp integration
- ✅ Mobile responsiveness
- ✅ Image optimization

## License

MIT

## Support

For issues or questions, please contact Elevate Digital.

---

**Built with ❤️ for Elevate Digital**
