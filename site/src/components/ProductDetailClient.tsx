'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  compressedUrl,
  localized,
  discountedPrice,
  offerBadgeText,
  productDisplayName,
  type ActiveOffer,
  type Product,
} from '@/sanity'
import {useLanguage} from './LanguageProvider'
import WhatsAppButton from './WhatsAppButton'
import SizeChartAccordion from './SizeChartAccordion'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export default function ProductDetailClient({
  product,
  offer,
}: {
  product: Product
  offer?: ActiveOffer | null
}) {
  const {t, lang} = useLanguage()
  const [index, setIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showValidation, setShowValidation] = useState(false)
  const images = product.images || []

  const onOffer = !!offer && offer.productIds.includes(product._id)
  const finalPrice = onOffer ? discountedPrice(product.price, offer!.discountPercent) : product.price

  const displayName = productDisplayName(product, lang ?? 'en')
  const displayDescription =
    lang === 'si' && product.descriptionSi ? product.descriptionSi : product.description

  const colors = product.colors || []
  const sizes = product.sizes || []
  const needsColor = colors.length > 0
  const needsSize = sizes.length > 0
  const colorOk = !needsColor || !!selectedColor
  const sizeOk = !needsSize || !!selectedSize
  const canInquire = colorOk && sizeOk

  const selectedColorObj = colors.find((c) => c.name === selectedColor)
  const colorLabel = selectedColorObj ? localized(selectedColorObj, lang ?? 'en') : ''
  const sizeLabel = selectedSize || ''

  const message =
    needsColor || needsSize
      ? t.whatsappMessageDetailed(
          displayName,
          product.code,
          finalPrice.toLocaleString(),
          colorLabel || '-',
          sizeLabel || '-',
          product.inStock,
        )
      : t.whatsappMessage(displayName, product.code, finalPrice.toLocaleString(), product.inStock)
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  function handleInquireClick(e: React.MouseEvent) {
    if (!canInquire) {
      e.preventDefault()
      setShowValidation(true)
    }
  }

  return (
    <div className="pb-24 sm:pb-0">
      <Link
        href="/"
        className="press mb-4 inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3.5 text-sm font-medium"
        style={{backgroundColor: 'var(--surface)', color: 'var(--ink)'}}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t.backToCatalog.replace('← ', '')}
      </Link>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden" style={{backgroundColor: 'var(--surface)'}}>
            {images[index] && (
              <Image
                src={compressedUrl(images[index], 700, {quality: 70})}
                alt={displayName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 450px"
                priority
              />
            )}
            {!product.inStock && (
              <span
                className="absolute left-0 top-0 px-3 py-1 text-[13px] font-medium"
                style={{backgroundColor: 'var(--ink)', color: 'var(--bg)'}}
              >
                {t.outOfStock}
              </span>
            )}
            {onOffer && (
              <span
                className="absolute right-0 top-0 px-3 py-1 text-[13px] font-bold uppercase tracking-wide"
                style={{backgroundColor: 'var(--accent)', color: 'var(--accent-ink)'}}
              >
                {offerBadgeText(offer!, lang ?? 'en') ??
                  (offer!.discountPercent ? t.offPercent(offer!.discountPercent) : t.offerBadge)}
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="press relative h-16 w-16 shrink-0 overflow-hidden transition"
                  style={{
                    outline: i === index ? '2px solid var(--ink)' : '2px solid transparent',
                    outlineOffset: '-2px',
                    opacity: i === index ? 1 : 0.65,
                  }}
                >
                  <Image
                    src={compressedUrl(img, 120)}
                    alt={`${displayName} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {product.category && (
              <span
                className="rounded-full px-2.5 py-1 text-[13px] font-medium"
                style={{backgroundColor: 'var(--surface)', color: 'var(--muted)'}}
              >
                {localized(product.category, lang ?? 'en')}
              </span>
            )}
            {product.productType && (
              <span
                className="rounded-full px-2.5 py-1 text-[13px] font-medium"
                style={{backgroundColor: 'var(--surface)', color: 'var(--muted)'}}
              >
                {localized(product.productType, lang ?? 'en')}
              </span>
            )}
          </div>

          <h1 className="nums text-2xl font-bold" style={{color: 'var(--ink)', fontFamily: 'var(--font-display)'}}>
            {displayName}
          </h1>

          <div className="mt-3">
            {onOffer ? (
              <>
                <p className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{color: 'var(--accent-strong)'}}>
                    LKR {finalPrice.toLocaleString()}
                  </span>
                </p>
                <p className="mt-0.5 text-sm" style={{color: 'var(--muted)'}}>
                  {t.msrp}: <span className="line-through">LKR {product.price.toLocaleString()}</span>
                  <span className="ml-2 font-semibold" style={{color: 'var(--accent-strong)'}}>
                    {offerBadgeText(offer!, lang ?? 'en') ??
                      (offer!.discountPercent ? t.offPercent(offer!.discountPercent) : t.offerBadge)}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold" style={{color: 'var(--ink)'}}>
                LKR {product.price.toLocaleString()}
              </p>
            )}
          </div>

          {needsColor && (
            <div className="mt-5">
              <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold" style={{color: 'var(--ink)'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.9-4.5-9-10-9z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.color}
                {selectedColor ? `: ${colorLabel}` : ''}
              </h2>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const active = selectedColor === c.name
                  return (
                    <button
                      key={c.name}
                      disabled={!c.inStock}
                      onClick={() => {
                        setSelectedColor(c.name)
                        setShowValidation(false)
                      }}
                      title={c.inStock ? localized(c, lang ?? 'en') : `${localized(c, lang ?? 'en')} — ${t.outOfStock}`}
                      className="press relative flex min-h-[44px] items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition"
                      style={
                        !c.inStock
                          ? {backgroundColor: 'var(--surface)', color: 'var(--muted)', opacity: 0.5, textDecoration: 'line-through', cursor: 'not-allowed'}
                          : active
                            ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'}
                            : {backgroundColor: 'var(--surface)', color: 'var(--ink)'}
                      }
                    >
                      {c.hex && (
                        <span
                          className="h-4 w-4 shrink-0 rounded-full"
                          style={{backgroundColor: c.hex}}
                        />
                      )}
                      {localized(c, lang ?? 'en')}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {needsSize && (
            <div className="mt-5">
              <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold" style={{color: 'var(--ink)'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="10" rx="1.5" />
                  <path d="M6 7v3M10 7v3M14 7v3M18 7v3" strokeLinecap="round" />
                </svg>
                {t.size}
                {selectedSize ? `: ${selectedSize}` : ''}
              </h2>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => {
                  const active = selectedSize === s.size
                  return (
                    <button
                      key={s.size}
                      disabled={!s.inStock}
                      onClick={() => {
                        setSelectedSize(s.size)
                        setShowValidation(false)
                      }}
                      title={!s.inStock ? t.outOfStock : undefined}
                      className="press flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-3 text-sm font-medium transition"
                      style={
                        !s.inStock
                          ? {backgroundColor: 'var(--surface)', color: 'var(--muted)', opacity: 0.5, textDecoration: 'line-through', cursor: 'not-allowed'}
                          : active
                            ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'}
                            : {backgroundColor: 'var(--surface)', color: 'var(--ink)'}
                      }
                    >
                      {s.size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {showValidation && !canInquire && (
            <p className="mt-3 text-sm font-medium" style={{color: 'var(--accent-strong)'}}>
              {t.selectBothToInquire}
            </p>
          )}

          <div className="mt-5 hidden sm:block">
            <WhatsAppButton
              href={canInquire ? waLink : '#'}
              label={t.inquireButton}
              className={!canInquire ? 'w-full cursor-pointer opacity-50 sm:w-auto' : 'w-full sm:w-auto'}
            />
          </div>

          {displayDescription && (
            <div className="mt-6">
              <h2 className="mb-1 flex items-center gap-1.5 text-sm font-semibold" style={{color: 'var(--ink)'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2h9l5 5v15H6V2z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 2v5h5M9 13h6M9 17h6" strokeLinecap="round" />
                </svg>
                {t.description}
              </h2>
              <p className="whitespace-pre-line text-sm" style={{color: 'var(--muted)'}}>
                {displayDescription}
              </p>
            </div>
          )}

          <SizeChartAccordion table={product.sizeChartTable} image={product.sizeChartImage} />
        </div>
      </div>

      {/* Mobile fixed bottom action bar — keeps the inquire button always reachable */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] backdrop-blur sm:hidden"
        style={{backgroundColor: 'rgba(255,255,255,0.96)'}}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px]" style={{color: 'var(--muted)'}}>
              {displayName}
            </p>
            {onOffer ? (
              <p className="flex items-baseline gap-1.5">
                <span className="text-base font-bold" style={{color: 'var(--accent-strong)'}}>
                  LKR {finalPrice.toLocaleString()}
                </span>
                <span className="text-[13px] line-through" style={{color: 'var(--muted)'}}>
                  {product.price.toLocaleString()}
                </span>
              </p>
            ) : (
              <p className="text-base font-bold" style={{color: 'var(--ink)'}}>
                LKR {product.price.toLocaleString()}
              </p>
            )}
          </div>
          <a
            href={canInquire ? waLink : undefined}
            onClick={handleInquireClick}
            target={canInquire ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="press inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition"
            style={{
              backgroundColor: canInquire ? '#25D366' : 'var(--surface)',
              color: canInquire ? '#ffffff' : 'var(--muted)',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.94.56 3.76 1.53 5.3L2 22l4.93-1.6a9.83 9.83 0 0 0 5.11 1.4h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.44 17.5 2 12.04 2zm5.8 14.07c-.25.7-1.44 1.33-1.98 1.4-.5.08-1.14.11-1.84-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.78-4.17-4.93-4.37-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.59-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.25.59.84 2.05.91 2.2.08.15.13.33.03.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.3.78 1.28 1.67 2.07 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.66-.05.18-.18.76-.87.96-1.17.2-.3.4-.25.68-.15.28.1 1.77.83 2.08.98.3.15.5.22.57.35.08.13.08.73-.17 1.43z" />
            </svg>
            {t.inquireButton}
          </a>
        </div>
        {showValidation && !canInquire && (
          <p className="mt-1.5 text-center text-[13px] font-medium" style={{color: 'var(--accent-strong)'}}>
            {t.selectBothToInquire}
          </p>
        )}
      </div>
    </div>
  )
}
