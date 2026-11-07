'use client'

import {useLanguage} from './LanguageProvider'

export default function OfferBar({barEn, barSi}: {barEn?: string; barSi?: string}) {
  const {lang} = useLanguage()
  const text = lang === 'si' && barSi ? barSi : barEn

  if (!text) return null

  return (
    <div
      className="px-4 py-1.5 text-center text-[13px] font-medium tracking-wide sm:text-[13px]"
      style={{backgroundColor: 'var(--ink)', color: 'var(--bg)'}}
    >
      {text}
    </div>
  )
}
