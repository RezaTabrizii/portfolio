import type { IconName } from '~/lib/icons'
import type {
  EducationId,
  ExperienceId,
  MonthYear,
  Portfolio,
  PortfolioCopy,
  Position,
  Project,
  ProjectId,
  StackId,
} from '~/types/portfolio'

// Copy sourced from the full CV (Reza_Tabrizi_CV_Full_Version.md). Translatable text lives in
// `~/data/content/<locale>.ts`; this file holds what is the same in every language.

const GITHUB_HANDLE = 'RezaTabrizii'
const LINKEDIN_HANDLE = 'tabrizi-me'

export const GITHUB_URL = `https://github.com/${GITHUB_HANDLE}`
export const SOURCE_URL = `${GITHUB_URL}/portfolio`
export const LINKEDIN_URL = `https://linkedin.com/in/${LINKEDIN_HANDLE}`
export const EMAIL = 'smr.tabrizi@gmail.com'
export const PHONE = '+98 992 348 0125'

/** Served from the `public/` root so the shared URL stays stable. */
export const CV = { href: '/Reza_Tabrizi_CV.pdf', fileName: 'Reza_Tabrizi_CV.pdf' } as const

/** Avatar renditions in `public/images/` (webp, square) plus a 640px JPEG for structured data. */
export const AVATAR = {
  src: '/images/avatar-160.webp',
  srcset: '/images/avatar-160.webp 160w, /images/avatar-320.webp 320w, /images/avatar-480.webp 480w',
  photo: '/images/profile.jpg',
} as const

/** Social share card (Open Graph / Twitter). */
export const OG_IMAGE = { src: '/images/og-image.jpg', width: 1200, height: 630, type: 'image/jpeg' } as const

/** BCP 47 codes for the `languages` line in the copy (JSON-LD `knowsLanguage`). */
export const SPOKEN_LANGUAGES = ['fa', 'tr', 'en'] as const

/** Header nav; titles come from the `nav.*` i18n messages. */
export const NAV = [
  { key: 'about', href: '#about' },
  { key: 'stack', href: '#stack' },
  { key: 'experience', href: '#experience' },
  { key: 'aiWorkflow', href: '#ai-workflow' },
  { key: 'projects', href: '#projects' },
  { key: 'contributing', href: '#contributing' },
] as const

const STACK: { id: StackId, items: string[] }[] = [
  { id: 'languages', items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'Python'] },
  { id: 'backend', items: ['ASP.NET Core (MVC, Web API)', 'Entity Framework Core', 'LINQ', 'SignalR', 'REST API design', 'JWT / ASP.NET Identity'] },
  { id: 'frontend', items: ['Vue.js 3', 'Nuxt.js', 'Pinia', 'Vuetify', 'Tailwind CSS', 'SSR & technical SEO'] },
  { id: 'data', items: ['SQL Server', 'MongoDB', 'Redis', 'Query optimization', 'Indexing'] },
  { id: 'devops', items: ['Docker', 'Docker Compose', 'Nginx (reverse proxy, SSL)', 'S3', 'Sentry', 'GitLab CI/CD'] },
  { id: 'practices', items: ['System design', 'SOLID', 'Design patterns', 'Clean architecture', 'Git', 'Agile/Scrum'] },
]

interface ExperienceBase {
  id: ExperienceId
  companyName: string
  companyWebsite?: string
  isCurrent?: boolean
  position: Pick<Position, 'icon' | 'start' | 'end' | 'skills' | 'defaultOpen'>
}

const EXPERIENCE: ExperienceBase[] = [
  {
    id: 'isbis',
    companyName: 'ISBIS',
    companyWebsite: 'https://isbisapp.com',
    isCurrent: true,
    position: { icon: 'code-xml', start: '07.2026', defaultOpen: true, skills: ['Nuxt.js', 'Vue 3', 'Vuetify', 'TypeScript'] },
  },
  {
    id: 'nira',
    companyName: 'Nira Gold Gallery',
    companyWebsite: 'https://niragoldgallery.ir',
    position: { icon: 'code-xml', start: '07.2026', end: '09.2026', skills: ['ASP.NET Core', 'Nuxt.js', 'Tailwind CSS', 'Docker Compose', 'GitLab CI/CD'] },
  },
  {
    id: 'ika',
    companyName: 'IKA',
    position: { icon: 'server', start: '02.2025', end: '05.2026', skills: ['ASP.NET Core', 'SignalR', 'SQL Server', 'MongoDB', 'S3', 'Sentry'] },
  },
  {
    id: 'nct',
    companyName: 'NCT',
    companyWebsite: 'https://nctevo.com',
    position: { icon: 'code-xml', start: '01.2024', end: '12.2024', skills: ['C#/.NET', 'Vue.js', 'SQL Server'] },
  },
  {
    id: 'sino-uk',
    companyName: 'Sino-UK',
    position: { icon: 'server', start: '11.2022', end: '12.2023', skills: ['C#/.NET', 'Redis', 'SQL Server'] },
  },
]

const AI_SKILLS = ['Claude Code', 'Agentic coding', 'Context engineering', 'Code review']

const JALALI_REPO = `${GITHUB_URL}/vue-jalali-datetime-picker`

type ProjectBase = Pick<Project, 'title' | 'link' | 'links' | 'defaultOpen' | 'skills'> & { id: ProjectId, icon: IconName }

const PROJECTS: ProjectBase[] = [
  {
    id: 'jalali-picker',
    title: 'vue-jalali-datetime-picker',
    icon: 'calendar',
    link: JALALI_REPO,
    links: [
      { title: 'GitHub', href: JALALI_REPO },
      { title: 'npm', href: 'https://www.npmjs.com/package/vue-jalali-datetime-picker' },
    ],
    defaultOpen: true,
    skills: ['Vue.js', 'JavaScript', 'npm'],
  },
  {
    id: 'python-automation',
    title: 'Python Automation Scripts',
    icon: 'bot',
    skills: ['Python', 'Telegram Bot API'],
  },
]

const EDUCATION: { id: EducationId, start: MonthYear, end?: MonthYear }[] = [
  { id: 'university', start: '09.2022', end: '09.2027' },
  { id: 'high-school', start: '09.2019', end: '06.2022' },
]

/** Merges one locale's copy onto the shared data. */
export function buildPortfolio(c: PortfolioCopy): Portfolio {
  const isbis = c.experience.isbis
  return {
    meta: c.meta,
    name: c.name,
    avatarAlt: c.avatarAlt,
    jobTitle: c.jobTitle,
    tagline: c.tagline,
    headline: c.headline,
    sentences: c.sentences,
    email: EMAIL,
    emailLabel: c.emailLabel,
    phone: PHONE,
    location: c.location,
    timeZone: 'Asia/Tehran',
    city: c.city,
    languages: c.languages,
    currentRole: { title: isbis.title, company: 'ISBIS', anchor: '#experience-isbis' },
    socials: [
      { title: 'GitHub', handle: GITHUB_HANDLE, href: GITHUB_URL, icon: 'github' },
      { title: 'LinkedIn', handle: LINKEDIN_HANDLE, href: LINKEDIN_URL, icon: 'linkedin' },
      { title: c.emailLabel, handle: EMAIL, href: `mailto:${EMAIL}`, icon: 'mail' },
    ],
    summary: c.summary,
    stack: STACK.map(({ id, items }) => ({ category: c.stack[id], items })),
    experience: EXPERIENCE.map(({ position, ...e }) => {
      const t = c.experience[e.id]
      return {
        ...e,
        location: t.location,
        locationType: t.locationType,
        positions: [{ ...position, title: t.title, employmentType: t.employmentType, description: t.description }],
      }
    }),
    aiWorkflow: { description: c.aiWorkflow, skills: AI_SKILLS },
    projects: PROJECTS.map(({ id, ...p }) => {
      const t = c.projects[id]
      return { ...p, title: t.title ?? p.title, period: { start: t.period }, description: t.description }
    }),
    contributing: c.contributing,
    education: EDUCATION.map(({ id, ...e }) => ({ ...e, ...c.education[id] })),
  }
}
