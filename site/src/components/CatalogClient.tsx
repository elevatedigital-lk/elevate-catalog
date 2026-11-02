'use client'

import {useMemo, useState} from 'react'
import ProductCard from '@/components/ProductCard'
import {localized, type Product, type Taxonomy} from '@/sanity'
import {useLanguage} from './LanguageProvider'
import FilterPills from './FilterPills'
import FilterSheet from './FilterSheet'

const ALL = 'all'
type SortKey = 'newest' | 'price-asc' | 'price-desc'

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
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sort, setSort] = useState<SortKey>('newest')

  if (products.length === 0) {
    return <p className="text-center text-neutral-500">{t.noProductsYet}</p>
  }

  const filtered = products
    .filter((p) => {
      if (category !== ALL && p.category?._id !== category) return false
      if (type !== ALL && p.productType?._id !== type) return false
      if (inStockOnly && !p.inStock) return false
      if (p.price < minPrice) return false
      if (p.price > maxPriceFilter) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return 0 // 'newest' — keep server order (already newest-first)
    })

  function resetFilters() {
    setCategory(ALL)
    setType(ALL)
    setInStockOnly(false)
    setMinPrice(0)
    setMaxPriceFilter(maxPrice)
  }

  const priceFilterActive = minPrice > 0 || maxPriceFilter < maxPrice
  const advancedActiveCount = (priceFilterActive ? 1 : 0) + (inStockOnly ? 1 : 0)
  const hasActiveFilters = category !== ALL || type !== ALL || advancedActiveCount > 0

  const categoryItems = categories.map((c) => ({_id: c._id, label: localized(c, lang ?? 'en')}))
  const typeItems = types.map((ty) => ({_id: ty._id, label: localized(ty, lang ?? 'en')}))

  return (
    <div>
      <div className="sticky top-0 z-30 -mx-4 mb-5 border-b border-black/5 bg-neutral-50/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border sm:border-black/10 sm:bg-white sm:p-4 sm:shadow-sm">
        <div className="flex flex-col gap-2.5">
          <FilterPills items={categoryItems} activeId={category} onSelect={setCategory} allLabel={t.all} />
          <FilterPills items={typeItems} activeId={type} onSelect={setType} allLabel={t.all} />

          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => setSheetOpen(true)}
              className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                advancedActiveCount > 0
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-black/10 bg-white text-neutral-600'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
              </svg>
              {t.moreFilters}
              {advancedActiveCount > 0 && (
                <span className="rounded-full bg-white/20 px-1.5 text-xs">{advancedActiveCount}</span>
              )}
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="ml-auto shrink-0 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600"
              aria-label={t.sortBy}
            >
              <option value="newest">{t.sortNewest}</option>
              <option value="price-asc">{t.sortPriceLow}</option>
              <option value="price-desc">{t.sortPriceHigh}</option>
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-400">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="font-medium text-neutral-500 underline-offset-2 hover:underline"
              >
                {t.clearFilters}
              </button>
            )}
            <span className="whitespace-nowrap">{t.showing(filtered.length, products.length)}</span>
          </div>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        maxPrice={maxPrice}
        minPrice={minPrice}
        maxPriceFilter={maxPriceFilter}
        setMinPrice={setMinPrice}
        setMaxPriceFilter={setMaxPriceFilter}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />

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
