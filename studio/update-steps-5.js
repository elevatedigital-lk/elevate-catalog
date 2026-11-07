const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const orderingStepsEn = [
  "First, choose the model(s) you'd like to order.",
  'After choosing a model, select the color and size.',
  'Then tap "Inquire on WhatsApp" to ask about it or place your order.',
  "We only prepare your order once it's confirmed — this takes about 2–3 business days, and we'll confirm any changes with you.",
  "We deliver all over Sri Lanka. Delivery takes 2–3 days, and delivery charges apply — we'll confirm these with you too.",
]

const orderingStepsSi = [
  'මුලින්ම, ඔබට ඇණවුම් කිරීමට අවශ්‍ය මාදිලිය/මාදිලි තෝරන්න.',
  'මාදිලිය තෝරාගත් පසු වර්ණය සහ ප්‍රමාණය තෝරන්න.',
  'ඉන්පසු විමසීමට හෝ ඇණවුම් කිරීමට "WhatsApp මගින් විමසන්න" බොත්තම ක්ලික් කරන්න.',
  'ඇණවුම තහවුරු කළ පසු පමණක් අපි එය සූදානම් කරන අතර, එයට දින 2-3ක් පමණ ගත වේ — ඕනෑම වෙනසක් ඇත්නම් අපි ඔබ සමඟ තහවුරු කරගනිමු.',
  'අපි ශ්‍රී ලංකාව පුරා බෙදාහැරීම් සිදු කරමු. බෙදාහැරීමට දින 2-3ක් ගත වන අතර බෙදාහැරීමේ ගාස්තු අදාළ වේ, එයද අපි ඔබ සමඟ තහවුරු කරගනිමු.',
]

async function main() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) {
    console.error('No siteSettings document found')
    process.exit(1)
  }
  await client.patch(settings._id).set({orderingStepsEn, orderingStepsSi}).commit()
  console.log('Updated How to Order steps (5 steps, EN+SI) on', settings._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
