const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  // Clean up deprecated fields on siteSettings
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (settings) {
    await client.patch(settings._id).unset(['offerBannerEn', 'offerBannerSi']).commit()
    console.log('Removed deprecated offerBannerEn/Si from siteSettings')
  }

  // Sample offer covering today, for testing — tied to one demo product
  const demo = await client.fetch(`*[_type == "product" && code == "BT-101"][0]{_id}`)
  if (!demo) {
    console.log('No demo product BT-101 found — skipping sample offer')
    return
  }

  const today = new Date()
  const start = new Date(today)
  start.setDate(start.getDate() - 3)
  const end = new Date(today)
  end.setDate(end.getDate() + 30)
  const fmt = (d) => d.toISOString().slice(0, 10)

  const existing = await client.fetch(`*[_type == "offer" && title == "Test Offer"][0]{_id}`)
  const doc = {
    _type: 'offer',
    title: 'Test Offer',
    titleSi: 'පරීක්ෂණ දීමනාව',
    bannerTextEn: '20% off selected styles — message us on WhatsApp to claim',
    bannerTextSi: 'තෝරාගත් මාදිලි සඳහා 20%ක් අඩු — ලබාගැනීමට WhatsApp මගින් අප හා සම්බන්ධ වන්න',
    discountPercent: 20,
    startDate: fmt(start),
    endDate: fmt(end),
    products: [{_type: 'reference', _ref: demo._id, _key: 'p1'}],
  }

  if (existing) {
    await client.patch(existing._id).set(doc).commit()
    console.log('Updated sample offer', existing._id)
  } else {
    const created = await client.create(doc)
    console.log('Created sample offer', created._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
