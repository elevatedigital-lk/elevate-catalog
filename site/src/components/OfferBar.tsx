'use client'

import {useLanguage} from './LanguageProvider'

export default function OfferBar({barEn, barSi}: {barEn?: string; barSi?: string}) {
  const {lang} = useLanguage()
  const text = lang === 'si' && barSi ? barSi : barEn

  if (!text) return null

  return (
    <div className="bg-neutral-900 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs">
      {text}
    </div>
  )
}
