const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  const offers = await client.fetch(`*[_type == "offer"]{_id, title}`)
  for (const o of offers) {
    await client
      .patch(o._id)
      .set({badgeTextEn: 'SALE', badgeTextSi: 'විශේෂ වට්ටම්'})
      .commit()
    console.log('Set custom badge text on', o.title)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
