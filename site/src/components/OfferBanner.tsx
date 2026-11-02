'use client'

import {useLanguage} from './LanguageProvider'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export default function OfferBanner({
  bannerEn,
  bannerSi,
}: {
  bannerEn?: string
  bannerSi?: string
}) {
  const {t, lang} = useLanguage()
  const text = lang === 'si' && bannerSi ? bannerSi : bannerEn

  if (!text) return null

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl bg-neutral-900 px-4 py-3 text-white sm:px-6 sm:py-4"
    >
      <span className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
        <span className="text-amber-400">●</span>
        {text}
      </span>
      <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-amber-400 sm:text-sm">
        {t.inquireButton} →
      </span>
    </a>
  )
}
