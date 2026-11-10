#!/usr/bin/env node

import {createClient} from '@sanity/client'
import {v4 as uuid} from 'uuid'

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN, // Must be set before running
  useCdn: false,
})

const storeTypes = [
  {
    name: 'Footwear Store',
    nameSi: 'පාදුරු ගබඩාව',
    slug: {current: 'footwear'},
    description: 'Quality footwear for every occasion',
    descriptionSi: 'සෑම අවස්ථාවක් සඳහා ගුණාත්මක පාදුරු',
    icon: '👟',
    primaryColor: '#1a1a1a',
    order: 1,
    isDefault: true,
  },
  {
    name: 'Clothing Store',
    nameSi: 'ඇඳුම් ගබඩාව',
    slug: {current: 'clothing'},
    description: 'Trendy apparel and fashion',
    descriptionSi: 'ට්‍රෙන්ඩි ඇඳුම් සහ ෆ්‍යෂන්',
    icon: '👕',
    primaryColor: '#2563eb',
    order: 2,
    isDefault: false,
  },
  {
    name: 'Furniture Store',
    nameSi: 'ගෘහසර ගබඩාව',
    slug: {current: 'furniture'},
    description: 'Modern and classic furniture',
    descriptionSi: 'ඉතිරුම් සහ සම්භාව්‍ය ගෘහසර',
    icon: '🛋️',
    primaryColor: '#7c3aed',
    order: 3,
    isDefault: false,
  },
  {
    name: 'Grocery Store',
    nameSi: 'ග්‍රෝසරි ගබඩාව',
    slug: {current: 'grocery'},
    description: 'Fresh and organic groceries',
    descriptionSi: 'නැවුම් සහ ඉතින් ග්‍රෝසරි',
    icon: '🛒',
    primaryColor: '#059669',
    order: 4,
    isDefault: false,
  },
  {
    name: 'Electronics Store',
    nameSi: 'ඉලෙක්ට්‍රොනික්‍ස ගබඩාව',
    slug: {current: 'electronics'},
    description: 'Latest gadgets and electronics',
    descriptionSi: 'නවතම ගිනුම් සහ ඉලෙක්ට්‍රොනික්‍ස',
    icon: '📱',
    primaryColor: '#d97706',
    order: 5,
    isDefault: false,
  },
]

const sampleProducts = {
  footwear: [
    {code: 'FW-001', name: 'Classic Leather Oxford', price: 15000},
    {code: 'FW-002', name: 'Running Sports Shoes', price: 8500},
    {code: 'FW-003', name: 'Casual Sneakers', price: 6500},
    {code: 'FW-004', name: 'Formal Dress Shoes', price: 18000},
    {code: 'FW-005', name: 'Athletic Training Shoes', price: 9500},
    {code: 'FW-006', name: 'Slip-on Loafers', price: 7500},
    {code: 'FW-007', name: 'Canvas High-tops', price: 5500},
    {code: 'FW-008', name: 'Minimalist Flat Shoes', price: 4500},
    {code: 'FW-009', name: 'Waterproof Rain Boots', price: 8000},
    {code: 'FW-010', name: 'Lightweight Walking Shoes', price: 7000},
    {code: 'FW-011', name: 'Premium Leather Boots', price: 22000},
    {code: 'FW-012', name: 'Beach Sandals', price: 3000},
    {code: 'FW-013', name: 'Hiking Outdoor Boots', price: 12000},
    {code: 'FW-014', name: 'Basketball Performance Shoes', price: 10500},
    {code: 'FW-015', name: 'Soccer Football Cleats', price: 9000},
    {code: 'FW-016', name: 'Cross-training Shoes', price: 8000},
    {code: 'FW-017', name: 'Elegant Heeled Pumps', price: 9500},
    {code: 'FW-018', name: 'Comfortable Flat Shoes', price: 5500},
    {code: 'FW-019', name: 'Ankle Boots Suede', price: 10500},
    {code: 'FW-020', name: 'Slip-on Mules', price: 6000},
    {code: 'FW-021', name: 'Platform Sneakers', price: 7500},
    {code: 'FW-022', name: 'Minimalist Sandals', price: 3500},
    {code: 'FW-023', name: 'Thermal Winter Boots', price: 11000},
    {code: 'FW-024', name: 'Summer Espadrilles', price: 4500},
  ],
  clothing: [
    {code: 'CL-001', name: 'Classic T-Shirt', price: 2500},
    {code: 'CL-002', name: 'Denim Jeans Blue', price: 5500},
    {code: 'CL-003', name: 'Cotton Button-Up Shirt', price: 4500},
    {code: 'CL-004', name: 'Casual Chinos', price: 5000},
    {code: 'CL-005', name: 'Fleece Hoodie', price: 4500},
    {code: 'CL-006', name: 'Wool Cardigan', price: 6500},
    {code: 'CL-007', name: 'Summer Linen Shirt', price: 4000},
    {code: 'CL-008', name: 'Knit Sweater', price: 5500},
    {code: 'CL-009', name: 'Athletic Sports Jersey', price: 3500},
    {code: 'CL-010', name: 'Casual Shorts', price: 3000},
    {code: 'CL-011', name: 'Formal Dress Pants', price: 6500},
    {code: 'CL-012', name: 'Casual Bermuda Shorts', price: 3500},
    {code: 'CL-013', name: 'Premium Polo Shirt', price: 4000},
    {code: 'CL-014', name: 'Striped Long Sleeve', price: 3500},
    {code: 'CL-015', name: 'Windbreaker Jacket', price: 6000},
    {code: 'CL-016', name: 'Leather Jacket', price: 12000},
    {code: 'CL-017', name: 'Winter Parka Coat', price: 8500},
    {code: 'CL-018', name: 'Casual Blazer', price: 8000},
    {code: 'CL-019', name: 'Graphic Print Tee', price: 3000},
    {code: 'CL-020', name: 'Thermal Base Layer', price: 2500},
    {code: 'CL-021', name: 'Elegant Blouse', price: 5000},
    {code: 'CL-022', name: 'Combat Cargo Pants', price: 6000},
    {code: 'CL-023', name: 'Slim Fit Jeans', price: 6000},
    {code: 'CL-024', name: 'Designer Fashion Jacket', price: 15000},
  ],
  furniture: [
    {code: 'FR-001', name: 'Modern Sofa', price: 45000},
    {code: 'FR-002', name: 'Dining Table Set', price: 35000},
    {code: 'FR-003', name: 'Office Desk', price: 25000},
    {code: 'FR-004', name: 'Wooden Dining Chairs', price: 12000},
    {code: 'FR-005', name: 'Bookshelf', price: 18000},
    {code: 'FR-006', name: 'Coffee Table', price: 8000},
    {code: 'FR-007', name: 'Bed Frame', price: 32000},
    {code: 'FR-008', name: 'Nightstand', price: 8500},
    {code: 'FR-009', name: 'TV Stand', price: 15000},
    {code: 'FR-010', name: 'Office Chair', price: 12000},
    {code: 'FR-011', name: 'Armchair', price: 22000},
    {code: 'FR-012', name: 'Console Table', price: 10000},
    {code: 'FR-013', name: 'Shelving Unit', price: 16000},
    {code: 'FR-014', name: 'Wall Cabinet', price: 9000},
    {code: 'FR-015', name: 'Desk Organizer', price: 2500},
    {code: 'FR-016', name: 'Accent Table', price: 7000},
    {code: 'FR-017', name: 'Storage Bench', price: 11000},
    {code: 'FR-018', name: 'Reading Nook Chair', price: 18000},
    {code: 'FR-019', name: 'Side Table', price: 6000},
    {code: 'FR-020', name: 'Counter Stools', price: 9500},
    {code: 'FR-021', name: 'Cabinet Unit', price: 14000},
    {code: 'FR-022', name: 'Wardrobe Closet', price: 28000},
    {code: 'FR-023', name: 'Entryway Bench', price: 12000},
    {code: 'FR-024', name: 'Decorative Shelves', price: 5500},
  ],
  grocery: [
    {code: 'GR-001', name: 'Organic Whole Wheat Bread', price: 350},
    {code: 'GR-002', name: 'Fresh Free-Range Eggs', price: 450},
    {code: 'GR-003', name: 'Virgin Olive Oil', price: 1200},
    {code: 'GR-004', name: 'Organic Rice Bags', price: 650},
    {code: 'GR-005', name: 'Fresh Vegetables Bundle', price: 800},
    {code: 'GR-006', name: 'Organic Honey', price: 950},
    {code: 'GR-007', name: 'Premium Coffee Beans', price: 1100},
    {code: 'GR-008', name: 'Fresh Milk', price: 280},
    {code: 'GR-009', name: 'Natural Peanut Butter', price: 650},
    {code: 'GR-010', name: 'Organic Pasta Shapes', price: 400},
    {code: 'GR-011', name: 'Fresh Orange Juice', price: 550},
    {code: 'GR-012', name: 'Organic Lentils Dry', price: 580},
    {code: 'GR-013', name: 'Pure Maple Syrup', price: 1800},
    {code: 'GR-014', name: 'Fresh Fish Daily Catch', price: 2500},
    {code: 'GR-015', name: 'Organic Oat Cereal', price: 650},
    {code: 'GR-016', name: 'Fresh Seasonal Fruits', price: 1200},
    {code: 'GR-017', name: 'Premium Cheese Selection', price: 1800},
    {code: 'GR-018', name: 'Organic Greek Yogurt', price: 520},
    {code: 'GR-019', name: 'Fair Trade Chocolate', price: 750},
    {code: 'GR-020', name: 'Fresh Herbs Bundle', price: 200},
    {code: 'GR-021', name: 'Organic Almond Milk', price: 420},
    {code: 'GR-022', name: 'Wild Salmon Fillets', price: 3500},
    {code: 'GR-023', name: 'Premium Dark Chocolate', price: 850},
    {code: 'GR-024', name: 'Organic Berries Mix', price: 1300},
  ],
  electronics: [
    {code: 'EL-001', name: 'Smartphone Pro Max', price: 185000},
    {code: 'EL-002', name: 'Wireless Earbuds', price: 18000},
    {code: 'EL-003', name: 'Laptop Computer', price: 135000},
    {code: 'EL-004', name: 'Smart Watch', price: 45000},
    {code: 'EL-005', name: 'Tablet Device', price: 75000},
    {code: 'EL-006', name: 'HD Webcam', price: 8500},
    {code: 'EL-007', name: 'Mechanical Keyboard', price: 12000},
    {code: 'EL-008', name: 'Wireless Mouse', price: 5500},
    {code: 'EL-009', name: 'USB-C Hub', price: 4500},
    {code: 'EL-010', name: 'Portable Power Bank', price: 5000},
    {code: 'EL-011', name: 'Noise Canceling Headphones', price: 28000},
    {code: 'EL-012', name: '4K Camera', price: 95000},
    {code: 'EL-013', name: 'Smart Speaker', price: 12500},
    {code: 'EL-014', name: 'Monitor Display', price: 35000},
    {code: 'EL-015', name: 'External SSD Storage', price: 15000},
    {code: 'EL-016', name: 'Phone Stand', price: 2500},
    {code: 'EL-017', name: 'Wireless Charger', price: 4500},
    {code: 'EL-018', name: 'HDMI Cable Set', price: 1500},
    {code: 'EL-019', name: 'Screen Protector', price: 1000},
    {code: 'EL-020', name: 'Phone Case Premium', price: 3500},
    {code: 'EL-021', name: 'Laptop Stand', price: 5500},
    {code: 'EL-022', name: 'Desk Lamp LED', price: 6500},
    {code: 'EL-023', name: 'Portable Speaker', price: 8500},
    {code: 'EL-024', name: 'USB Hub Multi-port', price: 3500},
  ],
}

const homepageContent = {
  _type: 'homepageContent',
  title: 'Elevate Catalog - Professional Showcase',
  ctaButtonEn: 'See Demo',
  ctaButtonSi: 'ඩෙමෝ බලන්න',
  proposalSections: [
    {
      type: 'problem',
      titleEn: 'The Challenge',
      titleSi: 'අභිතැවෙණිය',
      contentEn:
        'Traditional product catalogs are static, slow, and disconnected. You need a modern solution that adapts to your business, engages customers instantly, and integrates with the tools they already use.',
      contentSi:
        'සම්භාව්‍ය නිෂ්පාදන ලැයිස්තුවලට ස්ථිතික, මෙතර සහ විසන්න්න. ඔබ ඔබේ ව්‍යවසාය අනුවර්තන කරන, තක්ෂණිකව ගනුසුරුවරුන්ට සම්බන්ධ වන, සහ ඔවුන් දැනටමත් භාවිතා කරන උපකරණ සමඟ ඒකාබද්ධ වන නවීන විසඳුමක් අවශ්‍ය.',
    },
    {
      type: 'solution',
      titleEn: 'Our Solution',
      titleSi: 'අපගේ විසඳුම',
      contentEn:
        'Elevate Catalog is a modern, headless CMS-powered platform built for multi-store demos. Switch themes instantly, manage products from one dashboard, and engage customers via WhatsApp—all from a single deployment.',
      contentSi:
        'Elevate Catalog යනු බහු-ගබඩා ඩෙමෝ සඳහා ගොඩනඟා ඇති නවීන, කර-අසම්බන්ධ CMS-බල ගිණුම් වේදිකාවකි. තේමා න්‍යාස ප්‍රවාහනය කරන්න, එක් ඩැෂ්බෝර්ඩ සිට නිෂ්පාදන 리ソස පරිශීලනය කරන්න, සහ WhatsApp හරහා ගනුසුරුවරුන්ට සම්බන්ධ වන්න—සියලු එකම ස්ථාපනයින්.',
    },
    {
      type: 'roi',
      titleEn: 'Why Elevate?',
      titleSi: 'ඇයි Elevate?',
      contentEn: `✓ 5 professional store demos in one platform
✓ Bilingual support (English + Sinhala)
✓ Direct WhatsApp integration
✓ Mobile-optimized and responsive
✓ 24 products per category with real inventory
✓ Instant theme switching
✓ Production-ready deployment
✓ Zero vendor lock-in`,
      contentSi: `✓ එක් වේදිකාවේ 5 වෙළඳ ගබඩා ඩෙමෝ
✓ ද්විමාතෘක සහතය (English + Sinhala)
✓ සෘජු WhatsApp ඒකාබද්ධතා
✓ ජංගම-ප්‍රශස්ත සහ ප්‍රතිචාරශීලී
✓ 24 නිෂ්පාදන සෑම කාණ්ඩයටම සැබෑ ඉන්වෙන්ටරි සමඟ
✓ තක්ෂණික ෙතිම සුරතා
✓ නිෂ්පාදන-ප්‍රස්තුත ස්ථාපනය
✓ විතර බිකුණු බිම නැත`,
    },
  ],
}

async function createStoreTypes() {
  console.log('Creating store types...')
  for (const storeType of storeTypes) {
    try {
      const result = await client.create({
        _type: 'storeType',
        ...storeType,
      })
      console.log(`✓ Created store type: ${storeType.name} (${result._id})`)
    } catch (error) {
      if (error.statusCode === 409) {
        console.log(`⟳ Store type already exists: ${storeType.name}`)
      } else {
        console.error(`✗ Error creating store type ${storeType.name}:`, error.message)
      }
    }
  }
}

async function createProducts() {
  console.log('Creating products...')
  let created = 0
  for (const [storeKey, products] of Object.entries(sampleProducts)) {
    for (const product of products) {
      try {
        await client.create({
          _type: 'product',
          code: product.code,
          name: product.name,
          price: product.price,
          inStock: true,
          images: [],
        })
        created++
      } catch (error) {
        if (error.statusCode === 409) {
          console.log(`⟳ Product already exists: ${product.code}`)
        } else {
          console.error(`✗ Error creating product ${product.code}:`, error.message)
        }
      }
    }
  }
  console.log(`✓ Created ${created} products`)
}

async function createHomepageContent() {
  console.log('Creating homepage content...')
  try {
    await client.create({
      _id: 'homepage-content',
      ...homepageContent,
    })
    console.log('✓ Created homepage content')
  } catch (error) {
    if (error.statusCode === 409) {
      console.log('⟳ Homepage content already exists, updating...')
      try {
        await client.patch('homepage-content').set(homepageContent).commit()
        console.log('✓ Updated homepage content')
      } catch (patchError) {
        console.error('✗ Error updating homepage content:', patchError.message)
      }
    } else {
      console.error('✗ Error creating homepage content:', error.message)
    }
  }
}

async function main() {
  console.log('\n🚀 Starting data seeding for Elevate Catalog...\n')

  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ Error: SANITY_AUTH_TOKEN environment variable is not set.')
    console.log('Please set your Sanity authentication token before running this script.')
    console.log('\nExample:')
    console.log('  export SANITY_AUTH_TOKEN="your_token_here"')
    console.log('  npm run seed')
    process.exit(1)
  }

  try {
    await createStoreTypes()
    console.log('')
    await createProducts()
    console.log('')
    await createHomepageContent()
    console.log('\n✅ Seeding complete!\n')
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message)
    process.exit(1)
  }
}

main()
