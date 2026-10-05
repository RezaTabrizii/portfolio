import type { MonthYear } from '../../app/types/portfolio'
import { CONTENT } from '../../app/data/content'
import { buildPortfolio } from '../../app/data/portfolio'
import { LOCALES, localePath } from '../../i18n/locales'

// Prerendered to /llms.txt (https://llmstxt.org): the whole profile as plain Markdown, so AI
// answer engines can read and cite it without running the page's JavaScript. English only;
// the translated pages are linked at the end.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function month(value: MonthYear) {
  const [m, y] = value.split('.')
  return `${MONTHS[Number(m) - 1]} ${y}`
}

function period(start: MonthYear, end?: MonthYear) {
  return `${month(start)} – ${end ? month(end) : 'Present'}`
}

const list = (value?: string | string[]) => (value ? [value].flat().map(line => `- ${line}`) : [])

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig().public
  const P = buildPortfolio(CONTENT.en!)
  const pageUrl = (code: string) => `${siteUrl}${localePath(code)}`

  const lines = [
    `# ${P.name}`,
    '',
    `> ${P.meta.description}`,
    '',
    P.summary,
    '',
    `- Current role: ${P.currentRole.title} at ${P.currentRole.company}`,
    `- Location: ${P.location}`,
    `- Languages: ${P.languages.join(', ')}`,
    ...P.socials.map(s => `- ${s.title}: ${s.href.replace(/^mailto:/, '')}`),
    '',
    '## Skills',
    '',
    ...P.stack.map(g => `- ${g.category}: ${g.items.join(', ')}`),
    '',
    '## Experience',
    '',
    ...P.experience.flatMap(e => e.positions.flatMap(p => [
      `### ${p.title} — ${e.companyName} (${period(p.start, p.end)})`,
      '',
      [e.location, e.locationType, p.employmentType, e.companyWebsite].filter(Boolean).join(' · '),
      '',
      ...list(p.description),
      ...(p.skills?.length ? [`- Stack: ${p.skills.join(', ')}`] : []),
      '',
    ])),
    '## AI-assisted development',
    '',
    ...list(P.aiWorkflow.description),
    `- Tools and practices: ${P.aiWorkflow.skills.join(', ')}`,
    '',
    '## Projects',
    '',
    ...P.projects.flatMap(p => [
      `### ${p.title} (${p.period.start})`,
      '',
      ...list(p.description),
      ...(p.skills?.length ? [`- Stack: ${p.skills.join(', ')}`] : []),
      ...(p.links ?? []).map(l => `- ${l.title}: ${l.href}`),
      '',
    ]),
    '## Education',
    '',
    ...P.education.flatMap(e => [
      `- ${e.degree}, ${e.school} (${period(e.start, e.end)})${e.description ? `. ${e.description}` : ''}`,
    ]),
    '',
    '## Pages',
    '',
    ...LOCALES.map(l => `- [${l.name}](${pageUrl(l.code)}): ${CONTENT[l.code]!.meta.description}`),
    '',
  ]

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return lines.join('\n')
})
