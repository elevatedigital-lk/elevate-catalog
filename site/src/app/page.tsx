import {getProducts, getCategories, getProductTypes, getSiteSettings} from '@/sanity'
import CatalogClient from '@/components/CatalogClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PolicyBanner from '@/components/PolicyBanner'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, categories, types, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getProductTypes(),
    getSiteSettings(),
  ])

  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <PolicyBanner noteEn={settings?.policyNoteEn} noteSi={settings?.policyNoteSi} />

      <section className="mx-auto max-w-5xl px-4 py-8">
        <CatalogClient products={products} categories={categories} types={types} />
      </section>

      <SiteFooter />
    </main>
  )
}
