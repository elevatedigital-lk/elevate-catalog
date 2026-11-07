'use client'

import {useEffect, useMemo, useState} from 'react'
import ProductCard from '@/components/ProductCard'
import {localized, type ActiveOffer, type Product, type Taxonomy} from '@/sanity'
import {useLanguage} from './LanguageProvider'
import FilterPills from './FilterPills'
import FilterSheet from './FilterSheet'
import Pagination from './Pagination'

const ALL = 'all'
type SortKey = 'newest' | 'price-asc' | 'price-desc'

/** 12 per page on desktop/tablet, 10 on mobile (matches the sm: breakpoint at 640px). */
function usePageSize() {
  const [size, setSize] = useState(10)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setSize(mq.matches ? 12 : 10)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return size
}

export default function CatalogClient({
  products,
  categories,
  types,
  offer,
}: {
  products: Product[]
  categories: Taxonomy[]
  types: Taxonomy[]
  offer?: ActiveOffer | null
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
  const [page, setPage] = useState(1)
  const pageSize = usePageSize()

  useEffect(() => {
    setPage(1)
  }, [category, type, inStockOnly, minPrice, maxPriceFilter, sort, pageSize])

  if (products.length === 0) {
    return (
      <p className="text-center" style={{color: 'var(--muted)'}}>
        {t.noProductsYet}
      </p>
    )
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

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

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
      <div
        className="sticky top-0 z-30 -mx-[var(--margin)] mb-6 px-[var(--margin)] py-3 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:p-4"
        style={{backgroundColor: 'var(--surface)'}}
      >
        <div className="flex flex-col gap-2.5">
          {/* Mobile: compact dropdown selects (easy one-handed tap-to-pick) */}
          <div className="flex gap-2 sm:hidden">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="min-h-[40px] flex-1 rounded-lg px-2.5 text-sm font-medium"
              style={{backgroundColor: 'var(--bg)', color: 'var(--ink)'}}
              aria-label={t.category}
            >
              <option value={ALL}>
                {t.category}: {t.all}
              </option>
              {categoryItems.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.label}
                </option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="min-h-[40px] flex-1 rounded-lg px-2.5 text-sm font-medium"
              style={{backgroundColor: 'var(--bg)', color: 'var(--ink)'}}
              aria-label={t.type}
            >
              <option value={ALL}>
                {t.type}: {t.all}
              </option>
              {typeItems.map((ty) => (
                <option key={ty._id} value={ty._id}>
                  {ty.label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop/tablet: pill rows (more visual, room to spare) */}
          <div className="hidden flex-col gap-2.5 sm:flex">
            <FilterPills items={categoryItems} activeId={category} onSelect={setCategory} allLabel={t.all} />
            <FilterPills items={typeItems} activeId={type} onSelect={setType} allLabel={t.all} />
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => setSheetOpen(true)}
              className="press inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition"
              style={
                advancedActiveCount > 0
                  ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'}
                  : {backgroundColor: 'var(--bg)', color: 'var(--muted)'}
              }
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
              </svg>
              {t.moreFilters}
              {advancedActiveCount > 0 && (
                <span className="rounded-full px-1.5 text-[13px]" style={{backgroundColor: 'rgba(244,236,220,0.2)'}}>
                  {advancedActiveCount}
                </span>
              )}
            </button>

            <div
              className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{backgroundColor: 'var(--bg)'}}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" style={{color: 'var(--muted)'}}>
                <path d="M3 7h10M3 12h7M3 17h4M17 4v16m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-transparent text-[13px] font-medium"
                style={{color: 'var(--ink)'}}
                aria-label={t.sortBy}
              >
                <option value="newest">{t.sortNewest}</option>
                <option value="price-asc">{t.sortPriceLow}</option>
                <option value="price-desc">{t.sortPriceHigh}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[13px]" style={{color: 'var(--muted)'}}>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="inline-flex items-center gap-1 font-medium hover:underline">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.clearFilters}
              </button>
            )}
            <span className="whitespace-nowrap">{t.showing(filtered.length, products.length)}</span>
            {pageCount > 1 && <span className="whitespace-nowrap">· {t.pageLabel(safePage, pageCount)}</span>}
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
        <p className="py-12 text-center" style={{color: 'var(--muted)'}}>
          {t.noProductsMatch}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4" data-reveal>
            {paged.map((product) => (
              <ProductCard key={product._id} product={product} offer={offer} />
            ))}
          </div>
          <Pagination
            page={safePage}
            pageCount={pageCount}
            onChange={(p) => {
              setPage(p)
              window.scrollTo({top: 0, behavior: 'smooth'})
            }}
          />
        </>
      )}
    </div>
  )
}
