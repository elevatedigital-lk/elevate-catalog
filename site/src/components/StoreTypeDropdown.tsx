'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {useLanguage} from './LanguageProvider'
import {StoreType, localized} from '@/sanity'

interface StoreTypeDropdownProps {
  storeTypes: StoreType[]
}

export default function StoreTypeDropdown({storeTypes}: StoreTypeDropdownProps) {
  const {lang} = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSlug = searchParams.get('store') || storeTypes.find((s) => s.isDefault)?.slug.current

  const handleChange = (slug: string) => {
    router.push(`/demo?store=${slug}`)
  }

  const currentStore = storeTypes.find((s) => s.slug.current === currentSlug)

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="store-select" className="text-sm font-medium text-gray-700">
        {lang === 'si' ? 'ගබඩාව:' : 'Store:'}
      </label>
      <select
        id="store-select"
        value={currentSlug || ''}
        onChange={(e) => handleChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent hover:border-gray-400"
      >
        {storeTypes.map((store) => (
          <option key={store._id} value={store.slug.current}>
            {localized(store, (lang as 'en' | 'si') || 'en')}
          </option>
        ))}
      </select>
    </div>
  )
}
