'use client'

import Link from 'next/link'
import {useLanguage} from './LanguageProvider'
import LanguageToggle from './LanguageToggle'

export default function SiteHeader() {
  const {t} = useLanguage()
  return (
    <header className="relative border-b border-black/5 bg-white px-4 py-6 text-center sm:py-10">
      <div className="absolute left-4 top-4">
        <Link href="/how-to-order" className="text-xs font-medium text-neutral-500 hover:text-neutral-900 sm:text-sm">
          {t.howToOrder}
        </Link>
      </div>
      <div className="absolute right-4 top-4">
        <LanguageToggle />
      </div>
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {t.siteTitle}
        </h1>
      </Link>
      <p className="mt-1 text-sm text-neutral-500">{t.tagline}</p>
    </header>
  )
}
