import {getProducts, getCategories, getProductTypes, getSiteSettings} from '@/sanity'
import CatalogClient from '@/components/CatalogClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/Hero'
import OfferBar from '@/components/OfferBar'
import OfferBanner from '@/components/OfferBanner'

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
      <OfferBar barEn={settings?.offerBarEn} barSi={settings?.offerBarSi} />
      <SiteHeader />
      <Hero />

      <div className="mx-auto max-w-5xl px-4 pt-5">
        <OfferBanner bannerEn={settings?.offerBannerEn} bannerSi={settings?.offerBannerSi} />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <CatalogClient products={products} categories={categories} types={types} />
      </section>

      <SiteFooter />
    </main>
  )
}
