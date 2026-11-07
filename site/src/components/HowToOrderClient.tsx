'use client'

import Link from 'next/link'
import {useLanguage} from './LanguageProvider'
import type {SiteSettings} from '@/sanity'

export default function HowToOrderClient({settings}: {settings: SiteSettings | null}) {
  const {t, lang} = useLanguage()

  const policyNote = lang === 'si' ? settings?.policyNoteSi : settings?.policyNoteEn
  const steps = lang === 'si' ? settings?.orderingStepsSi : settings?.orderingStepsEn

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/"
        className="press mb-4 inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3.5 text-sm font-medium"
        style={{backgroundColor: 'var(--surface)', color: 'var(--ink)'}}
      >
        <span aria-hidden>←</span> {t.backToCatalog.replace('← ', '')}
      </Link>

      <h1 className="mb-6 text-2xl font-bold" style={{color: 'var(--ink)', fontFamily: 'var(--font-display)'}}>
        {t.howToOrder}
      </h1>

      {steps && steps.length > 0 && (
        <div className="mb-8 rounded-2xl p-5" style={{backgroundColor: 'var(--surface)'}}>
          <h2 className="mb-4 text-base font-semibold" style={{color: 'var(--ink)'}}>
            {t.stepsToOrder}
          </h2>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{backgroundColor: 'var(--ink)', color: 'var(--bg)'}}
                >
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm" style={{color: 'var(--ink)'}}>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {policyNote && (
        <div className="rounded-2xl p-5" style={{backgroundColor: 'var(--field-2)', color: 'var(--field-2-ink)'}}>
          <h2 className="mb-2 text-base font-semibold">{t.orderPolicy}</h2>
          <p className="whitespace-pre-line text-sm opacity-90">{policyNote}</p>
        </div>
      )}
    </div>
  )
}
