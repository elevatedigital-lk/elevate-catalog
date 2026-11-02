const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const IMG_DIR = path.join(__dirname, '..', 'sample', 'dummy')
const IMG_FILES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16].map((n) => `img${n}.jpg`)

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const COLOR_PALETTE = [
  {name: 'Black', nameSi: 'කළු', hex: '#1a1a1a'},
  {name: 'Brown', nameSi: 'දුඹුරු', hex: '#8b4513'},
  {name: 'White', nameSi: 'සුදු', hex: '#f5f5f5'},
  {name: 'Navy', nameSi: 'නාවික නිල්', hex: '#1e2a5e'},
  {name: 'Red', nameSi: 'රතු', hex: '#b91c1c'},
  {name: 'Tan', nameSi: 'කහ දුඹුරු', hex: '#d2b48c'},
]

const SIZE_RUN = ['38', '39', '40', '41', '42', '43', '44']

const PRODUCTS = [
  {name: 'Urban Walker', cat: 'Men', type: 'Casual', price: 7200},
  {name: 'Office Classic Oxford', cat: 'Men', type: 'Office / Formal', price: 9500},
  {name: 'Trail Blazer Sport', cat: 'Men', type: 'Sports', price: 11000},
  {name: 'Street Runner', cat: 'Men', type: 'Sneakers', price: 8400},
  {name: 'Monsoon Sandal', cat: 'Men', type: 'Sandals', price: 3200},
  {name: 'Highland Boot', cat: 'Men', type: 'Boots', price: 13500},
  {name: 'Everyday Flat', cat: 'Women', type: 'Casual', price: 6500},
  {name: 'Elegance Heel Pump', cat: 'Women', type: 'Office / Formal', price: 8900},
  {name: 'Active Stride', cat: 'Women', type: 'Sports', price: 10200},
  {name: 'Cloud Sneaker', cat: 'Women', type: 'Sneakers', price: 7800},
  {name: 'Breeze Sandal', cat: 'Women', type: 'Sandals', price: 2900},
  {name: 'Winter Ankle Boot', cat: 'Women', type: 'Boots', price: 12400},
  {name: 'Lil Explorer Sneaker', cat: 'Kids', type: 'Casual', price: 4200},
  {name: 'School Sports Shoe', cat: 'Kids', type: 'Sports', price: 4800},
  {name: 'Splash Sandal Jr.', cat: 'Kids', type: 'Sandals', price: 2100},
]

function pick(arr, n, offset) {
  const out = []
  for (let i = 0; i < n; i++) out.push(arr[(offset + i) % arr.length])
  return out
}

async function main() {
  const categories = await client.fetch(`*[_type == "category"]{_id, name}`)
  const types = await client.fetch(`*[_type == "productType"]{_id, name}`)
  const catMap = Object.fromEntries(categories.map((c) => [c.name, c._id]))
  const typeMap = Object.fromEntries(types.map((t) => [t.name, t._id]))

  // Upload each image file once, reuse asset refs across products
  const assetIds = []
  for (const file of IMG_FILES) {
    const asset = await client.assets.upload('image', fs.createReadStream(path.join(IMG_DIR, file)), {
      filename: file,
    })
    assetIds.push(asset._id)
    console.log('Uploaded', file)
  }

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]
    const code = `BT-${300 + i}`
    const slug = `${slugify(p.name)}-${code.toLowerCase()}`

    const existing = await client.fetch(`*[_type == "product" && code == $code][0]{_id}`, {code})
    if (existing) {
      console.log('Skip (exists):', code, p.name)
      continue
    }

    const imgIdx = i % assetIds.length
    const images = [0, 1].map((k) => ({
      _type: 'image',
      _key: `img-${k}`,
      asset: {_type: 'reference', _ref: assetIds[(imgIdx + k) % assetIds.length]},
    }))

    const colors = pick(COLOR_PALETTE, 3, i).map((c, k) => ({
      ...c,
      _type: 'colorOption',
      _key: `clr-${k}`,
      inStock: !(i === 3 && k === 2), // vary: one product has an out-of-stock color
    }))

    const sizes = SIZE_RUN.map((s, k) => ({
      size: s,
      _type: 'sizeOption',
      _key: `sz-${k}`,
      inStock: !(i % 5 === 0 && k === 3), // vary: occasional out-of-stock size
    }))

    const doc = {
      _type: 'product',
      name: p.name,
      slug: {_type: 'slug', current: slug},
      code,
      price: p.price,
      inStock: i % 7 !== 6, // one product fully out of stock
      category: {_type: 'reference', _ref: catMap[p.cat]},
      productType: {_type: 'reference', _ref: typeMap[p.type]},
      images,
      colors,
      sizes,
      order: 10 + i,
    }

    const created = await client.create(doc)
    console.log('Created', code, p.name, created._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
