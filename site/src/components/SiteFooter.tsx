'use client'

import {useLanguage} from './LanguageProvider'

export default function SiteFooter() {
  const {t} = useLanguage()
  return (
    <footer
      className="mt-auto px-[var(--margin)] py-10 text-center sm:py-14"
      style={{backgroundColor: 'var(--field-1)', color: 'var(--field-1-ink)'}}
    >
      <p style={{fontFamily: 'var(--font-display)', fontSize: 'var(--step-head)', fontWeight: 800, letterSpacing: '-0.02em'}}>
        {t.siteTitle}
      </p>
      <p className="mt-2 text-[13px] opacity-70">
        &copy; {new Date().getFullYear()} {t.siteTitle}. {t.footer}
      </p>
    </footer>
  )
}
