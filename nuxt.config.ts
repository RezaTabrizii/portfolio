import tailwindcss from '@tailwindcss/vite'

// Absolute origin for canonical/OG tags, e.g. https://example.com. Omitted when unset.
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? ''
const TITLE = 'Reza Tabrizi — Full-Stack Developer (.NET & Vue)'
const DESCRIPTION
  = 'Full-stack developer with 3+ years building production systems end-to-end in .NET and Vue. Based in Tabriz, Iran — open to remote.'

export default defineNuxtConfig({

  modules: ['@nuxtjs/color-mode', 'shadcn-nuxt', '@nuxt/eslint'],

  // `ui/` is registered by shadcn-nuxt (no prefix); the rest auto-import by file name.
  components: [
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/portfolio', pathPrefix: false },
  ],
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: TITLE,
      meta: [
        { name: 'description', content: DESCRIPTION },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#09090b' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESCRIPTION },
        { name: 'twitter:card', content: 'summary' },
        ...(SITE_URL
          ? [
              { property: 'og:url', content: SITE_URL },
              { property: 'og:image', content: `${SITE_URL}/logo-tile.png` },
            ]
          : []),
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/logo-tile.png' },
        ...(SITE_URL ? [{ rel: 'canonical' as const, href: SITE_URL }] : []),
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
  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: { routes: ['/'], crawlLinks: false },
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

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
})
