'use client'

import {useEffect} from 'react'

/** Mounts once: reveals [data-reveal] elements the first time they enter the
 * viewport (never replays), with a safety-net for anything still hidden a
 * few seconds after load. See taste-skill references/motion.md. */
export default function MotionInit() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      {rootMargin: '0px 0px 0px 0px', threshold: 0},
    )
    targets.forEach((el) => io.observe(el))

    const safety = setTimeout(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in')
      })
    }, 2500)

    return () => {
      io.disconnect()
      clearTimeout(safety)
    }
  }, [])

  return null
}
