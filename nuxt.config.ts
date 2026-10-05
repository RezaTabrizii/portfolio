import tailwindcss from '@tailwindcss/vite'

// Absolute origin for canonical/OG/hreflang tags, e.g. https://example.com. Omitted when unset.
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? ''

// UI strings live in i18n/locales/<file>; portfolio copy in app/data/content/<code>.ts.
const LOCALES = [
  { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
  { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
  { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
  { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
  { code: 'tr', language: 'tr-TR', name: 'Türkçe', file: 'tr.json' },
  { code: 'fa', language: 'fa-IR', name: 'فارسی', file: 'fa.json', dir: 'rtl' as const },
]
const DEFAULT_LOCALE = 'en'

export default defineNuxtConfig({

  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n', 'shadcn-nuxt', '@nuxt/eslint'],

  // `ui/` is registered by shadcn-nuxt (no prefix); the rest auto-import by file name.
  components: [
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/portfolio', pathPrefix: false },
  ],
  devtools: { enabled: true },

  // Title, description, lang/dir, canonical and hreflang are set per locale in layouts/default.vue.
  app: {
    head: {
      meta: [
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#09090b' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        ...(SITE_URL ? [{ property: 'og:image', content: `${SITE_URL}/logo-tile.png` }] : []),
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/logo-tile.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  // Adds `.dark` on <html> (shadcn convention) and injects a no-flash script for SSG.
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'rt-theme',
  },

  runtimeConfig: {
    public: { siteUrl: SITE_URL },
  },
  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: {
      routes: LOCALES.map(l => (l.code === DEFAULT_LOCALE ? '/' : `/${l.code}`)),
      crawlLinks: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: { stylistic: true },
  },

  // English at `/`, the rest under `/<code>`. First visit to `/` redirects to the browser's
  // language once; the choice (including switching back) is then remembered in a cookie.
  i18n: {
    baseUrl: SITE_URL || undefined,
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'rt-locale',
      redirectOn: 'root',
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
})
