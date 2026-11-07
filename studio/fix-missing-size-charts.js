const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const STANDARD_TABLE = [
  {size: '38', measurementCm: '24.0'},
  {size: '39', measurementCm: '24.5'},
  {size: '40', measurementCm: '25.0'},
  {size: '41', measurementCm: '25.5'},
  {size: '42', measurementCm: '26.0'},
  {size: '43', measurementCm: '26.5'},
  {size: '44', measurementCm: '27.0'},
].map((row, i) => ({_type: 'sizeChartRow', _key: `row-${row.size}-${i}`, ...row}))

async function main() {
  const missing = await client.fetch(
    `*[_type == "product" && !defined(sizeChartTable)]{_id, code}`,
  )
  console.log('Products missing a size chart:', missing.map((p) => p.code).join(', '))

  for (const p of missing) {
    await client.patch(p._id).set({sizeChartTable: STANDARD_TABLE}).commit()
    console.log('Added standard size chart to', p.code)
  }
  console.log('Done —', missing.length, 'products updated')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
