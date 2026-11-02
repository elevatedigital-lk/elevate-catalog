import {notFound} from 'next/navigation'
import {getProductBySlug} from '@/sanity'
import ProductDetailClient from '@/components/ProductDetailClient'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const dynamic = 'force-dynamic'

export default async function ProductPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-8">
        <ProductDetailClient product={product} />
      </section>
      <SiteFooter />
    </main>
  )
}
