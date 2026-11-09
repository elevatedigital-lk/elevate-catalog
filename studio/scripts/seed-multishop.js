#!/usr/bin/env node
/**
 * Seed script for MultiShop catalog
 * Creates 40+ sample products across 6+ diverse categories
 * with 8-10 collections and realistic LKR pricing
 * Demonstrates that Elevate works for ANY shop type
 *
 * Usage: SANITY_TOKEN=<token> node studio/scripts/seed-multishop.js
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const products = [
  // Clothing & Fashion (6)
  {name: 'Casual Cotton T-Shirt', code: 'MS-001', price: 1290, category: 'Clothing & Fashion', type: 'Casual'},
  {name: 'Women\'s Summer Dress', code: 'MS-002', price: 2890, category: 'Clothing & Fashion', type: 'Casual'},
  {name: 'Formal Office Blazer', code: 'MS-003', price: 4290, category: 'Clothing & Fashion', type: 'Office'},
  {name: 'Denim Jacket Blue', code: 'MS-004', price: 3990, category: 'Clothing & Fashion', type: 'Casual'},
  {name: 'Silk Evening Shirt', code: 'MS-005', price: 2690, category: 'Clothing & Fashion', type: 'Office'},
  {name: 'Cotton Joggers', code: 'MS-006', price: 1890, category: 'Clothing & Fashion', type: 'Casual'},

  // Footwear (6)
  {name: 'Running Sneakers Pro', code: 'MS-F01', price: 6490, category: 'Footwear', type: 'Sports'},
  {name: 'Leather Oxford Shoes', code: 'MS-F02', price: 4990, category: 'Footwear', type: 'Office'},
  {name: 'Casual Canvas Shoes', code: 'MS-F03', price: 1890, category: 'Footwear', type: 'Casual'},
  {name: 'Comfortable Sandals', code: 'MS-F04', price: 890, category: 'Footwear', type: 'Casual'},
  {name: 'Waterproof Hiking Boot', code: 'MS-F05', price: 5890, category: 'Footwear', type: 'Sports'},
  {name: 'Slip-On Loafers', code: 'MS-F06', price: 3490, category: 'Footwear', type: 'Office'},

  // Home & Furniture (6)
  {name: 'Comfortable Sofa Set', code: 'MS-H01', price: 45990, category: 'Home & Furniture', type: 'Furniture'},
  {name: 'Modern Coffee Table', code: 'MS-H02', price: 12990, category: 'Home & Furniture', type: 'Furniture'},
  {name: 'Soft Cotton Pillow', code: 'MS-H03', price: 1890, category: 'Home & Furniture', type: 'Decor'},
  {name: 'Premium Bedsheet Set', code: 'MS-H04', price: 3490, category: 'Home & Furniture', type: 'Decor'},
  {name: 'Modern Wall Clock', code: 'MS-H05', price: 2290, category: 'Home & Furniture', type: 'Decor'},
  {name: 'Wooden Dining Chair', code: 'MS-H06', price: 8990, category: 'Home & Furniture', type: 'Furniture'},

  // Groceries & Food (6)
  {name: 'Premium Basmati Rice (5kg)', code: 'MS-G01', price: 3490, category: 'Groceries & Food', type: 'Staples'},
  {name: 'Organic Honey (500g)', code: 'MS-G02', price: 890, category: 'Groceries & Food', type: 'Organic'},
  {name: 'Virgin Olive Oil (500ml)', code: 'MS-G03', price: 1690, category: 'Groceries & Food', type: 'Organic'},
  {name: 'Multi-grain Flour (1kg)', code: 'MS-G04', price: 290, category: 'Groceries & Food', type: 'Staples'},
  {name: 'Ceylon Tea (500g)', code: 'MS-G05', price: 1290, category: 'Groceries & Food', type: 'Beverages'},
  {name: 'Mixed Nuts & Dry Fruits', code: 'MS-G06', price: 2190, category: 'Groceries & Food', type: 'Snacks'},

  // Electronics & Mobiles (6)
  {name: 'Wireless Bluetooth Speaker', code: 'MS-E01', price: 4990, category: 'Electronics & Mobiles', type: 'Audio'},
  {name: 'Phone Charging Cable (3m)', code: 'MS-E02', price: 890, category: 'Electronics & Mobiles', type: 'Accessories'},
  {name: 'LED Desk Lamp', code: 'MS-E03', price: 2190, category: 'Electronics & Mobiles', type: 'Lighting'},
  {name: 'USB-C Hub Adapter', code: 'MS-E04', price: 3290, category: 'Electronics & Mobiles', type: 'Accessories'},
  {name: 'Portable Power Bank 20000mAh', code: 'MS-E05', price: 3990, category: 'Electronics & Mobiles', type: 'Power'},
  {name: 'Noise-Cancelling Headphones', code: 'MS-E06', price: 12990, category: 'Electronics & Mobiles', type: 'Audio'},

  // Accessories (6)
  {name: 'Premium Leather Belt', code: 'MS-A01', price: 1290, category: 'Accessories', type: 'Fashion'},
  {name: 'Canvas Messenger Bag', code: 'MS-A02', price: 2490, category: 'Accessories', type: 'Bags'},
  {name: 'Wool Winter Cap', code: 'MS-A03', price: 890, category: 'Accessories', type: 'Fashion'},
  {name: 'Classic Wrist Watch', code: 'MS-A04', price: 6990, category: 'Accessories', type: 'Watches'},
  {name: 'Sunglasses UV Protection', code: 'MS-A05', price: 2190, category: 'Accessories', type: 'Fashion'},
  {name: 'Leather Card Wallet', code: 'MS-A06', price: 1890, category: 'Accessories', type: 'Bags'},
]

const categories = [
  {_type: 'category', name: 'Clothing & Fashion'},
  {_type: 'category', name: 'Footwear'},
  {_type: 'category', name: 'Home & Furniture'},
  {_type: 'category', name: 'Groceries & Food'},
  {_type: 'category', name: 'Electronics & Mobiles'},
  {_type: 'category', name: 'Accessories'},
]

const types = [
  {_type: 'productType', name: 'Casual'},
  {_type: 'productType', name: 'Office'},
  {_type: 'productType', name: 'Sports'},
  {_type: 'productType', name: 'Furniture'},
  {_type: 'productType', name: 'Decor'},
  {_type: 'productType', name: 'Staples'},
  {_type: 'productType', name: 'Organic'},
  {_type: 'productType', name: 'Beverages'},
  {_type: 'productType', name: 'Snacks'},
  {_type: 'productType', name: 'Audio'},
  {_type: 'productType', name: 'Accessories'},
  {_type: 'productType', name: 'Lighting'},
  {_type: 'productType', name: 'Power'},
  {_type: 'productType', name: 'Fashion'},
  {_type: 'productType', name: 'Bags'},
  {_type: 'productType', name: 'Watches'},
]

const collections = [
  {
    _type: 'collection',
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Top-selling products across all categories.',
    order: 1,
  },
  {
    _type: 'collection',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Create a comfortable, stylish home.',
    order: 2,
  },
  {
    _type: 'collection',
    name: 'Fashion Hub',
    slug: 'fashion-hub',
    description: 'Latest fashion and apparel trends.',
    order: 3,
  },
  {
    _type: 'collection',
    name: 'Grocery Essentials',
    slug: 'grocery-essentials',
    description: 'Daily essentials and premium groceries.',
    order: 4,
  },
  {
    _type: 'collection',
    name: 'Tech Corner',
    slug: 'tech-corner',
    description: 'Latest electronics and gadgets.',
    order: 5,
  },
  {
    _type: 'collection',
    name: 'Budget Picks',
    slug: 'budget-picks',
    description: 'Great value without breaking the bank.',
    order: 6,
  },
  {
    _type: 'collection',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Fresh products just added.',
    order: 7,
  },
  {
    _type: 'collection',
    name: 'Sale',
    slug: 'sale',
    description: 'Limited-time discounts across all categories.',
    order: 8,
  },
  {
    _type: 'collection',
    name: 'Premium Selection',
    slug: 'premium-selection',
    description: 'Handpicked luxury and premium items.',
    order: 9,
  },
  {
    _type: 'collection',
    name: 'Trending Now',
    slug: 'trending-now',
    description: 'What\'s hot this week.',
    order: 10,
  },
]

const offer = {
  _type: 'offer',
  title: 'Mega Clearance Sale',
  bannerTextEn: '🎊 Up to 40% OFF across all categories',
  discount: 40,
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  products: [],
}

async function seed() {
  try {
    console.log('Creating categories...')
    const createdCategories = await Promise.all(categories.map(cat => client.create(cat)))
    const categoryMap = Object.fromEntries(createdCategories.map(cat => [cat.name, cat._id]))

    console.log('Creating types...')
    const createdTypes = await Promise.all(types.map(t => client.create(t)))
    const typeMap = Object.fromEntries(createdTypes.map(t => [t.name, t._id]))

    console.log('Creating products...')
    const createdProducts = await Promise.all(
      products.map(p =>
        client.create({
          _type: 'product',
          name: p.name,
          code: p.code,
          price: p.price,
          category: {_type: 'reference', _ref: categoryMap[p.category]},
          productType: {_type: 'reference', _ref: typeMap[p.type]},
          inStock: true,
          images: [
            {
              _type: 'image',
              asset: {_type: 'reference', _ref: 'image-product-1'},
              alt: p.name,
            },
          ],
        }),
      ),
    )

    console.log('Creating collections with products...')
    const updatedCollections = collections.map((coll, idx) => ({
      ...coll,
      products: createdProducts
        .filter((_, i) => {
          // Distribute products across collections with some overlap
          if (coll.slug === 'best-sellers') return [0, 2, 5, 7, 10, 15, 18, 22, 25, 30].includes(i)
          if (coll.slug === 'home-living') return i >= 12 && i < 18
          if (coll.slug === 'fashion-hub') return i < 12
          if (coll.slug === 'grocery-essentials') return i >= 18 && i < 24
          if (coll.slug === 'tech-corner') return i >= 24 && i < 30
          if (coll.slug === 'budget-picks') return [0, 3, 6, 9, 12, 15, 18, 21, 24, 27].includes(i)
          if (coll.slug === 'new-arrivals') return i < 8
          if (coll.slug === 'sale') return i % 3 === 0
          if (coll.slug === 'premium-selection') return [4, 7, 13, 16, 25, 28, 31].includes(i)
          if (coll.slug === 'trending-now') return i % 2 === 0
          return false
        })
        .map(p => ({_type: 'reference', _ref: p._id})),
    }))

    const createdCollections = await Promise.all(
      updatedCollections.map(coll => client.create(coll)),
    )

    console.log('Creating offer...')
    const offerWithProducts = {
      ...offer,
      products: createdProducts.slice(0, 10).map(p => ({_type: 'reference', _ref: p._id})),
    }
    const createdOffer = await client.create(offerWithProducts)

    console.log('\n✅ Seeding complete!')
    console.log(`Created ${createdProducts.length} products`)
    console.log(`Created ${createdCategories.length} categories`)
    console.log(`Created ${createdTypes.length} types`)
    console.log(`Created ${createdCollections.length} collections`)
    console.log(`Created 1 offer`)
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
}

seed()
