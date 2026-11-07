'use client'

import {useLanguage} from './LanguageProvider'
import {LAST_PATH} from './MotifDefs'

export default function Hero() {
  const {t} = useLanguage()

  return (
    <section
      className="relative overflow-hidden"
      style={{backgroundColor: 'var(--field-1)', color: 'var(--field-1-ink)'}}
    >
      <div className="mx-auto grid max-w-6xl gap-6 px-[var(--margin)] py-8 sm:py-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-8 lg:py-20">
        <div>
          <h1
            className="lines"
            style={{fontSize: 'var(--step-display)', lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 800}}
          >
            <span className="line">
              <span data-line style={{'--i': 0} as React.CSSProperties}>
                {t.heroHeadlineLine1}
              </span>
            </span>
            <span className="line">
              <span data-line style={{'--i': 1} as React.CSSProperties}>
                {t.heroHeadlineLine2}
              </span>
            </span>
          </h1>
          <p
            data-rise
            style={{'--i': 0, color: 'var(--field-1-ink)', opacity: 0.8} as React.CSSProperties}
            className="mt-5 max-w-md text-base sm:text-lg"
          >
            {t.heroSubtext}
          </p>
          <a
            data-rise
            style={{'--i': 1, backgroundColor: 'var(--accent)', color: 'var(--accent-ink)'} as React.CSSProperties}
            href="#catalog"
            className="press mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-sm font-semibold hover:brightness-110"
          >
            {t.heroCta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[260px] lg:max-w-none" data-reveal>
          <svg viewBox="0 0 1 1" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <defs>
              <clipPath id="hero-last-clip" clipPathUnits="objectBoundingBox">
                <path d={LAST_PATH} />
              </clipPath>
            </defs>
            <rect width="1" height="1" fill="var(--accent)" clipPath="url(#hero-last-clip)" />
            <image
              href="/craft/lasts-hero.jpg"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#hero-last-clip)"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
