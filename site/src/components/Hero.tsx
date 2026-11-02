'use client'

import {useLanguage} from './LanguageProvider'

export default function Hero() {
  const {t} = useLanguage()
  return (
    <div className="border-b border-black/5 bg-white px-4 py-8 text-center sm:py-12">
      <h2 className="mx-auto max-w-md text-xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-2xl">
        {t.heroHeadline}
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500">{t.heroSubtext}</p>
    </div>
  )
}
