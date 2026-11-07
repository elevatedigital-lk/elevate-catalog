'use client'

import {useLanguage} from './LanguageProvider'
import {offerBadgeText, type ActiveOffer} from '@/sanity'

export default function OfferBanner({offer}: {offer: ActiveOffer | null}) {
  const {t, lang} = useLanguage()

  if (!offer) return null

  const title = lang === 'si' && offer.titleSi ? offer.titleSi : offer.title
  const text = lang === 'si' && offer.bannerTextSi ? offer.bannerTextSi : offer.bannerTextEn
  const badge = offerBadgeText(offer, lang ?? 'en') ?? (offer.discountPercent ? t.offPercent(offer.discountPercent) : null)

  return (
    <a
      href="#catalog"
      className="press mx-auto flex max-w-6xl items-center justify-between gap-3 px-[var(--margin)] py-3"
      style={{backgroundColor: 'var(--accent)', color: 'var(--accent-ink)'}}
    >
      <span className="flex min-w-0 items-center gap-2 text-[13px] font-semibold sm:text-sm">
        <span className="truncate">
          <strong>{title}</strong> — {text}
        </span>
      </span>
      {badge ? (
        <span
          className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-bold"
          style={{backgroundColor: 'var(--accent-ink)', color: 'var(--accent)'}}
        >
          {badge}
        </span>
      ) : null}
    </a>
  )
}
