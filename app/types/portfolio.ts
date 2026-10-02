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
  name: string
  avatarAlt: string
  sentences: string[]
  email: string
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
  projects: Project[]
  openSource: { title: string, paragraphs: string[], ctaLabel: string, ctaSubject: string }
  education: Education[]
}
