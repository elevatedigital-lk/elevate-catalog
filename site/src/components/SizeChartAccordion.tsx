'use client'

import {useState} from 'react'
import Image from 'next/image'
import {urlFor, type SizeChartRow} from '@/sanity'
import {useLanguage} from './LanguageProvider'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export default function SizeChartAccordion({
  table,
  image,
}: {
  table?: SizeChartRow[]
  image?: SanityImageSource
}) {
  const {t} = useLanguage()
  const [open, setOpen] = useState(false)

  if ((!table || table.length === 0) && !image) return null

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-black/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 bg-neutral-50 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 17h18M3 12h18M3 7h18" strokeLinecap="round" />
          </svg>
          {t.sizeChart}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-black/10 p-4">
          {table && table.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-neutral-500">
                  <th className="py-1.5 font-medium">{t.size}</th>
                  <th className="py-1.5 font-medium">cm</th>
                </tr>
              </thead>
              <tbody>
                {table.map((row) => (
                  <tr key={row.size} className="border-t border-black/5">
                    <td className="py-1.5 font-medium text-neutral-800">{row.size}</td>
                    <td className="py-1.5 text-neutral-600">{row.measurementCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {image && (
            <div
              className={`relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-black/10 ${
                table && table.length > 0 ? 'mt-4' : ''
              }`}
            >
              <Image
                src={urlFor(image).width(800).url()}
                alt={t.sizeChart}
                fill
                className="bg-white object-contain"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
