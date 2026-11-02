'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {urlFor, localized, type Product} from '@/sanity'
import {useLanguage} from './LanguageProvider'
import WhatsAppButton from './WhatsAppButton'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export default function ProductDetailClient({product}: {product: Product}) {
  const {t, lang} = useLanguage()
  const [index, setIndex] = useState(0)
  const images = product.images || []

  const displayName = lang === 'si' && product.nameSi ? product.nameSi : product.name
  const displayDescription =
    lang === 'si' && product.descriptionSi ? product.descriptionSi : product.description

  const message = t.whatsappMessage(displayName, product.code, product.price.toLocaleString())
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <div>
      <Link href="/" className="mb-4 inline-block text-sm font-medium text-neutral-500 hover:text-neutral-900">
        {t.backToCatalog}
      </Link>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
            {images[index] && (
              <Image
                src={urlFor(images[index]).width(900).height(900).fit('crop').url()}
                alt={displayName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 450px"
                priority
              />
            )}
            {!product.inStock && (
              <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
                {t.outOfStock}
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === index ? 'border-neutral-900' : 'border-transparent opacity-70'
                  }`}
                >
                  <Image
                    src={urlFor(img).width(120).height(120).fit('crop').url()}
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
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                {localized(product.category, lang ?? 'en')}
              </span>
            )}
            {product.productType && (
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                {localized(product.productType, lang ?? 'en')}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-neutral-900">{displayName}</h1>
          <p className="mt-1 text-sm uppercase tracking-wide text-neutral-500">
            {t.code}: {product.code}
          </p>
          <p className="mt-3 text-2xl font-bold text-neutral-900">
            LKR {product.price.toLocaleString()}
          </p>

          <div className="mt-5">
            <WhatsAppButton href={waLink} label={t.inquireButton} className="w-full sm:w-auto" />
          </div>

          {displayDescription && (
            <div className="mt-6">
              <h2 className="mb-1 text-sm font-semibold text-neutral-900">{t.description}</h2>
              <p className="whitespace-pre-line text-sm text-neutral-600">{displayDescription}</p>
            </div>
          )}

          {product.availableSizes && (
            <div className="mt-5">
              <h2 className="mb-1 text-sm font-semibold text-neutral-900">{t.sizesAvailable}</h2>
              <div className="flex flex-wrap gap-1.5">
                {product.availableSizes.split(',').map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-black/10 px-2.5 py-1 text-sm text-neutral-700"
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.sizeChartImage && (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold text-neutral-900">{t.sizeChart}</h2>
              <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-black/10">
                <Image
                  src={urlFor(product.sizeChartImage).width(800).url()}
                  alt={t.sizeChart}
                  fill
                  className="object-contain bg-white"
                  sizes="(max-width: 640px) 100vw, 384px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
