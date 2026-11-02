'use client'

import Link from 'next/link'
import {useLanguage} from './LanguageProvider'
import LanguageToggle from './LanguageToggle'

export default function SiteHeader() {
  const {t} = useLanguage()
  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-3 sm:px-6">
      <Link href="/">
        <span className="text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
          {t.siteTitle}
        </span>
      </Link>
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/how-to-order"
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 sm:text-sm"
        >
          {t.howToOrder}
        </Link>
        <LanguageToggle />
      </div>
    </header>
  )
}
