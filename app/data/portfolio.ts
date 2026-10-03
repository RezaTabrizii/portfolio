import type { FooterField, NavItem, Portfolio, SocialLink } from '~/types/portfolio'

// Copy sourced verbatim from the design handoff (assets/cv/Reza_Tabrizi_CV.md → ui_kits/portfolio/data.js).

export const GITHUB_URL = 'https://github.com/RezaTabrizii'
export const LINKEDIN_URL = 'https://linkedin.com/in/tabrizi-me'
export const EMAIL = 'Smr.tabrizi@gmail.com'

/** Served from `public/`. Add the PDF there — the header button links to it. */
export const CV = { href: '/Reza_Tabrizi_CV.pdf', fileName: 'Reza_Tabrizi_CV.pdf' } as const

export const NAV: NavItem[] = [
  { title: 'About', href: '#about' },
  { title: 'Stack', href: '#stack' },
  { title: 'Experience', href: '#experience' },
  { title: 'Projects', href: '#projects' },
  { title: 'Contributing', href: '#contributing' },
]

export const FOOTER_SOCIALS: SocialLink[] = [
  { title: 'GitHub', href: GITHUB_URL, icon: 'github' },
  { title: 'LinkedIn', href: LINKEDIN_URL, icon: 'linkedin' },
  { title: 'Email', href: `mailto:${EMAIL}`, icon: 'mail' },
]

export const FOOTER_FIELDS: FooterField[] = [
  { label: 'Crafted by', value: 'RezaTabrizii', href: GITHUB_URL },
  { label: 'Based in', value: 'Tabriz, Iran' },
  { label: 'Availability', value: 'Open to remote' },
  { label: 'Typeface', value: 'Geist' },
  { label: 'Stack', span: 2, value: ['Nuxt.js', 'shadcn-vue', 'Tailwind CSS'] },
  { label: 'Languages', span: 2, value: 'Persian · Turkish · English' },
]

export const PORTFOLIO: Portfolio = {
  name: 'Reza Tabrizi',
  avatarAlt: 'RT monogram',
  sentences: [
    'Full-Stack Developer — .NET & Vue',
    'Building production systems end-to-end',
    'Open-source author on npm',
  ],
  email: EMAIL,
  phone: '+98 992 348 0125',
  location: 'Tabriz, Iran (open to remote)',
  timeZone: 'Asia/Tehran',
  city: 'Tabriz',
  languages: ['Persian', 'Turkish', 'English'],
  currentRole: { title: 'Front-end Developer', company: 'ISBIS', anchor: '#experience-isbis' },
  socials: [
    { title: 'GitHub', handle: 'RezaTabrizii', href: GITHUB_URL, icon: 'github' },
    { title: 'LinkedIn', handle: 'tabrizi-me', href: LINKEDIN_URL, icon: 'linkedin' },
    { title: 'Email', handle: EMAIL, href: `mailto:${EMAIL}`, icon: 'mail' },
  ],
  summary:
    'Full-stack developer with 3+ years building production systems end-to-end in .NET and Vue — from database schema and REST API design through to responsive, role-based UIs. Shipped enterprise platforms handling high data volumes, real-time features with SignalR, and payment flows hardened against race conditions. Work daily with agentic AI coding tools (Claude Code), scoping context tightly to get production-quality implementations and refactors at low token cost. Published an open-source Vue component on npm.',
  stack: [
    { category: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
    { category: 'Backend', items: ['ASP.NET Core', 'Web API', 'REST API design', 'SignalR', 'Entity Framework Core', 'LINQ', 'Redis', 'JWT / ASP.NET Identity'] },
    { category: 'Frontend', items: ['Vue.js 3', 'Nuxt.js', 'Composition API', 'Pinia/Vuex', 'Vuetify', 'Tailwind CSS'] },
    { category: 'Databases', items: ['SQL Server', 'MongoDB', 'Query optimization', 'Indexing'] },
    { category: 'Practices & Tools', items: ['OOP', 'SOLID', 'Clean architecture', 'Git', 'Agile/Scrum', 'CI/CD', 'Docker'] },
    { category: 'AI-Assisted', items: ['Claude Code', 'Context engineering', 'Code review'] },
  ],
  experience: [
    {
      id: 'isbis',
      companyName: 'ISBIS',
      companyWebsite: 'https://isbisapp.com',
      isCurrent: true,
      positions: [{
        title: 'Front-end Developer',
        icon: 'code-xml',
        start: '02.2026',
        defaultOpen: true,
        skills: ['Nuxt.js', 'Vue 3', 'Vuetify', 'TypeScript'],
        description: [
          'Build the frontend for a nationwide educational portal connecting students, parents, schools, and consultants, serving 400 users across 150 schools',
          'Developed 4 role-based dashboards with distinct permission models in a single Nuxt.js monorepo, sharing components, types, and API clients across apps so each user type is onboarded without duplicating UI code',
          'Built a two-device proctored exam environment: candidates sit the exam on one device while a second device streams camera and room view to a live monitoring hub, with the exam auto-pausing the instant either device drops its connection',
          'Redesigned the school search and application flow around accessible, responsive components, cutting the application process from 5 steps to 3',
        ],
      }],
    },
    {
      id: 'nira',
      companyName: 'Nira Gold Gallery',
      companyWebsite: 'https://niragoldgallery.ir',
      positions: [{
        title: 'Full-Stack Developer',
        icon: 'code-xml',
        employmentType: 'Side project',
        start: '07.2026',
        end: '09.2026',
        skills: ['ASP.NET Core', 'Nuxt.js', 'Tailwind CSS'],
        description: [
          'Designed, built, and deployed a complete e-commerce platform solo — database schema, .NET REST API, storefront, and admin panel — launching in 6 weeks',
          'Implemented the checkout and payment flow with database-level concurrency controls, eliminating double-charge and oversell race conditions under concurrent orders',
          'Built a pixel-accurate Nuxt + Tailwind storefront from Figma designs and applied technical SEO (SSR, structured data, meta optimization), reaching ~1,200 organic visitors/month',
        ],
      }],
    },
    {
      id: 'ika',
      companyName: 'IKA',
      positions: [{
        title: 'Back-end Developer',
        icon: 'server',
        start: '07.2024',
        end: '12.2025',
        skills: ['ASP.NET Core', 'SignalR', 'SQL Server', 'S3'],
        description: [
          'Architected the backend for an enterprise inspection-contract platform managing 200+ contracts across 80 concurrent users, with 75GB of project files stored and served from S3',
          'Built real-time chat and live system notifications with SignalR Hubs, delivering 1000+ messages/day to distributed inspection teams with persistent message history',
          'Cut API response times by 60% (from ~800ms to ~320ms) by profiling slow endpoints, rewriting N+1 queries, adding targeted indexes, and introducing in-memory caching for hot read paths',
        ],
      }],
    },
    {
      id: 'nct',
      companyName: 'NCT',
      companyWebsite: 'https://nctevo.com',
      positions: [{
        title: 'Full-Stack Developer',
        icon: 'code-xml',
        start: '05.2023',
        end: '06.2024',
        skills: ['C#/.NET', 'Vue.js', 'SQL Server'],
        description: [
          'Built an inspection-management and financial-tracking platform from the ground up as part of a 6-person team, taking it from empty repo to production in 3 months',
          'Developed financial modules that track income and expenses, auto-calculate profit margins, and generate monthly reports — replacing ~20 hours/month of manual spreadsheet work',
        ],
      }],
    },
    {
      id: 'sino-uk',
      companyName: 'Sino-UK',
      positions: [{
        title: 'Sole Back-end Developer',
        icon: 'server',
        start: '11.2022',
        end: '04.2023',
        skills: ['C#/.NET', 'Redis', 'SQL Server'],
        description: [
          'Built the backend for a school-management platform serving teachers and students end-to-end — class scheduling, homework assignment and submission, progress reporting, and finance',
          'Cut response times by 55% (from ~600ms to ~270ms) on the platform\'s heaviest reporting and dashboard queries by introducing Redis caching',
        ],
      }],
    },
  ],
  projects: [
    {
      title: 'vue-jalali-datetime-picker',
      icon: 'calendar',
      period: { start: 'Open source' },
      link: 'https://github.com/RezaTabrizii/vue-jalali-datetime-picker',
      defaultOpen: true,
      skills: ['Vue.js', 'JavaScript', 'npm'],
      description: [
        'Authored and published an open-source Vue component for Jalali (Persian) calendar date/time selection, filling a gap in the Vue ecosystem for Persian-locale applications',
        'Built it fully customizable — themes, colors, formats, locale, range/time modes, and slot-based overrides — so consumers can restyle and extend every part without forking',
      ],
    },
  ],
  contributing: {
    title: 'Contributing',
    paragraphs: [
      'I\'m interested in open-source projects that solve real, everyday problems: small, well-documented tools that save other developers time. vue-jalali-datetime-picker started that way, filling a gap for Persian-locale Vue applications.',
      'I\'d be happy to contribute to useful projects in the .NET and Vue ecosystems, whether that\'s building features, fixing bugs, reviewing pull requests, improving documentation, or helping maintain a library long-term. If you have an idea or an issue that needs an extra pair of hands, get in touch.',
    ],
    ctaLabel: 'Start a conversation',
    ctaSubject: 'Open source collaboration',
  },
  education: [
    {
      school: 'Payame Noor University of Tabriz',
      start: '09.2022',
      end: '09.2027',
      degree: 'B.Sc. Computer Engineering',
      description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Operating Systems',
    },
    {
      school: 'Tabriz Ferdowsi High School',
      start: '09.2019',
      end: '06.2022',
      degree: 'Diploma, Mathematics & Physics',
    },
  ],
}
