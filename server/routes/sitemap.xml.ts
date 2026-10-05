import { DEFAULT_LOCALE, LOCALES, localePath } from '../../i18n/locales'

// Prerendered to /sitemap.xml (only when NUXT_PUBLIC_SITE_URL is set — see nuxt.config).
// One <url> per locale, each listing every translation as an hreflang alternate. URLs match the
// canonical tags from useLocaleHead (no trailing slash, origin alone for the default locale).
export default defineEventHandler((event) => {
  const { siteUrl, buildDate } = useRuntimeConfig().public
  const url = (code: string) => `${siteUrl}${localePath(code) === '/' ? '' : localePath(code)}`

  const alternates = [
    ...LOCALES.flatMap(l => [
      `<xhtml:link rel="alternate" hreflang="${l.code}" href="${url(l.code)}"/>`,
      `<xhtml:link rel="alternate" hreflang="${l.language}" href="${url(l.code)}"/>`,
    ]),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${url(DEFAULT_LOCALE)}"/>`,
  ].map(line => `    ${line}`).join('\n')

  const urls = LOCALES.map(l => [
    '  <url>',
    `    <loc>${url(l.code)}</loc>`,
    `    <lastmod>${buildDate}</lastmod>`,
    alternates,
    '  </url>',
  ].join('\n'))

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
})
