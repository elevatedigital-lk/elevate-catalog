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
      setVisible(true)
      window.sessionStorage.setItem(SESSION_KEY, '1')
    }, 8000)

    return () => clearTimeout(timer)
  }, [pathname, lang])

  if (!visible) return null

  return (
    <div className="fixed inset-x-4 bottom-20 z-40 mx-auto max-w-sm rounded-2xl border border-black/10 bg-white p-4 shadow-lg sm:bottom-6">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-neutral-900">{t.nudgeTitle}</p>
          <p className="mt-0.5 text-xs text-neutral-500">{t.nudgeBody}</p>
          <Link
            href="/how-to-order"
            onClick={() => setVisible(false)}
            className="mt-2 inline-flex min-h-[36px] items-center rounded-full bg-neutral-900 px-3.5 text-xs font-semibold text-white"
          >
            {t.howToOrder}
          </Link>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label={t.nudgeDismiss}
          className="shrink-0 rounded-full p-1 text-neutral-400 hover:text-neutral-700"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
