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
        className="mb-4 inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 text-sm font-medium text-neutral-700 shadow-sm active:scale-[0.97]"
      >
        <span aria-hidden>←</span> {t.backToCatalog.replace('← ', '')}
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-neutral-900">{t.howToOrder}</h1>

      {steps && steps.length > 0 && (
        <div className="mb-8 rounded-2xl border border-black/10 bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-neutral-900">{t.stepsToOrder}</h2>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm text-neutral-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {policyNote && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-base font-semibold text-amber-900">{t.orderPolicy}</h2>
          <p className="whitespace-pre-line text-sm text-amber-900">{policyNote}</p>
        </div>
      )}
    </div>
  )
}
