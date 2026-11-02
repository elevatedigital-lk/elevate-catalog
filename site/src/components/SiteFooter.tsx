'use client'

import {useLanguage} from './LanguageProvider'

export default function SiteFooter() {
  const {t} = useLanguage()
  return (
    <footer className="px-4 py-8 text-center text-xs text-neutral-400">
      &copy; {new Date().getFullYear()} {t.siteTitle}. {t.footer}
    </footer>
  )
}
