'use client'

import {useLanguage} from './LanguageProvider'
import type {ActiveOffer} from '@/sanity'

export default function OfferBanner({offer}: {offer: ActiveOffer | null}) {
  const {t, lang} = useLanguage()

  if (!offer) return null

  const title = lang === 'si' && offer.titleSi ? offer.titleSi : offer.title
  const text = lang === 'si' && offer.bannerTextSi ? offer.bannerTextSi : offer.bannerTextEn

  return (
    <a
      href="#catalog"
      className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl bg-neutral-900 px-4 py-3 text-white sm:px-6 sm:py-4"
    >
      <span className="flex min-w-0 items-center gap-2 text-xs font-semibold sm:text-sm">
        <span className="text-amber-400">●</span>
        <span className="truncate">
          <strong>{title}</strong> — {text}
        </span>
      </span>
      {offer.discountPercent ? (
        <span className="shrink-0 whitespace-nowrap rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-neutral-900">
          {t.offPercent(offer.discountPercent)}
        </span>
      ) : null}
    </a>
  )
}
