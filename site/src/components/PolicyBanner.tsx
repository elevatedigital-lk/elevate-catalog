'use client'

import Link from 'next/link'
import {useLanguage} from './LanguageProvider'

export default function PolicyBanner({
  noteEn,
  noteSi,
}: {
  noteEn?: string
  noteSi?: string
}) {
  const {t, lang} = useLanguage()
  const note = lang === 'si' && noteSi ? noteSi : noteEn

  if (!note) return null

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 sm:text-sm">
      <span className="mx-auto max-w-3xl">
        {note}{' '}
        <Link href="/how-to-order" className="font-semibold underline underline-offset-2">
          {t.howToOrder}
        </Link>
      </span>
    </div>
  )
}
