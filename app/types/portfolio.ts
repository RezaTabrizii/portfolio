import type { IconName } from '~/lib/icons'

/** `MM.YYYY`, e.g. `02.2026`. */
export type MonthYear = `${number}.${number}`

export interface SocialLink {
  title: string
  handle?: string
  href: string
  icon: IconName
}

export interface StackGroup {
  category: string
  items: string[]
}

export interface Position {
  title: string
  icon?: IconName
  employmentType?: string
  start: MonthYear
  /** Omit for an ongoing role (renders the infinity glyph). */
  end?: MonthYear
  description?: string | string[]
  skills?: string[]
  defaultOpen?: boolean
}

export interface Experience {
  id: string
  companyName: string
  companyWebsite?: string
  companyLogo?: string
  location?: string
  locationType?: string
  isCurrent?: boolean
  positions: Position[]
}

export interface Project {
  title: string
  icon?: IconName
  /**
   * Free text (e.g. "Open source") or `MM.YYYY` dates.
   * `end` omitted → single label; `'present'` → infinity glyph.
   */
  period: { start: string, end?: string | 'present' }
  link?: string
  /** Extra labelled links (e.g. GitHub, npm) shown in the expanded body. */
  links?: { title: string, href: string }[]
  description?: string | string[]
  skills?: string[]
  defaultOpen?: boolean
}

export interface Education {
  school: string
  start: MonthYear
  end?: MonthYear
  degree: string
  description?: string | string[]
  skills?: string[]
}

export interface FooterField {
  label: string
  /** Grid columns spanned on ≥sm (4-column grid). */
  span?: 1 | 2 | 4
  /** A list renders as stacked lines. */
  value: string | string[]
  href?: string
}

export interface NavItem {
  title: string
  href: `#${string}`
}

export interface Portfolio {
  meta: { title: string, description: string }
  name: string
  avatarAlt: string
  jobTitle: string
  /** Short line in the loader's corner, e.g. "Full-Stack · .NET & Vue". */
  tagline: string
  /** Footer subtitle. */
  headline: string
  sentences: string[]
  email: string
  emailLabel: string
  phone: string
  location: string
  timeZone: string
  city: string
  languages: string[]
  currentRole: { title: string, company: string, anchor: `#${string}` }
  socials: SocialLink[]
  summary: string
  stack: StackGroup[]
  experience: Experience[]
  aiWorkflow: { description: string[], skills: string[] }
  projects: Project[]
  contributing: { title: string, paragraphs: string[], ctaLabel: string, ctaSubject: string }
  education: Education[]
  footerFields: FooterField[]
}

export type StackId = 'languages' | 'backend' | 'frontend' | 'data' | 'devops' | 'practices'
export type ExperienceId = 'isbis' | 'nira' | 'ika' | 'nct' | 'sino-uk'
export type ProjectId = 'jalali-picker' | 'python-automation'
export type EducationId = 'university' | 'high-school'

/**
 * Everything in the portfolio that changes with the locale. Links, dates, icons and
 * skill names are locale-independent and live in `~/data/portfolio`.
 */
export interface PortfolioCopy {
  meta: { title: string, description: string }
  name: string
  avatarAlt: string
  jobTitle: string
  tagline: string
  headline: string
  sentences: string[]
  location: string
  city: string
  languages: string[]
  emailLabel: string
  summary: string
  stack: Record<StackId, string>
  experience: Record<ExperienceId, {
    location: string
    locationType?: string
    title: string
    employmentType?: string
    description: string[]
  }>
  aiWorkflow: string[]
  projects: Record<ProjectId, { title?: string, period: string, description: string[] }>
  contributing: { title: string, paragraphs: string[], ctaLabel: string, ctaSubject: string }
  education: Record<EducationId, { school: string, degree: string, description?: string }>
  footer: {
    craftedBy: string
    basedIn: string
    availability: string
    availabilityValue: string
    typeface: string
    stack: string
    languages: string
  }
}
