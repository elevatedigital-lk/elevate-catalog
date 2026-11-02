const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const sizes = [
  {size: '39', inStock: true},
  {size: '40', inStock: true},
  {size: '41', inStock: true},
  {size: '42', inStock: false}, // out of stock, for testing
  {size: '43', inStock: true},
  {size: '44', inStock: true},
]

const colors = [
  {name: 'Black', nameSi: 'කළු', hex: '#1a1a1a', inStock: true},
  {name: 'Brown', nameSi: 'දුඹුරු', hex: '#8b4513', inStock: true},
  {name: 'White', nameSi: 'සුදු', hex: '#f5f5f5', inStock: false}, // out of stock, for testing
]

const sizeChartTable = [
  {size: '39', measurementCm: '24.5'},
  {size: '40', measurementCm: '25.0'},
  {size: '41', measurementCm: '25.5'},
  {size: '42', measurementCm: '26.0'},
  {size: '43', measurementCm: '26.5'},
  {size: '44', measurementCm: '27.0'},
]

async function main() {
  const products = await client.fetch(`*[_type == "product"]{_id, code}`)
  for (const p of products) {
    await client
      .patch(p._id)
      .unset(['availableSizes'])
      .set({
        sizes: sizes.map((s) => ({...s, _type: 'sizeOption', _key: `sz-${s.size}`})),
        colors: colors.map((c) => ({
          ...c,
          _type: 'colorOption',
          _key: `clr-${c.name.toLowerCase()}`,
        })),
        sizeChartTable: sizeChartTable.map((r) => ({
          ...r,
          _type: 'sizeChartRow',
          _key: `row-${r.size}`,
        })),
      })
      .commit()
    console.log('Migrated product', p.code)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
