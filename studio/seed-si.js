const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const categorySi = {
  Men: 'පිරිමි',
  Women: 'කාන්තා',
  Kids: 'ළමයි',
}

const typeSi = {
  Casual: 'අනියම්',
  'Office / Formal': 'කාර්යාල',
  Sports: 'ක්‍රීඩා',
  Sneakers: 'ස්නීකර්ස්',
  Sandals: 'සැන්ඩල්',
  Boots: 'බූට්ස්',
}

async function main() {
  const cats = await client.fetch(`*[_type == "category"]{_id, name}`)
  for (const c of cats) {
    if (categorySi[c.name]) {
      await client.patch(c._id).set({nameSi: categorySi[c.name]}).commit()
      console.log('Patched category', c.name, '->', categorySi[c.name])
    }
  }

  const types = await client.fetch(`*[_type == "productType"]{_id, name}`)
  for (const t of types) {
    if (typeSi[t.name]) {
      await client.patch(t._id).set({nameSi: typeSi[t.name]}).commit()
      console.log('Patched type', t.name, '->', typeSi[t.name])
    }
  }

  // Demo products
  await client
    .patch({query: '*[_type == "product" && code == "BT-101"]'})
    .set({nameSi: 'සාමාන්‍ය ධාවන සපත්තුව'})
    .commit()
  await client
    .patch({query: '*[_type == "product" && code == "BT-205"]'})
    .set({nameSi: 'මාර්ග ධාවන සපත්තුව'})
    .commit()
  console.log('Patched demo product names')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
