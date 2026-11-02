'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {compressedUrl, localized, type Product} from '@/sanity'
import {useLanguage} from './LanguageProvider'
import WhatsAppButton from './WhatsAppButton'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export default function ProductCard({product}: {product: Product}) {
  const [index, setIndex] = useState(0)
  const {t, lang} = useLanguage()
  const images = product.images || []
  const hasMultiple = images.length > 1

  const displayName = lang === 'si' && product.nameSi ? product.nameSi : product.name

  const message = t.whatsappMessage(displayName, product.code, product.price.toLocaleString())
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  function prev(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    setIndex((i) => (i - 1 + images.length) % images.length)
  }
  function next(e: React.MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
      <Link href={`/product/${product.slug}`} className="contents">
        <div className="relative aspect-square w-full bg-neutral-100">
          {images[index] && (
            <Image
              src={compressedUrl(images[index], 480)}
              alt={displayName}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, 360px"
            />
          )}
          {!product.inStock && (
            <span className="absolute left-2 top-2 rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              {t.outOfStock}
            </span>
          )}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-neutral-800 opacity-0 shadow-sm transition group-hover:opacity-100"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-neutral-800 opacity-0 shadow-sm transition group-hover:opacity-100"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 w-1 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-0.5 p-3.5 pb-0 sm:p-4 sm:pb-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            {[localized(product.category, lang ?? 'en'), localized(product.productType, lang ?? 'en')]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <h3 className="truncate text-sm font-semibold text-neutral-900 sm:text-base">
            {displayName}
          </h3>
          <p className="text-[11px] text-neutral-400">
            {t.code}: {product.code}
          </p>
          <p className="mt-0.5 text-base font-bold text-neutral-900 sm:text-lg">
            LKR {product.price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-3.5 pt-2.5 sm:p-4 sm:pt-3">
        <WhatsAppButton href={waLink} label={t.inquireButton} className="w-full" />
      </div>
    </div>
  )
}
