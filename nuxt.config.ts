import tailwindcss from '@tailwindcss/vite'
import { DEFAULT_LOCALE, LOCALES, localePath } from './i18n/locales'

// Absolute origin for canonical/OG/hreflang tags, e.g. https://example.com. Omitted when unset.
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? ''

export default defineNuxtConfig({

  modules: ['@nuxtjs/color-mode', '@nuxtjs/i18n', 'shadcn-nuxt', '@nuxt/eslint'],

  // `ui/` is registered by shadcn-nuxt (no prefix); the rest auto-import by file name.
  components: [
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/portfolio', pathPrefix: false },
  ],
  devtools: { enabled: true },

  // Title, description, Open Graph, lang/dir, canonical and hreflang are set per locale in
  // layouts/default.vue; JSON-LD in pages/index.vue.
  app: {
    head: {
      meta: [
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#09090b' },
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
    // `buildDate` feeds the sitemap's <lastmod> and the JSON-LD `dateModified`.
    public: { siteUrl: SITE_URL, buildDate: new Date().toISOString() },
  },
  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: {
      // The sitemap needs absolute URLs, so it is only generated when the site URL is known.
      routes: [
        ...LOCALES.map(l => localePath(l.code)),
        '/robots.txt',
        '/llms.txt',
        ...(SITE_URL ? ['/sitemap.xml'] : []),
      ],
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
