'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {urlFor, localized, type Product} from '@/sanity'
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
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="contents">
        <div className="relative aspect-square w-full bg-neutral-100">
          {images[index] && (
            <Image
              src={urlFor(images[index]).width(600).height(600).fit('crop').url()}
              alt={displayName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 400px"
            />
          )}
          {!product.inStock && (
            <span className="absolute left-2 top-2 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
              {t.outOfStock}
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

        <div className="flex flex-1 flex-col gap-1 p-4 pb-0">
          <div className="flex flex-wrap gap-1">
            {product.category && (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                {localized(product.category, lang ?? 'en')}
              </span>
            )}
            {product.productType && (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                {localized(product.productType, lang ?? 'en')}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-neutral-900">{displayName}</h3>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {t.code}: {product.code}
          </p>
          <p className="mt-1 text-lg font-bold text-neutral-900">
            LKR {product.price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-3">
        <WhatsAppButton href={waLink} label={t.inquireButton} className="w-full" />
      </div>
    </div>
  )
}
