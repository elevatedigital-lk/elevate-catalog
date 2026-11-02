'use client'

import {useLanguage} from './LanguageProvider'

export default function LanguagePicker() {
  const {lang, setLang} = useLanguage()

  if (lang !== null) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <h2 className="mb-1 text-lg font-semibold text-neutral-900">Beto</h2>
        <p className="mb-5 text-sm text-neutral-500">
          Choose your language / ඔබගේ භාෂාව තෝරන්න
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setLang('en')}
            className="rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700"
          >
            English
          </button>
          <button
            onClick={() => setLang('si')}
            className="rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            සිංහල
          </button>
        </div>
      </div>
    </div>
  )
}
