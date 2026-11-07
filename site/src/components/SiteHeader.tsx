'use client'

import Link from 'next/link'
import {useLanguage} from './LanguageProvider'
import LanguageToggle from './LanguageToggle'

export default function SiteHeader() {
  const {t} = useLanguage()
  return (
    <header
      className="flex items-center justify-between px-[var(--margin)] py-3 sm:py-4"
      style={{backgroundColor: 'var(--bg)', color: 'var(--ink)'}}
    >
      <Link href="/">
        <span className="text-lg font-bold tracking-tight sm:text-xl" style={{fontFamily: 'var(--font-display)'}}>
          {t.siteTitle}
        </span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/how-to-order"
          className="press flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold sm:text-sm"
          style={{backgroundColor: 'var(--accent)', color: 'var(--accent-ink)'}}
        >
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
