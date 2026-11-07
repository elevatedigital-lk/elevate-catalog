import {getProducts, getCategories, getProductTypes, getSiteSettings, getActiveOffer} from '@/sanity'
import CatalogClient from '@/components/CatalogClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/Hero'
import CraftStory from '@/components/CraftStory'
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
    <main className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      <OfferBar barEn={settings?.offerBarEn} barSi={settings?.offerBarSi} />
      <SiteHeader />
      <Hero />
      <CraftStory />

      {offer && (
        <div className="mx-auto max-w-6xl px-[var(--margin)] pb-10">
          <OfferBanner offer={offer} />
        </div>
      )}

      <section
        id="catalog"
        className="mx-auto max-w-6xl scroll-mt-20 px-[var(--margin)] py-10 sm:py-16"
      >
        <CatalogClient products={products} categories={categories} types={types} offer={offer} />
      </section>

      <SiteFooter />
    </main>
  )
}
