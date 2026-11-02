import {getProducts, getCategories, getProductTypes, getSiteSettings, getActiveOffer} from '@/sanity'
import CatalogClient from '@/components/CatalogClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/Hero'
import OfferBar from '@/components/OfferBar'
import OfferBanner from '@/components/OfferBanner'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, categories, types, settings, offer] = await Promise.all([
    getProducts(),
    getCategories(),
    getProductTypes(),
    getSiteSettings(),
    getActiveOffer(),
  ])

  return (
    <main className="min-h-screen bg-neutral-50">
      <OfferBar barEn={settings?.offerBarEn} barSi={settings?.offerBarSi} />
      <SiteHeader />
      <Hero />

      {offer && (
        <div className="mx-auto max-w-5xl px-4 pt-4">
          <OfferBanner offer={offer} />
        </div>
      )}

      <section id="catalog" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-6">
        <CatalogClient products={products} categories={categories} types={types} offer={offer} />
      </section>

      <SiteFooter />
    </main>
  )
}
