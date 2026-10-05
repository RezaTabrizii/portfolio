import type { FooterField, NavItem, Portfolio, SocialLink } from '~/types/portfolio'

// Copy sourced from the full CV (Reza_Tabrizi_CV_Full_Version.md).

export const GITHUB_URL = 'https://github.com/RezaTabrizii'
export const LINKEDIN_URL = 'https://linkedin.com/in/tabrizi-me'
export const EMAIL = 'smr.tabrizi@gmail.com'

/** Served from `public/`. Add the PDF there — the header button links to it. */
export const CV = { href: '/Reza_Tabrizi_CV.pdf', fileName: 'Reza_Tabrizi_CV.pdf' } as const

export const NAV: NavItem[] = [
  { title: 'About', href: '#about' },
  { title: 'Stack', href: '#stack' },
  { title: 'Experience', href: '#experience' },
  { title: 'AI Workflow', href: '#ai-workflow' },
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
  languages: ['Persian (Native)', 'Turkish (Native)', 'English (Professional)'],
  currentRole: { title: 'Front-end Developer', company: 'ISBIS', anchor: '#experience-isbis' },
  socials: [
    { title: 'GitHub', handle: 'RezaTabrizii', href: GITHUB_URL, icon: 'github' },
    { title: 'LinkedIn', handle: 'tabrizi-me', href: LINKEDIN_URL, icon: 'linkedin' },
    { title: 'Email', handle: EMAIL, href: `mailto:${EMAIL}`, icon: 'mail' },
  ],
  summary:
    'Full-stack developer with 3+ years shipping production systems end-to-end in .NET and Vue, deployed with Docker, grounded in SOLID, clean architecture, and system design for fast adoption of new stacks. Built RBAC systems, real-time SignalR features, and race-condition-safe payment flows on the backend, and multi-role Nuxt dashboards and SEO-optimized storefronts on the frontend. Author of an open-source Vue component on npm; uses agentic AI coding tools daily with tightly scoped context for low-cost, production-quality changes, while owning the design and reviewing every diff.',
  stack: [
    { category: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'Python'] },
    { category: 'Backend', items: ['ASP.NET Core (MVC, Web API)', 'Entity Framework Core', 'LINQ', 'SignalR', 'REST API design', 'JWT / ASP.NET Identity'] },
    { category: 'Frontend', items: ['Vue.js 3', 'Nuxt.js', 'Pinia', 'Vuetify', 'Tailwind CSS', 'SSR & technical SEO'] },
    { category: 'Data', items: ['SQL Server', 'MongoDB', 'Redis', 'Query optimization', 'Indexing'] },
    { category: 'DevOps', items: ['Docker', 'Docker Compose', 'Nginx (reverse proxy, SSL)', 'S3', 'Sentry', 'GitLab CI/CD'] },
    { category: 'Practices', items: ['System design', 'SOLID', 'Design patterns', 'Clean architecture', 'Git', 'Agile/Scrum'] },
  ],
  experience: [
    {
      id: 'isbis',
      companyName: 'ISBIS',
      companyWebsite: 'https://isbisapp.com',
      location: 'Beijing, China',
      locationType: 'Remote',
      isCurrent: true,
      positions: [{
        title: 'Front-end Developer',
        icon: 'code-xml',
        start: '07.2026',
        defaultOpen: true,
        skills: ['Nuxt.js', 'Vue 3', 'Vuetify', 'TypeScript'],
        description: [
          'Built the frontend for an educational portal connecting students, parents, schools, and consultants',
          'Developed 4 role-based dashboards with distinct permission models in a single Nuxt.js monorepo, sharing components, Pinia stores, types, and API clients across apps so each user type is onboarded without duplicating UI code',
          'Built a two-device proctored exam environment: candidates sit the exam on one device while a second device streams camera and room view to a live monitoring hub, with the exam auto-pausing the instant either device drops its connection',
          'Delivered the live invigilation dashboard on top of that hub, letting admins and school staff watch concurrent exam sessions in real time and disqualify candidates on the spot when cheating is observed',
          'Redesigned the school search and application flow around accessible, responsive components, cutting the application process from 5 steps to 3',
        ],
      }],
    },
    {
      id: 'nira',
      companyName: 'Nira Gold Gallery',
      companyWebsite: 'https://niragoldgallery.ir',
      location: 'Tabriz, Iran',
      positions: [{
        title: 'Full-Stack Developer',
        icon: 'code-xml',
        employmentType: 'Solo side project',
        start: '07.2026',
        end: '09.2026',
        skills: ['ASP.NET Core', 'Nuxt.js', 'Tailwind CSS', 'Docker Compose', 'GitLab CI/CD'],
        description: [
          'Designed, built, and deployed a complete e-commerce platform solo, including the database schema, .NET REST API, storefront, and a Vue admin panel that lets non-technical staff run the store. The MVP went live in 5 weeks',
          'Set up a GitLab CI/CD pipeline that builds and deploys the stack with Docker Compose on every merge, so releases ship without manual server work',
          'Implemented the checkout and payment flow with database-level concurrency controls, eliminating double-charge and oversell race conditions under concurrent orders',
          'Built a pixel-accurate Nuxt + Tailwind storefront from Figma designs and applied technical SEO (SSR, structured data, meta optimization) to drive organic search traffic',
        ],
      }],
    },
    {
      id: 'ika',
      companyName: 'IKA',
      location: 'Tehran, Iran',
      locationType: 'Remote',
      positions: [{
        title: 'Back-end Developer',
        icon: 'server',
        start: '02.2025',
        end: '05.2026',
        skills: ['ASP.NET Core', 'SignalR', 'SQL Server', 'MongoDB', 'S3', 'Sentry'],
        description: [
          'Architected the backend for an enterprise inspection-contract platform managing 200+ contracts across 80 active users, with 75GB of project files stored and served from S3',
          'Designed a role-based access control (RBAC) system with granular permissions across multiple user roles, making permissions simple to add or remove per role and automatically syncing every affected user\'s permissions whenever a role is updated',
          'Built real-time chat and live system notifications with SignalR Hubs, delivering 1,000+ messages/day to distributed inspection teams with persistent message history',
          'Cut API response times by 60% (from ~800ms to ~320ms) by profiling slow endpoints, rewriting N+1 queries, adding targeted indexes, and introducing in-memory caching for hot read paths',
          'Designed the data model and workflow engine for multi-stage inspection contracts, cutting processing time from ~2 hours to ~20 minutes per contract',
          'Integrated Sentry for production error monitoring and alerting, capturing exceptions with stack traces and request context to diagnose and fix issues quickly',
        ],
      }],
    },
    {
      id: 'nct',
      companyName: 'NCT',
      companyWebsite: 'https://nctevo.com',
      location: 'Beijing, China',
      locationType: 'Remote',
      positions: [{
        title: 'Full-Stack Developer',
        icon: 'code-xml',
        start: '01.2024',
        end: '12.2024',
        skills: ['C#/.NET', 'Vue.js', 'SQL Server'],
        description: [
          'Built an inspection-management and financial-tracking platform from the ground up as part of a 6-person team, taking it from empty repo to production in 3 months',
          'Developed financial modules that track income and expenses, auto-calculate profit margins, and generate monthly reports, replacing ~20 hours/month of manual spreadsheet work',
          'Designed the REST API and relational schema backing the platform, supporting 460 users and 3,500+ inspection records',
          'Implemented role-based access control and secure authentication across the platform',
        ],
      }],
    },
    {
      id: 'sino-uk',
      companyName: 'Sino-UK',
      location: 'Beijing, China',
      locationType: 'Remote',
      positions: [{
        title: 'Sole Back-end Developer',
        icon: 'server',
        employmentType: 'School management platform',
        start: '11.2022',
        end: '12.2023',
        skills: ['C#/.NET', 'Redis', 'SQL Server'],
        description: [
          'Built the end-to-end backend for a school-management platform serving teachers and students, covering class scheduling, homework assignment and submission, progress reporting, and finance',
          'Implemented a constraint-based class scheduling algorithm using teacher availability, eliminating scheduling conflicts and ~6 hours/week of manual timetabling',
          'Developed the homework workflow (assignment, student submission, and teacher grading) along with the progress reports generated from it',
          'Designed and automated the financial subsystem for student and teacher accounts, plus an organization-wide financial and statistics dashboard, removing ~15 hours/month of manual accounting',
          'Cut response times by 55% (from ~600ms to ~270ms) on the platform\'s heaviest reporting and dashboard queries by introducing Redis caching',
        ],
      }],
    },
  ],
  aiWorkflow: {
    description: [
      'Work daily with Claude Code and other agentic coding assistants for implementation, refactoring, and code review',
      'Used AI-assisted workflows to deliver ISBIS\'s 4 role-based dashboards and proctored exam system within 3 months of joining, while shipping a full e-commerce platform in parallel',
      'Apply prompt and context engineering, scoping context tightly to get production-quality output in token-efficient workflows that keep AI tooling costs low',
      'Own the architecture and review every AI-generated change before merge, so AI speed never comes at the cost of code quality',
    ],
    skills: ['Claude Code', 'Agentic coding', 'Context engineering', 'Code review'],
  },
  projects: [
    {
      title: 'vue-jalali-datetime-picker',
      icon: 'calendar',
      period: { start: 'Open-source npm package' },
      link: 'https://github.com/RezaTabrizii/vue-jalali-datetime-picker',
      links: [
        { title: 'GitHub', href: 'https://github.com/RezaTabrizii/vue-jalali-datetime-picker' },
        { title: 'npm', href: 'https://www.npmjs.com/package/vue-jalali-datetime-picker' },
      ],
      defaultOpen: true,
      skills: ['Vue.js', 'JavaScript', 'npm'],
      description: [
        'Authored and published an open-source Vue component for Jalali (Persian) calendar date/time selection, filling a gap in the Vue ecosystem for Persian-locale applications',
        'Made it fully customizable through themes, colors, formats, locale, range/time modes, and slot-based overrides, so consumers can restyle and extend every part without forking',
      ],
    },
    {
      title: 'Python Automation Scripts',
      icon: 'bot',
      period: { start: 'Automation' },
      skills: ['Python', 'Telegram Bot API'],
      description: [
        'Wrote scheduled database backup and cross-database data migration scripts',
        'Built Telegram bots that publish data to Telegram channels on a recurring schedule',
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
