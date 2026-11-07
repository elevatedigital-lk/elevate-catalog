'use client'

import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {compressedUrl, type HeroSlide} from '@/sanity'

const AUTOPLAY_MS = 5000

export default function HeroSlider({slides}: {slides: HeroSlide[]}) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const count = slides.length

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current)
  }
  function start() {
    stop()
    if (count > 1) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % count)
      }, AUTOPLAY_MS)
    }
  }
  function go(i: number) {
    setIndex(((i % count) + count) % count)
    start()
  }

  useEffect(() => {
    start()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  if (count === 0) return <PlaceholderSlide />

  return (
    <section className="relative overflow-hidden" style={{backgroundColor: 'var(--field-1)'}}>
      <a
        href="#catalog"
        aria-label="Browse the catalog"
        className="relative block aspect-[3/1] w-full"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
          touchStartX.current = null
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{opacity: i === index ? 1 : 0}}
            aria-hidden={i !== index}
          >
            <Image
              src={compressedUrl(slide.image, 1600, {square: false, quality: 72})}
              alt={slide.alt || ''}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </a>

      {count > 1 && (
        <>
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="press absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-lg sm:left-4 sm:h-10 sm:w-10"
            style={{backgroundColor: 'rgba(255,255,255,0.85)', color: 'var(--ink)'}}
          >
            ‹
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="press absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-lg sm:right-4 sm:h-10 sm:w-10"
            style={{backgroundColor: 'rgba(255,255,255,0.85)', color: 'var(--ink)'}}
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? '22px' : '7px',
                  backgroundColor: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

/** Shown when no hero slides are configured (or all are disabled) in
 * Sanity — a simple branded placeholder, not a photo of any specific
 * product, so it never implies a shoe is for sale that isn't. Deliberately
 * short — there's no content to fill a full banner height with yet. */
function PlaceholderSlide() {
  return (
    <section
      className="flex h-40 w-full items-center justify-center sm:h-52 lg:h-64"
      style={{backgroundColor: 'var(--field-1)', color: 'var(--field-1-ink)'}}
    >
      <div className="text-center opacity-70">
        <p className="text-lg font-bold tracking-tight sm:text-xl" style={{fontFamily: 'var(--font-display)'}}>
          Beto
        </p>
        <p className="mt-1 text-xs" style={{opacity: 0.8}}>
          Handmade shoes, Sri Lanka
        </p>
      </div>
    </section>
  )
}
