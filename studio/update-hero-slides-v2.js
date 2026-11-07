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
    file: path.join(__dirname, '../assets/mens-brown-derby-leather-shoes.jpg'),
    alt: 'A pair of polished oxblood leather derby shoes',
  },
  {
    file: path.join(__dirname, '../assets/handmade-leather-boots.jpg'),
    alt: 'Handmade tan leather wingtip boots',
  },
  {
    file: path.join(__dirname, '../assets/pair-brown-leather-boots-shoestrings.webp'),
    alt: 'A pair of brown leather boots on a wooden floor',
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
  console.log('Replaced hero slides with', heroSlides.length, 'real shoe photos on', settings._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
