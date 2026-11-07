'use client'

import {useLanguage} from './LanguageProvider'

export default function FilterSheet({
  open,
  onClose,
  maxPrice,
  minPrice,
  maxPriceFilter,
  setMinPrice,
  setMaxPriceFilter,
  inStockOnly,
  setInStockOnly,
}: {
  open: boolean
  onClose: () => void
  maxPrice: number
  minPrice: number
  maxPriceFilter: number
  setMinPrice: (n: number) => void
  setMaxPriceFilter: (n: number) => void
  inStockOnly: boolean
  setInStockOnly: (b: boolean) => void
}) {
  const {t} = useLanguage()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0" style={{backgroundColor: 'rgba(43,24,16,0.5)'}} onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-t-3xl p-5 pb-8 shadow-xl sm:rounded-3xl"
        style={{backgroundColor: 'var(--bg)'}}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full sm:hidden" style={{backgroundColor: 'var(--surface)'}} />
        <h3 className="mb-4 text-base font-semibold" style={{color: 'var(--ink)'}}>
          {t.priceRange}
        </h3>

        <div className="mb-4 flex flex-col gap-1">
          <label className="text-[13px] font-medium" style={{color: 'var(--muted)'}}>
            {t.minPrice}: LKR {minPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={Math.max(1, Math.round(maxPrice / 100))}
            value={minPrice}
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPriceFilter))}
            className="w-full accent-[var(--accent)]"
          />
        </div>

        <div className="mb-5 flex flex-col gap-1">
          <label className="text-[13px] font-medium" style={{color: 'var(--muted)'}}>
            {t.maxPrice}: LKR {maxPriceFilter.toLocaleString()}
          </label>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={Math.max(1, Math.round(maxPrice / 100))}
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(Math.max(Number(e.target.value), minPrice))}
            className="w-full accent-[var(--accent)]"
          />
        </div>

        <label className="mb-6 flex items-center gap-2 text-sm" style={{color: 'var(--ink)'}}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-5 w-5 accent-[var(--accent)]"
          />
          {t.inStockOnly}
        </label>

        <button
          onClick={onClose}
          className="press flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
          style={{backgroundColor: 'var(--ink)', color: 'var(--bg)'}}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.done}
        </button>
      </div>
    </div>
  )
}
