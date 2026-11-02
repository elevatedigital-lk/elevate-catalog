const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  const products = await client.fetch(`*[_type == "product"]{_id, code, images}`)
  for (const p of products) {
    if (!p.images) continue
    const needsFix = p.images.some((img) => !img._key)
    if (!needsFix) {
      console.log('OK (already has keys):', p.code)
      continue
    }
    const fixed = p.images.map((img, i) => ({
      ...img,
      _key: img._key || `img-${i}-${Math.random().toString(36).slice(2, 8)}`,
    }))
    await client.patch(p._id).set({images: fixed}).commit()
    console.log('Fixed missing _key on images for', p.code)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
