// Shared by nuxt.config (i18n + prerender) and the server routes (sitemap, llms.txt).
// UI strings live in i18n/locales/<file>; portfolio copy in app/data/content/<code>.ts.
export const LOCALES = [
  { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
  { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
  { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
  { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
  { code: 'tr', language: 'tr-TR', name: 'Türkçe', file: 'tr.json' },
  { code: 'fa', language: 'fa-IR', name: 'فارسی', file: 'fa.json', dir: 'rtl' as const },
]
export const DEFAULT_LOCALE = 'en'

/** English at `/`, the rest under `/<code>` (`prefix_except_default`). */
export function localePath(code: string) {
  return code === DEFAULT_LOCALE ? '/' : `/${code}`
}
