'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useLanguage} from './LanguageProvider'

const SESSION_KEY = 'beto-howto-nudge-shown'

export default function HowToOrderNudge() {
  const {t, lang} = useLanguage()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Don't nudge on the How to Order page itself, and only once per session.
    if (pathname === '/how-to-order') return
    if (lang === null) return
    if (window.sessionStorage.getItem(SESSION_KEY)) return

    const timer = setTimeout(() => {
      // Skip if already scrolled near the page bottom — avoids covering the footer.
      const nearBottom =
        window.scrollY + window.innerHeight > document.body.scrollHeight - 280
      if (nearBottom) return
      setVisible(true)
      window.sessionStorage.setItem(SESSION_KEY, '1')
    }, 8000)

    return () => clearTimeout(timer)
  }, [pathname, lang])

  // While shown, auto-hide if the user scrolls into the footer area so it never sits over it.
  useEffect(() => {
    if (!visible) return
    const onScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight > document.body.scrollHeight - 280
      if (nearBottom) setVisible(false)
    }
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-4 bottom-20 z-40 mx-auto max-w-sm rounded-2xl p-4 shadow-lg sm:bottom-6"
      style={{backgroundColor: 'var(--bg)'}}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold" style={{color: 'var(--ink)'}}>
            {t.nudgeTitle}
          </p>
          <p className="mt-0.5 text-[13px]" style={{color: 'var(--muted)'}}>
            {t.nudgeBody}
          </p>
          <Link
            href="/how-to-order"
            onClick={() => setVisible(false)}
            className="press mt-2 inline-flex min-h-[36px] items-center rounded-full px-3.5 text-[13px] font-semibold"
            style={{backgroundColor: 'var(--accent)', color: 'var(--accent-ink)'}}
          >
            {t.howToOrder}
          </Link>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label={t.nudgeDismiss}
          className="shrink-0 rounded-full p-1"
          style={{color: 'var(--muted)'}}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
