'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  compressedUrl,
  discountedPrice,
  localized,
  offerBadgeText,
  productDisplayName,
  type ActiveOffer,
  type Product,
} from '@/sanity'
import {useLanguage} from './LanguageProvider'
import WhatsAppButton from './WhatsAppButton'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export default function ProductCard({
  product,
  offer,
}: {
  product: Product
  offer?: ActiveOffer | null
}) {
  const [index, setIndex] = useState(0)
  const {t, lang} = useLanguage()
  const images = product.images || []
  const hasMultiple = images.length > 1

  const displayName = productDisplayName(product, lang ?? 'en')

  const onOffer = !!offer && offer.productIds.includes(product._id)
  const finalPrice = onOffer ? discountedPrice(product.price, offer!.discountPercent) : product.price

  const message = t.whatsappMessage(displayName, product.code, finalPrice.toLocaleString(), product.inStock)
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
    <div className="group flex flex-col" style={{backgroundColor: 'var(--surface)'}}>
      <Link href={`/product/${encodeURIComponent(product.code)}`} className="contents">
        <div className="relative aspect-square w-full overflow-hidden" style={{backgroundColor: 'var(--surface)'}}>
          {images[index] && (
            <Image
              src={compressedUrl(images[index], 480)}
              alt={displayName}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, 360px"
            />
          )}
          {onOffer && (
            <span
              className="absolute right-0 top-0 px-2.5 py-1 text-[13px] font-semibold uppercase tracking-wide"
              style={{backgroundColor: 'var(--accent)', color: 'var(--accent-ink)'}}
            >
              {offerBadgeText(offer!, lang ?? 'en') ??
                (offer!.discountPercent ? t.offPercent(offer!.discountPercent) : t.offerBadge)}
            </span>
          )}
          {!product.inStock && (
            <span
              className="absolute left-0 top-0 px-2.5 py-1 text-[13px] font-semibold uppercase tracking-wide"
              style={{backgroundColor: 'var(--ink)', color: 'var(--bg)'}}
            >
              {t.outOfStock}
            </span>
          )}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-0 transition group-hover:opacity-100"
                style={{backgroundColor: 'rgba(244,236,220,0.85)', color: 'var(--ink)'}}
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-0 transition group-hover:opacity-100"
                style={{backgroundColor: 'rgba(244,236,220,0.85)', color: 'var(--ink)'}}
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full transition"
                    style={{backgroundColor: i === index ? 'var(--bg)' : 'rgba(244,236,220,0.5)'}}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-0.5 p-3.5 pb-0 sm:p-4 sm:pb-0">
          <p className="text-[13px] font-medium" style={{color: 'var(--muted)'}}>
            {[localized(product.category, lang ?? 'en'), localized(product.productType, lang ?? 'en')]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <h3 className="nums truncate text-base font-semibold sm:text-lg" style={{color: 'var(--ink)'}}>
            {displayName}
          </h3>
          {onOffer ? (
            <div className="mt-0.5">
              <p className="flex items-baseline gap-1.5">
                <span className="text-base font-bold sm:text-lg" style={{color: 'var(--accent-strong)'}}>
                  LKR {finalPrice.toLocaleString()}
                </span>
              </p>
              <p className="text-[13px]" style={{color: 'var(--muted)'}}>
                {t.msrp}: <span className="line-through">{product.price.toLocaleString()}</span>
              </p>
            </div>
          ) : (
            <p className="mt-0.5 text-base font-bold sm:text-lg" style={{color: 'var(--ink)'}}>
              LKR {product.price.toLocaleString()}
            </p>
          )}
        </div>
      </Link>

      <div className="p-3.5 pt-2.5 sm:p-4 sm:pt-3">
        <WhatsAppButton href={waLink} label={t.inquireButton} className="w-full" />
      </div>
    </div>
  )
}
