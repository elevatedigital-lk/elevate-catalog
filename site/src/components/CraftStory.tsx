'use client'

import Image from 'next/image'
import {useLanguage} from './LanguageProvider'

export default function CraftStory() {
  const {t} = useLanguage()

  return (
    <section
      className="relative"
      style={{backgroundColor: 'var(--bg)', paddingBlock: 'var(--section)'}}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-[var(--margin)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <div
          className="relative aspect-[4/5] w-full overflow-hidden shutter lg:order-2"
          data-reveal
        >
          <Image
            src="/craft/bench.jpg"
            alt="A cobbler's wall of hand tools and wooden lasts above a finished leather shoe"
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>

        <div data-reveal className="lg:order-1">
          <h2
            style={{fontSize: 'var(--step-head)', lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 800, color: 'var(--ink)'}}
          >
            {t.craftHeading}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed sm:text-lg" style={{color: 'var(--ink)'}}>
            {t.craftBody}
          </p>
          <p
            className="nums mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide"
            style={{color: 'var(--accent)'}}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: 'var(--accent)'}} />
            {t.craftFact}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-[var(--margin)] text-[13px]" style={{color: 'var(--muted)'}}>
        Pictures:{' '}
        <a
          className="underline"
          href="https://commons.wikimedia.org/w/index.php?curid=180045584"
          target="_blank"
          rel="noopener noreferrer"
        >
          “Wooden lasts — Macedonian shoemaking craft”
        </a>{' '}
        by Orce Wiki, CC BY-SA 4.0, and{' '}
        <a
          className="underline"
          href="https://commons.wikimedia.org/w/index.php?curid=30169475"
          target="_blank"
          rel="noopener noreferrer"
        >
          “Shoemakers and cobblers tools”
        </a>{' '}
        by Daderot, CC0, via Wikimedia Commons.
      </p>
    </section>
  )
}
