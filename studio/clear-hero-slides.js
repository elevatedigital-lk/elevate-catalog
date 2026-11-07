const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) {
    console.error('No siteSettings document found')
    process.exit(1)
  }
  await client.patch(settings._id).unset(['heroSlides']).commit()
  console.log('Cleared heroSlides on', settings._id, '— homepage will show the placeholder')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
