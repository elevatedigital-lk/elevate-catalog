const fs = require('fs')
const path = require('path')
const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const SLIDES = [
  {
    file: path.join(__dirname, '../assets/wooden-lasts-macedonian-shoemaking-craft.jpg'),
    alt: 'Rows of wooden shoemaker lasts',
  },
  {
    file: path.join(__dirname, '../assets/shoemakers-and-cobblers-tools-joseph-allen-skinner.jpg'),
    alt: "A cobbler's hand tools",
  },
  {
    file: path.join(__dirname, '../assets/shoemakers-tripartite-metal-last-pre-1950s-gothenburg.jpg'),
    alt: 'A vintage tripartite metal shoemaking last',
  },
]

async function main() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) {
    console.error('No siteSettings document found')
    process.exit(1)
  }

  const heroSlides = []
  for (const slide of SLIDES) {
    console.log('Uploading', slide.file)
    const asset = await client.assets.upload('image', fs.createReadStream(slide.file), {
      filename: path.basename(slide.file),
    })
    heroSlides.push({
      _type: 'heroSlide',
      _key: Math.random().toString(36).slice(2, 10),
      image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      alt: slide.alt,
      enabled: true,
    })
  }

  await client.patch(settings._id).set({heroSlides}).commit()
  console.log('Seeded', heroSlides.length, 'hero slides on', settings._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
