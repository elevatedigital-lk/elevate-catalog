'use client'

import {useLanguage} from './LanguageProvider'
import LanguageToggle from './LanguageToggle'

export default function SiteHeader() {
  const {t} = useLanguage()
  return (
    <header className="relative border-b border-black/5 bg-white px-4 py-6 text-center sm:py-10">
      <div className="absolute right-4 top-4">
        <LanguageToggle />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {t.siteTitle}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">{t.tagline}</p>
    </header>
  )
}
