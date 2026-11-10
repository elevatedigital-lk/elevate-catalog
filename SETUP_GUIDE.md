# Elevate Catalog — Setup & Deployment Guide

## 📋 Pre-Deployment Checklist

- [ ] Node.js 18+ installed
- [ ] Sanity account created (free tier at sanity.io)
- [ ] GitHub account with elevate-digital-lk org access
- [ ] Vercel account (free at vercel.com)
- [ ] WhatsApp Business number or personal WhatsApp number for inquiries

## 🔧 Setup Steps (Detailed)

### Step 1: Clone & Install (5 min)

```bash
# Clone the repo
git clone https://github.com/elevatedigital-lk/elevate-catalog.git
cd elevate-catalog

# Install all dependencies (site + studio)
npm install

# Install workspace dependencies
npm install -w site -w studio
```

**Verify installation:**
```bash
npm ls | head -20  # Should show installed packages
node --version     # Should be v18+
```

### Step 2: Create Sanity Project (10 min)

If you don't have a Sanity project yet:

```bash
cd studio
sanity init
```

Follow prompts to create a new project. You'll get:
- Project ID (save this!)
- Dataset name (usually "production")
- Authentication token

**Or use existing project:**
If you already have a Sanity project ID, skip the above and get your token:

1. Go to https://manage.sanity.io
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token (name: "elevate-catalog-seed")
5. Save the token value

### Step 3: Configure Environment Variables (5 min)

Create `site/.env.local`:

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=68c6eq6z
NEXT_PUBLIC_SANITY_DATASET=production

# Optional but recommended
NEXT_PUBLIC_WHATSAPP_NUMBER=94771234567
```

Replace:
- `68c6eq6z` → your Sanity project ID
- `94771234567` → your WhatsApp number

### Step 4: Seed Sample Data (10 min)

```bash
# Set your authentication token
export SANITY_AUTH_TOKEN="your_token_from_step_2"

# Run the seed script
npm run seed

# Output should show:
# ✓ Created store type: Footwear Store
# ✓ Created store type: Clothing Store
# ... (5 store types total)
# ✓ Created 120 products
# ✓ Created homepage content
```

**Verify in Sanity Studio:**
```bash
npm run studio
# Open http://localhost:3333
# Click "Product" → should see 120 products
# Click "Store Type" → should see 5 stores
```

### Step 5: Test Locally (10 min)

```bash
# Start Next.js frontend
npm run dev

# Visit http://localhost:3000
# Test:
# ✓ Homepage loads with banners
# ✓ /demo shows store dropdown
# ✓ Switch between stores works
# ✓ Language toggle (EN/සිංහල) works
# ✓ WhatsApp button opens chat
```

### Step 6: Deploy to Vercel (15 min)

#### 6a. Push to GitHub

```bash
git add .
git commit -m "Add Elevate Catalog multi-store showcase with 5 themes"
git push origin main
```

#### 6b. Create Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Choose:
# ? Set up and deploy "~/elevate-catalog"? (Y/n) → Y
# ? Which scope should contain your new project? → elevatedigital-lk
# ? Link to existing project? (y/N) → N
# ? What's your project's name? → elevate-catalog
# ? In which directory is your code? → ./site
# ? Want to modify these settings? (y/N) → N
```

#### 6c. Add Environment Variables

After deployment, add to Vercel:

```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Paste: 68c6eq6z

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Paste: production

vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER
# Paste: 94771234567
```

**Or in Vercel Dashboard:**
1. Go to https://vercel.com/elevatedigital-lk/elevate-catalog
2. → Settings → Environment Variables
3. Add:
   - Key: `NEXT_PUBLIC_SANITY_PROJECT_ID` | Value: `68c6eq6z`
   - Key: `NEXT_PUBLIC_SANITY_DATASET` | Value: `production`
   - Key: `NEXT_PUBLIC_WHATSAPP_NUMBER` | Value: `94XXXXXXXXX`
4. Redeploy (click "Deployments" → latest → "Redeploy")

#### 6d. Verify Deployment

Visit: https://elevate-catalog.vercel.app (or your custom domain)

Test:
- ✓ Homepage loads
- ✓ Banners auto-rotate
- ✓ Demo page accessible
- ✓ Store switching works
- ✓ Products load
- ✓ Filtering works
- ✓ WhatsApp integration

### Step 7: Custom Domain (Optional, 5 min)

In Vercel Dashboard:

1. Go to your project → Settings → Domains
2. Add custom domain (e.g., `catalog.elevate-digital.lk`)
3. Update DNS records (usually 5–10 min propagation)

## 🎯 File Changes Summary

### New Files Created

| File | Purpose |
|------|---------|
| `studio/schemaTypes/storeType.ts` | Store type CMS schema |
| `studio/schemaTypes/homepageContent.ts` | Homepage CMS schema |
| `site/src/components/BannerSlider.tsx` | Homepage carousel |
| `site/src/components/ProposalSection.tsx` | Proposal content display |
| `site/src/components/StoreTypeDropdown.tsx` | Theme/store selector |
| `site/src/app/demo/page.tsx` | Demo showcase page |
| `scripts/seed.mjs` | Data seeding script |
| `package.json` | Root workspace config |

### Modified Files

| File | Changes |
|------|---------|
| `studio/schemaTypes/index.ts` | Added storeType, homepageContent |
| `site/src/app/page.tsx` | Added banners, proposal, CTA |
| `site/src/sanity.ts` | Added new types & queries |
| `README.md` | Complete rewrite with new features |

## 🔍 Verification Checklist

After deployment, verify:

### Frontend
- [ ] Homepage `/` loads with banners (auto-rotate every 5s)
- [ ] Proposal V4 content displays below banners
- [ ] "See Demo" CTA button works
- [ ] `/demo` page loads with store dropdown
- [ ] Store dropdown shows 5 options
- [ ] Switching stores updates products
- [ ] Language toggle works (EN/සිංහල)
- [ ] Products show price, image, WhatsApp button
- [ ] Filtering works (category, price, stock)
- [ ] Collections display (if data seeded)

### CMS (Sanity Studio)
- [ ] Product count: 120 (24 × 5 stores)
- [ ] Store Types: 5 (Footwear, Clothing, etc.)
- [ ] Homepage Content: 1 document with banners
- [ ] All products have codes and prices

### Mobile
- [ ] Homepage responsive on iPhone SE (375px)
- [ ] Demo page accessible on mobile
- [ ] WhatsApp button opens on mobile
- [ ] Banners display properly on small screens
- [ ] Text readable without zooming

## 📱 Testing Scenarios

### Scenario 1: New Visitor
1. Visit homepage
2. See banner carousel
3. Read proposal content
4. Click "See Demo"
5. Land on demo page
6. See Footwear Store by default

### Scenario 2: Store Switching
1. On demo page
2. Open store dropdown
3. Select "Clothing Store"
4. Products update
5. URL changes to `/demo?store=clothing`
6. Reload page — still shows Clothing Store

### Scenario 3: Language Switch
1. Visit site in English
2. Click language toggle (top-right)
3. Switch to සිංහල
4. All UI labels change
5. Product names show Sinhala
6. WhatsApp message in Sinhala
7. Switch back to English
8. Verify everything translates

### Scenario 4: Product Inquiry
1. Click WhatsApp button on product
2. WhatsApp Web opens (or WhatsApp app on mobile)
3. Pre-filled message includes:
   - Product code (e.g., "FW-001")
   - Product name
   - Price
4. Send message
5. Verify message received

## 🐛 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Cannot find Sanity project" | `NEXT_PUBLIC_SANITY_PROJECT_ID` not set | Add to `.env.local` |
| Products not loading | Sanity connection failed | Check project ID & dataset name |
| Banners not showing | No homepage content in Sanity | Run `npm run seed` |
| WhatsApp button broken | Phone number format wrong | Use `94XXXXXXXXX` (no + or spaces) |
| Sinhala text garbled | Font not loaded | Check browser DevTools → Network → fonts |
| Store dropdown not working | Missing StoreType data | Verify 5 stores in Sanity |
| Vercel deployment fails | Node modules too large | Delete `node_modules` & reinstall |
| Environment variables not applied | Vercel cache | Redeploy project |

## 📞 Support & Troubleshooting

### Quick Fixes

```bash
# Clear build cache & reinstall
rm -rf site/.next site/node_modules
npm install -w site
npm run build -w site

# Re-seed data
export SANITY_AUTH_TOKEN="your_token"
npm run seed

# Test Sanity connection
curl https://api.sanity.io/v2024-01-01/projects/68c6eq6z/datasets/production/documents

# Check Vercel logs
vercel logs
```

### Getting Help

1. **Local dev issues**: Check `/site` vs `/studio` folders and Node versions
2. **Sanity connection**: Verify project ID in `site/.env.local`
3. **Deployment issues**: Check Vercel Dashboard → Deployments → build logs
4. **WhatsApp**: Confirm phone number in `.env.local` or Sanity settings
5. **Performance**: Check "Deployments" in Vercel for build insights

---

## 🎉 Success Criteria

✅ You're done when:

1. **Local dev works**: `npm run dev` → http://localhost:3000 loads
2. **5 stores visible**: Demo page dropdown shows all 5 store types
3. **120 products loaded**: Each store shows 24 unique products
4. **Bilingual**: EN/සිංහල toggle works throughout
5. **Deployed**: Production URL at vercel.app (or custom domain)
6. **Tested**: All scenarios pass (see "Testing Scenarios" above)
7. **Shareable**: Ready to send link to prospects via WhatsApp/email

---

**Timeline**: ~2 hours from start to live deployment.  
**Questions?** Reach out to contact@elevate-digital.lk

Happy launching! 🚀
