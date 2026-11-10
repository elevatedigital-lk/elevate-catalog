import {
  getProducts,
  getCategories,
  getProductTypes,
  getSiteSettings,
  getActiveOffer,
  getCollections,
  getHomepageContent,
  getStoreTypes,
} from '@/sanity'
import BannerSlider from '@/components/BannerSlider'
import ProposalSection from '@/components/ProposalSection'
import CatalogClient from '@/components/CatalogClient'
import CollectionsGrid from '@/components/CollectionsGrid'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OfferBar from '@/components/OfferBar'
import OfferBanner from '@/components/OfferBanner'
import Link from 'next/link'
import {useLanguage} from '@/components/LanguageProvider'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [
    products,
    categories,
    types,
    settings,
    offer,
    collections,
    homepage,
    storeTypes,
  ] = await Promise.all([
    getProducts(),
    getCategories(),
    getProductTypes(),
    getSiteSettings(),
    getActiveOffer(),
    getCollections(),
    getHomepageContent(),
    getStoreTypes(),
  ])

  return (
    <main className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      <OfferBar barEn={settings?.offerBarEn} barSi={settings?.offerBarSi} />
      <SiteHeader />

      {/* Banner Slider - Homepage Feature */}
      {homepage?.banners && homepage.banners.length > 0 && (
        <section className="mx-auto max-w-6xl px-[var(--margin)] py-6 sm:py-10">
          <BannerSlider slides={homepage.banners} />
        </section>
      )}

      {/* Proposal Section */}
      {homepage && (
        <section className="mx-auto max-w-6xl px-[var(--margin)] py-10 sm:py-16">
          <ProposalSection content={homepage} />

          {/* CTA to Demo */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/demo"
              className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              {homepage.ctaButtonEn}
            </Link>
          </div>
        </section>
      )}

      {offer && (
        <div className="mx-auto max-w-6xl px-[var(--margin)] pb-10">
          <OfferBanner offer={offer} />
        </div>
      )}

      {/* Collections section */}
      {collections && collections.length > 0 && (
        <section
          id="collections"
          className="mx-auto max-w-6xl scroll-mt-20 px-[var(--margin)] py-10 sm:py-16"
        >
          <CollectionsGrid collections={collections} />
        </section>
      )}

      {/* Main catalog section */}
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
