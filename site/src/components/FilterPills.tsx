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
        className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
          activeId === 'all'
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-100 text-neutral-600 active:bg-neutral-200'
        }`}
      >
        {allLabel}
      </button>
      {items.map((item) => (
        <button
          key={item._id}
          onClick={() => onSelect(item._id)}
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
            activeId === item._id
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-600 active:bg-neutral-200'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
