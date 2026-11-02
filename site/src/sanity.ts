import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Compressed, right-sized image URL for fast mobile loading.
 * Serves WebP/AVIF automatically and caps quality — real byte savings,
 * not just a resize. Use the smallest `width` that looks sharp for the slot.
 */
export function compressedUrl(
  source: SanityImageSource,
  width: number,
  {square = true, quality = 65}: {square?: boolean; quality?: number} = {},
) {
  let img = builder.image(source).width(width).auto('format').quality(quality)
  if (square) img = img.height(width).fit('crop')
  return img.url()
}

export type Taxonomy = {
  _id: string
  name: string
  nameSi?: string
}

export type ColorOption = {
  name: string
  nameSi?: string
  hex?: string
  inStock: boolean
}

export type SizeOption = {
  size: string
  inStock: boolean
}

export type SizeChartRow = {
  size: string
  measurementCm: string
}

export type Product = {
  _id: string
  name: string
  nameSi?: string
  slug: string
  code: string
  price: number
  images: SanityImageSource[]
  inStock: boolean
  category: Taxonomy | null
  productType: Taxonomy | null
  description?: string
  descriptionSi?: string
  colors?: ColorOption[]
  sizes?: SizeOption[]
  sizeChartImage?: SanityImageSource
  sizeChartTable?: SizeChartRow[]
}

export type SiteSettings = {
  offerBarEn?: string
  offerBarSi?: string
  offerBannerEn?: string
  offerBannerSi?: string
  policyNoteEn?: string
  policyNoteSi?: string
  orderingStepsEn?: string[]
  orderingStepsSi?: string[]
}

const productProjection = `
  _id, name, nameSi, "slug": slug.current, code, price, images, inStock,
  category->{_id, name, nameSi},
  productType->{_id, name, nameSi},
  description, descriptionSi, colors, sizes, sizeChartImage, sizeChartTable
`

export async function getProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product"] | order(order asc, _createdAt desc){${productProjection}}`,
  )
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{${productProjection}}`,
    {slug},
  )
}

export async function getCategories(): Promise<Taxonomy[]> {
  return client.fetch(
    `*[_type == "category"] | order(order asc, name asc){_id, name, nameSi}`,
  )
}

export async function getProductTypes(): Promise<Taxonomy[]> {
  return client.fetch(
    `*[_type == "productType"] | order(order asc, name asc){_id, name, nameSi}`,
  )
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      offerBarEn, offerBarSi, offerBannerEn, offerBannerSi,
      policyNoteEn, policyNoteSi, orderingStepsEn, orderingStepsSi
    }`,
  )
}

export function localized(
  item: {name: string; nameSi?: string} | null | undefined,
  lang: 'en' | 'si',
): string {
  if (!item) return ''
  if (lang === 'si' && item.nameSi) return item.nameSi
  return item.name
}
