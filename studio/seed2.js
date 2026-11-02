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

async function main() {
  const img = await client.assets.upload(
    'image',
    fs.createReadStream(path.join(__dirname, '..', 'sample', 'shoe2.jpg')),
    {filename: 'shoe2b.jpg'},
  )

  const women = await client.fetch(`*[_type == "category" && name == "Women"][0]{_id}`)
  const sports = await client.fetch(`*[_type == "productType" && name == "Sports"][0]{_id}`)

  const doc = await client.create({
    _type: 'product',
    name: 'Trail Sprinter',
    code: 'BT-205',
    price: 12500,
    inStock: false,
    order: 2,
    category: {_type: 'reference', _ref: women._id},
    productType: {_type: 'reference', _ref: sports._id},
    images: [{_type: 'image', asset: {_type: 'reference', _ref: img._id}}],
  })

  console.log('Created product:', doc._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
