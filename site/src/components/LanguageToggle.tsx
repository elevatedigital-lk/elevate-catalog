'use client'

import {useLanguage} from './LanguageProvider'

export default function LanguageToggle() {
  const {lang, setLang} = useLanguage()

  return (
    <div className="inline-flex rounded-full border border-black/10 bg-white p-0.5 text-xs font-medium">
      <button
        onClick={() => setLang('en')}
        className={`rounded-full px-3 py-1 transition ${
          lang === 'en' ? 'bg-neutral-900 text-white' : 'text-neutral-500'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('si')}
        className={`rounded-full px-3 py-1 transition ${
          lang === 'si' ? 'bg-neutral-900 text-white' : 'text-neutral-500'
        }`}
      >
        සිං
      </button>
    </div>
  )
}
