const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const orderingStepsEn = [
  'Tap "Inquire on WhatsApp" on any product you like.',
  'Confirm your size and delivery address with us on WhatsApp.',
  'We prepare your order — ready in 2–3 business days.',
  'Delivered to you in 2–3 days. Delivery charges apply.',
]

const orderingStepsSi = [
  'ඔබට අවශ්‍ය නිෂ්පාදනයේ "WhatsApp මගින් විමසන්න" බොත්තම ඔබන්න.',
  'ඔබගේ සයිස් එක සහ බෙදාහැරීමේ ලිපිනය WhatsApp හරහා අප සමඟ තහවුරු කරන්න.',
  'ඔබගේ ඇණවුම සූදානම් කරනු ලැබේ — දින 2-3ක් ඇතුළත.',
  'දින 2-3ක් තුළ ඔබ වෙත ගෙන එනු ලැබේ. බෙදාහැරීමේ ගාස්තු අදාළ වේ.',
]

async function main() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) {
    console.error('No siteSettings document found')
    process.exit(1)
  }
  await client.patch(settings._id).set({orderingStepsEn, orderingStepsSi}).commit()
  console.log('Simplified How to Order steps on', settings._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
