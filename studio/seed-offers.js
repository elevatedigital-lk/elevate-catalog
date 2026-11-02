const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  const existing = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!existing) {
    console.log('No siteSettings doc found — run seed-pdp.js first')
    return
  }
  await client
    .patch(existing._id)
    .set({
      offerBarEn: 'Islandwide delivery • Handmade in Sri Lanka',
      offerBarSi: 'දිවයින පුරා බෙදාහැරීම • ශ්‍රී ලංකාවේ හස්ත නිර්මාණයකි',
      offerBannerEn: "This week's offer — message us on WhatsApp for current prices",
      offerBannerSi: 'මේ සතියේ දීමනාව — වත්මන් මිල සඳහා WhatsApp මගින් අප හා සම්බන්ධ වන්න',
    })
    .commit()
  console.log('Updated siteSettings with offer bar/banner text', existing._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
