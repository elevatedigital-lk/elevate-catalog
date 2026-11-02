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

export type Taxonomy = {
  _id: string
  name: string
  nameSi?: string
}

export type Product = {
  _id: string
  name: string
  nameSi?: string
  code: string
  price: number
  images: SanityImageSource[]
  inStock: boolean
  category: Taxonomy | null
  productType: Taxonomy | null
}

export async function getProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product"] | order(order asc, _createdAt desc){
      _id, name, nameSi, code, price, images, inStock,
      category->{_id, name, nameSi},
      productType->{_id, name, nameSi}
    }`,
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

export function localized(
  item: {name: string; nameSi?: string} | null | undefined,
  lang: 'en' | 'si',
): string {
  if (!item) return ''
  if (lang === 'si' && item.nameSi) return item.nameSi
  return item.name
}
