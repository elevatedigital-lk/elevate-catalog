'use client'

import {useMemo, useState} from 'react'
import ProductCard from '@/components/ProductCard'
import {localized, type Product, type Taxonomy} from '@/sanity'
import {useLanguage} from './LanguageProvider'

const ALL = 'all'

export default function CatalogClient({
  products,
  categories,
  types,
}: {
  products: Product[]
  categories: Taxonomy[]
  types: Taxonomy[]
}) {
  const {t, lang} = useLanguage()

  const maxPrice = useMemo(
    () => Math.max(0, ...products.map((p) => p.price)),
    [products],
  )

  const [category, setCategory] = useState(ALL)
  const [type, setType] = useState(ALL)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPriceFilter, setMaxPriceFilter] = useState(maxPrice)

  if (products.length === 0) {
    return <p className="text-center text-neutral-500">{t.noProductsYet}</p>
  }

  const filtered = products.filter((p) => {
    if (category !== ALL && p.category?._id !== category) return false
    if (type !== ALL && p.productType?._id !== type) return false
    if (inStockOnly && !p.inStock) return false
    if (p.price < minPrice) return false
    if (p.price > maxPriceFilter) return false
    return true
  })

  function resetFilters() {
    setCategory(ALL)
    setType(ALL)
    setInStockOnly(false)
    setMinPrice(0)
    setMaxPriceFilter(maxPrice)
  }

  const hasActiveFilters =
    category !== ALL || type !== ALL || inStockOnly || minPrice > 0 || maxPriceFilter < maxPrice

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-500">{t.category}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
          >
            <option value={ALL}>{t.all}</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {localized(c, lang ?? 'en')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-500">{t.type}</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
          >
            <option value={ALL}>{t.all}</option>
            {types.map((ty) => (
              <option key={ty._id} value={ty._id}>
                {localized(ty, lang ?? 'en')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-500">
            {t.minPrice}: LKR {minPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={Math.max(1, Math.round(maxPrice / 100))}
            value={minPrice}
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPriceFilter))}
            className="w-36"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-neutral-500">
            {t.maxPrice}: LKR {maxPriceFilter.toLocaleString()}
          </label>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={Math.max(1, Math.round(maxPrice / 100))}
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(Math.max(Number(e.target.value), minPrice))}
            className="w-36"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-black/20"
          />
          {t.inStockOnly}
        </label>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="ml-auto rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
          >
            {t.clearFilters}
          </button>
        )}
      </div>

      <p className="mb-4 text-sm text-neutral-500">{t.showing(filtered.length, products.length)}</p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-neutral-500">{t.noProductsMatch}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
