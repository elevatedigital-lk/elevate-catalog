'use client'

import {useEffect} from 'react'

/** Mounts once: reveals [data-reveal] elements the first time they enter the
 * viewport (never replays), with a safety-net for anything still hidden a
 * few seconds after load. A MutationObserver also catches elements added
 * later by client-side re-renders (e.g. a list that re-mounts after being
 * empty) so they don't get stuck invisible from never being observed.
 * See taste-skill references/motion.md. */
export default function MotionInit() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
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

    const observeNew = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    }
    observeNew(document)

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof Element)) continue
          if (node.matches('[data-reveal]')) io.observe(node)
          observeNew(node)
        }
      }
    })
    mo.observe(document.body, {childList: true, subtree: true})

    const safety = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in')
      })
    }, 2500)

    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(safety)
    }
  }, [])

  return null
}
