'use client'

import {createContext, useContext, useEffect, useState} from 'react'
import {dict, type Lang, type Dict} from '@/i18n'

type Ctx = {
  lang: Lang | null
  setLang: (l: Lang) => void
  t: Dict
}

const LanguageContext = createContext<Ctx | null>(null)

const STORAGE_KEY = 'beto-lang'

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const [lang, setLangState] = useState<Lang | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
    if (stored === 'en' || stored === 'si') {
      setLangState(stored)
    }
    setHydrated(true)
  }, [])

  function setLang(l: Lang) {
    window.localStorage.setItem(STORAGE_KEY, l)
    setLangState(l)
  }

  const t: Dict = dict[lang ?? 'en']

  return (
    <LanguageContext.Provider value={{lang: hydrated ? lang : 'en', setLang, t}}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
