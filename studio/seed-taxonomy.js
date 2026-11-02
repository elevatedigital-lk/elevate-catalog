const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const categories = [
  {name: 'Men', order: 1},
  {name: 'Women', order: 2},
  {name: 'Kids', order: 3},
]

const types = [
  {name: 'Casual', order: 1},
  {name: 'Office / Formal', order: 2},
  {name: 'Sports', order: 3},
  {name: 'Sneakers', order: 4},
  {name: 'Sandals', order: 5},
  {name: 'Boots', order: 6},
]

async function main() {
  const catIds = {}
  for (const c of categories) {
    const doc = await client.create({_type: 'category', ...c})
    catIds[c.name] = doc._id
    console.log('Created category:', c.name, doc._id)
  }

  const typeIds = {}
  for (const t of types) {
    const doc = await client.create({_type: 'productType', ...t})
    typeIds[t.name] = doc._id
    console.log('Created type:', t.name, doc._id)
  }

  // Attach category + type to the existing demo product (BT-101), if present
  const demo = await client.fetch(`*[_type == "product" && code == "BT-101"][0]{_id}`)
  if (demo) {
    await client
      .patch(demo._id)
      .set({
        category: {_type: 'reference', _ref: catIds['Men']},
        productType: {_type: 'reference', _ref: typeIds['Casual']},
      })
      .commit()
    console.log('Updated demo product with category/type')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
