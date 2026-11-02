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
          className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 sm:text-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" strokeLinecap="round" />
            <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
          </svg>
          {t.howToOrder}
        </Link>
        <LanguageToggle />
      </div>
    </header>
  )
}
