'use client'

import {useState} from 'react'
import Image from 'next/image'
import {urlFor, type Product} from '@/sanity'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export default function ProductCard({product}: {product: Product}) {
  const [index, setIndex] = useState(0)
  const images = product.images || []
  const hasMultiple = images.length > 1

  const message = `Hi! I'm interested in *${product.name}* (Code: ${product.code}), priced at LKR ${product.price.toLocaleString()}. Is it available?`
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  function prev(e: React.MouseEvent) {
    e.stopPropagation()
    setIndex((i) => (i - 1 + images.length) % images.length)
  }
  function next(e: React.MouseEvent) {
    e.stopPropagation()
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full bg-neutral-100">
        {images[index] && (
          <Image
            src={urlFor(images[index]).width(600).height(600).fit('crop').url()}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        )}
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
            Out of stock
          </span>
        )}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-base font-semibold text-neutral-900">{product.name}</h3>
        <p className="text-xs uppercase tracking-wide text-neutral-500">Code: {product.code}</p>
        <p className="mt-1 text-lg font-bold text-neutral-900">
          LKR {product.price.toLocaleString()}
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5a]"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.94.56 3.76 1.53 5.3L2 22l4.93-1.6a9.83 9.83 0 0 0 5.11 1.4h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.44 17.5 2 12.04 2zm5.8 14.07c-.25.7-1.44 1.33-1.98 1.4-.5.08-1.14.11-1.84-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.78-4.17-4.93-4.37-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.59-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.25.59.84 2.05.91 2.2.08.15.13.33.03.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.3.78 1.28 1.67 2.07 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.66-.05.18-.18.76-.87.96-1.17.2-.3.4-.25.68-.15.28.1 1.77.83 2.08.98.3.15.5.22.57.35.08.13.08.73-.17 1.43z" />
          </svg>
          Inquire on WhatsApp
        </a>
      </div>
    </div>
  )
}
