import type { RouterConfig } from '@nuxt/schema'
import { prefersReducedMotion } from '~/utils/dom'

function scrollMarginTop(selector: string): number {
  try {
    const el = document.querySelector(selector)
    return el ? Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0
  }
  catch {
    return 0
  }
}

// Smooth in-page anchor scrolling that honours `scroll-margin-top` (sticky header + stripe band)
// and prefers-reduced-motion.
export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth'
    if (to.hash) return { el: to.hash, top: scrollMarginTop(to.hash), behavior }
    if (to.path === from.path) return { top: 0, behavior }
    return { top: 0 }
  },
} satisfies RouterConfig
