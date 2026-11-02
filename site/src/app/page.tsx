import {getProducts, getCategories, getProductTypes} from '@/sanity'
import CatalogClient from '@/components/CatalogClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, categories, types] = await Promise.all([
    getProducts(),
    getCategories(),
    getProductTypes(),
  ])

  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-4 py-8">
        <CatalogClient products={products} categories={categories} types={types} />
      </section>

      <SiteFooter />
    </main>
  )
}
