export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** True for form fields and contenteditable, where keyboard shortcuts and custom menus should stay out of the way. */
export function isEditableTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement
    && (target.isContentEditable || target.closest('input, textarea, select') !== null)
}

/** `target`/`rel` for absolute http(s) links, so they open in a new tab; nothing for mailto:, tel: or in-page links. */
export function externalLinkAttrs(href: string | undefined) {
  return href && /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
