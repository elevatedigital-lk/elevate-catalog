'use client'

import {useLanguage} from './LanguageProvider'

export default function Hero() {
  const {t} = useLanguage()
  return (
    <div className="border-b border-black/5 bg-white px-4 py-5 text-center sm:py-7">
      <h2 className="mx-auto max-w-md text-lg font-bold leading-tight tracking-tight text-neutral-900 sm:text-2xl">
        {t.heroHeadline}
      </h2>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-neutral-500">{t.heroSubtext}</p>
    </div>
  )
}
