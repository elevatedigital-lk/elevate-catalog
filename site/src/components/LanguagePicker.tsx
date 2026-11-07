'use client'

import {useLanguage} from './LanguageProvider'

export default function LanguagePicker() {
  const {lang, setLang} = useLanguage()

  if (lang !== null) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{backgroundColor: 'rgba(43,24,16,0.6)'}}>
      <div className="w-full max-w-sm rounded-2xl p-6 text-center shadow-xl" style={{backgroundColor: 'var(--bg)'}}>
        <h2 className="mb-1 text-lg font-semibold" style={{color: 'var(--ink)', fontFamily: 'var(--font-display)'}}>
          Beto
        </h2>
        <p className="mb-5 text-sm" style={{color: 'var(--muted)'}}>
          Choose your language / ඔබගේ භාෂාව තෝරන්න
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setLang('en')}
            className="press rounded-full px-4 py-3 text-sm font-semibold"
            style={{backgroundColor: 'var(--ink)', color: 'var(--bg)'}}
          >
            English
          </button>
          <button
            onClick={() => setLang('si')}
            className="press rounded-full px-4 py-3 text-sm font-semibold"
            style={{backgroundColor: 'var(--surface)', color: 'var(--ink)'}}
          >
            සිංහල
          </button>
        </div>
      </div>
    </div>
  )
}
