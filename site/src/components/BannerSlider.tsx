'use client'

import {useEffect, useState} from 'react'
import {useLanguage} from './LanguageProvider'
import {compressedUrl, BannerSlide} from '@/sanity'

interface BannerSliderProps {
  slides?: BannerSlide[]
}

export default function BannerSlider({slides}: BannerSliderProps) {
  const {lang} = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!slides || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides])

  if (!slides || slides.length === 0) {
    return null
  }

  const slide = slides[currentIndex]
  const heading = lang === 'si' ? slide.headingSi || slide.headingEn : slide.headingEn
  const subheading =
    lang === 'si' ? slide.subheadingSi || slide.subheadingEn : slide.subheadingEn

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg">
      {/* Banner Image */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full">
        {slide.image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentIndex}
              src={compressedUrl(slide.image, 1200)}
              alt={heading || 'Banner'}
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
          </>
        )}

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          {heading && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-sm sm:text-base md:text-lg opacity-90">{subheading}</p>
          )}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 w-2 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 text-xs bg-black/50 text-white px-3 py-1 rounded-full">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  )
}
