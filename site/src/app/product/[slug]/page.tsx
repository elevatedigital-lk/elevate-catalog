import {notFound} from 'next/navigation'
import {getProductBySlug, getSiteSettings} from '@/sanity'
import ProductDetailClient from '@/components/ProductDetailClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OfferBar from '@/components/OfferBar'

export const dynamic = 'force-dynamic'

export default async function ProductPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <OfferBar barEn={settings?.offerBarEn} barSi={settings?.offerBarSi} />
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-8">
        <ProductDetailClient product={product} />
      </section>
      <SiteFooter />
    </main>
  )
}
