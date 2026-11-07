'use client'

export default function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
}) {
  if (pageCount <= 1) return null

  // Compact page-number window: current ±1, plus first/last, with ellipses.
  const nums = new Set<number>([1, pageCount, page, page - 1, page + 1])
  const pages = [...nums].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b)

  const items: (number | 'ellipsis')[] = []
  let prev = 0
  for (const n of pages) {
    if (prev && n - prev > 1) items.push('ellipsis')
    items.push(n)
    prev = n
  }

  const btnBase = 'press inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2.5 text-sm font-medium transition'

  return (
    <nav className="mt-9 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${btnBase} disabled:opacity-30`}
        style={{backgroundColor: 'var(--surface)', color: 'var(--ink)'}}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {items.map((it, i) =>
        it === 'ellipsis' ? (
          <span key={`e${i}`} className="px-1" style={{color: 'var(--muted)'}}>
            …
          </span>
        ) : (
          <button
            key={it}
            onClick={() => onChange(it)}
            aria-current={it === page ? 'page' : undefined}
            className={btnBase}
            style={
              it === page
                ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'}
                : {backgroundColor: 'var(--surface)', color: 'var(--ink)'}
            }
          >
            {it}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className={`${btnBase} disabled:opacity-30`}
        style={{backgroundColor: 'var(--surface)', color: 'var(--ink)'}}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  )
}
