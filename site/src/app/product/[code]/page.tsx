import {notFound} from 'next/navigation'
import {getProductByCode, getSiteSettings, getActiveOffer} from '@/sanity'
import ProductDetailClient from '@/components/ProductDetailClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OfferBar from '@/components/OfferBar'

export const dynamic = 'force-dynamic'

export default async function ProductPage({
  params,
}: {
  params: Promise<{code: string}>
}) {
  const {code} = await params
  const [product, settings, offer] = await Promise.all([
    getProductByCode(decodeURIComponent(code)),
    getSiteSettings(),
    getActiveOffer(),
  ])

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      <OfferBar barEn={settings?.offerBarEn} barSi={settings?.offerBarSi} />
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-[var(--margin)] py-10 sm:py-14">
        <ProductDetailClient product={product} offer={offer} />
      </section>
      <SiteFooter />
    </main>
  )
}
