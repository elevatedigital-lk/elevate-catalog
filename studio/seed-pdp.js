const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: '68c6eq6z',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const policyNoteEn =
  "Beto is the sole manufacturer of these designs — no other seller produces this footwear. " +
  "Every order is made fresh to order: production takes 2–3 business days before dispatch, " +
  "and delivery takes a further 2–3 days. Delivery charges apply and will be confirmed with your order."

const policyNoteSi =
  "මෙම සපත්තු නිෂ්පාදනය කරනු ලබන්නේ Beto විසින් පමණි — වෙනත් කිසිවෙකු මෙම මාදිලි නිෂ්පාදනය නොකරයි. " +
  "සෑම ඇණවුමක්ම විශේෂයෙන් සකස් කරනු ලබන බැවින්, නිෂ්පාදනය සඳහා වාණිජ දින 2-3ක් ගත වේ. " +
  "ඉන් පසු බෙදාහැරීම සඳහා තවත් දින 2-3ක් ගත වේ. බෙදාහැරීම් ගාස්තු අදාළ වන අතර එය ඔබගේ ඇණවුම සමඟ තහවුරු කරනු ලැබේ."

const orderingStepsEn = [
  'Browse the catalog and note the product code you like.',
  'Tap "Inquire on WhatsApp" on the product.',
  'Confirm your size and delivery address with us on WhatsApp.',
  'We prepare your order — production takes 2–3 business days.',
  'Your order is delivered — delivery takes 2–3 days, charges apply.',
]

const orderingStepsSi = [
  'නිෂ්පාදන ලැයිස්තුව පිරික්සා ඔබට කැමති සපත්තුවේ කේතය සටහන් කරගන්න.',
  'නිෂ්පාදනය මත ඇති "WhatsApp මගින් විමසන්න" බොත්තම ඔබන්න.',
  'WhatsApp හරහා ඔබේ සයිස් එක සහ බෙදාහැරීමේ ලිපිනය අප සමඟ තහවුරු කරගන්න.',
  'අපි ඔබේ ඇණවුම සකස් කරමු — නිෂ්පාදනය සඳහා වාණිජ දින 2-3ක් ගත වේ.',
  'ඔබේ ඇණවුම බෙදාහරිනු ලැබේ — බෙදාහැරීම සඳහා දින 2-3ක් ගත වේ, ගාස්තු අදාළ වේ.',
]

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  // Backfill slugs + sample description/sizes on demo products
  const products = await client.fetch(`*[_type == "product"]{_id, name, code}`)
  for (const p of products) {
    await client
      .patch(p._id)
      .setIfMissing({
        slug: {_type: 'slug', current: `${slugify(p.name)}-${p.code.toLowerCase()}`},
        description:
          'A comfortable, everyday shoe built for Sri Lankan weather. Breathable upper, cushioned sole.',
        descriptionSi: 'ශ්‍රී ලාංකික කාලගුණයට ගැලපෙන සුව පහසු, දිනපතා පැළඳිය හැකි සපත්තුවකි.',
        availableSizes: '38, 39, 40, 41, 42, 43, 44',
      })
      .commit()
    console.log('Patched product', p.code)
  }

  // Create (or update) the singleton site settings doc
  const existing = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (existing) {
    await client
      .patch(existing._id)
      .set({policyNoteEn, policyNoteSi, orderingStepsEn, orderingStepsSi})
      .commit()
    console.log('Updated existing siteSettings', existing._id)
  } else {
    const doc = await client.create({
      _type: 'siteSettings',
      policyNoteEn,
      policyNoteSi,
      orderingStepsEn,
      orderingStepsSi,
    })
    console.log('Created siteSettings', doc._id)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
