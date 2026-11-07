const fs = require('fs')
const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const FILE = '/Users/dulajhp/.hermes/attachments/Hero Banner Image from Gemini-2.jpeg'
const ALT = 'Beto shoe collection banner — leather classics, chic loafers & heels, performance sneakers'

async function main() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) {
    console.error('No siteSettings document found')
    process.exit(1)
  }

  console.log('Uploading', FILE)
  const asset = await client.assets.upload('image', fs.createReadStream(FILE), {
    filename: 'hero-banner-gemini.jpeg',
  })

  const heroSlides = [
    {
      _type: 'heroSlide',
      _key: Math.random().toString(36).slice(2, 10),
      image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      alt: ALT,
      enabled: true,
    },
  ]

  await client.patch(settings._id).set({heroSlides}).commit()
  console.log('Set single hero slide on', settings._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
