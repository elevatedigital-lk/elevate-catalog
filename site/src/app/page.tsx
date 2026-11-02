import {getProducts} from '@/sanity'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="border-b border-black/5 bg-white px-4 py-6 text-center sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Beto
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Browse our shoes below and tap &ldquo;Inquire on WhatsApp&rdquo; to order.
        </p>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        {products.length === 0 ? (
          <p className="text-center text-neutral-500">
            No products yet — check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <footer className="px-4 py-8 text-center text-xs text-neutral-400">
        &copy; {new Date().getFullYear()} Beto. All prices in LKR.
      </footer>
    </main>
  )
}
