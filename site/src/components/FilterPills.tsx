'use client'

export default function FilterPills<T extends {_id: string; label: string}>({
  items,
  activeId,
  onSelect,
  allLabel,
}: {
  items: T[]
  activeId: string
  onSelect: (id: string) => void
  allLabel: string
}) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        onClick={() => onSelect('all')}
        className="press shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition"
        style={
          activeId === 'all'
            ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'}
            : {backgroundColor: 'var(--surface)', color: 'var(--muted)'}
        }
      >
        {allLabel}
      </button>
      {items.map((item) => (
        <button
          key={item._id}
          onClick={() => onSelect(item._id)}
          className="press shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition"
          style={
            activeId === item._id
              ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'}
              : {backgroundColor: 'var(--surface)', color: 'var(--muted)'}
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
