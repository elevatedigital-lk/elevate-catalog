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
  const img1 = await client.assets.upload(
    'image',
    fs.createReadStream(path.join(__dirname, '..', 'sample', 'shoe1.jpg')),
    {filename: 'shoe1.jpg'},
  )
  const img2 = await client.assets.upload(
    'image',
    fs.createReadStream(path.join(__dirname, '..', 'sample', 'shoe2.jpg')),
    {filename: 'shoe2.jpg'},
  )

  const doc = await client.create({
    _type: 'product',
    name: 'Classic Runner',
    code: 'BT-101',
    price: 6500,
    inStock: true,
    order: 1,
    images: [
      {_type: 'image', asset: {_type: 'reference', _ref: img1._id}},
      {_type: 'image', asset: {_type: 'reference', _ref: img2._id}},
    ],
  })

  console.log('Created product:', doc._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
