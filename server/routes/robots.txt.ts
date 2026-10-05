// Prerendered to /robots.txt. Everything is crawlable, including AI/answer-engine crawlers
// (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …), which `*` already covers.
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig().public
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    '',
    ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : []),
    '',
  ].join('\n')
})
