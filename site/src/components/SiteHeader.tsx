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
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/how-to-order"
          className="relative flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-sm transition active:scale-95 sm:text-sm"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
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
