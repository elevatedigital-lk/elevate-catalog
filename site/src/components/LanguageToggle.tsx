'use client'

import {useLanguage} from './LanguageProvider'

export default function LanguageToggle() {
  const {lang, setLang} = useLanguage()

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full py-0.5 pl-2 pr-0.5 text-[13px] font-medium"
      style={{backgroundColor: 'var(--surface)'}}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" style={{color: 'var(--muted)'}}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" strokeLinecap="round" />
      </svg>
      <button
        onClick={() => setLang('en')}
        className="press rounded-full px-3 py-1 transition"
        style={lang === 'en' ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'} : {color: 'var(--muted)'}}
      >
        EN
      </button>
      <button
        onClick={() => setLang('si')}
        className="press rounded-full px-3 py-1 transition"
        style={lang === 'si' ? {backgroundColor: 'var(--ink)', color: 'var(--bg)'} : {color: 'var(--muted)'}}
      >
        සිං
      </button>
    </div>
  )
}
