import type { PortfolioCopy } from '~/types/portfolio'

export default {
  meta: {
    title: 'Reza Tabrizi — Full-Stack Developer (.NET & Vue)',
    description: 'Full-stack developer with 3+ years building production systems end-to-end in .NET and Vue. Based in Tabriz, Iran — open to remote.',
  },
  name: 'Reza Tabrizi',
  avatarAlt: 'RT monogram',
  jobTitle: 'Full-Stack Developer',
  tagline: 'Full-Stack · .NET & Vue',
  headline: 'Full-Stack Developer — .NET & Vue',
  sentences: [
    'Full-Stack Developer — .NET & Vue',
    'Building production systems end-to-end',
    'Open-source author on npm',
  ],
  location: 'Tabriz, Iran (open to remote)',
  city: 'Tabriz',
  languages: ['Persian (Native)', 'Turkish (Native)', 'English (Professional)'],
  emailLabel: 'Email',
  summary:
    'Full-stack developer with 3+ years shipping production systems end-to-end in .NET and Vue, deployed with Docker, grounded in SOLID, clean architecture, and system design for fast adoption of new stacks. Built RBAC systems, real-time SignalR features, and race-condition-safe payment flows on the backend, and multi-role Nuxt dashboards and SEO-optimized storefronts on the frontend. Author of an open-source Vue component on npm; uses agentic AI coding tools daily with tightly scoped context for low-cost, production-quality changes, while owning the design and reviewing every diff.',
  stack: {
    languages: 'Languages',
    backend: 'Backend',
    frontend: 'Frontend',
    data: 'Data',
    devops: 'DevOps',
    practices: 'Practices',
  },
  experience: {
    'isbis': {
      location: 'Beijing, China',
      locationType: 'Remote',
      title: 'Front-end Developer',
      description: [
        'Built the frontend for an educational portal connecting students, parents, schools, and consultants',
        'Developed 4 role-based dashboards with distinct permission models in a single Nuxt.js monorepo, sharing components, Pinia stores, types, and API clients across apps so each user type is onboarded without duplicating UI code',
        'Built a two-device proctored exam environment: candidates sit the exam on one device while a second device streams camera and room view to a live monitoring hub, with the exam auto-pausing the instant either device drops its connection',
        'Delivered the live invigilation dashboard on top of that hub, letting admins and school staff watch concurrent exam sessions in real time and disqualify candidates on the spot when cheating is observed',
        'Redesigned the school search and application flow around accessible, responsive components, cutting the application process from 5 steps to 3',
      ],
    },
    'nira': {
      location: 'Tabriz, Iran',
      title: 'Full-Stack Developer',
      employmentType: 'Solo side project',
      description: [
        'Designed, built, and deployed a complete e-commerce platform solo, including the database schema, .NET REST API, storefront, and a Vue admin panel that lets non-technical staff run the store. The MVP went live in 5 weeks',
        'Set up a GitLab CI/CD pipeline that builds and deploys the stack with Docker Compose on every merge, so releases ship without manual server work',
        'Implemented the checkout and payment flow with database-level concurrency controls, eliminating double-charge and oversell race conditions under concurrent orders',
        'Built a pixel-accurate Nuxt + Tailwind storefront from Figma designs and applied technical SEO (SSR, structured data, meta optimization) to drive organic search traffic',
      ],
    },
    'ika': {
      location: 'Tehran, Iran',
      locationType: 'Remote',
      title: 'Back-end Developer',
      description: [
        'Architected the backend for an enterprise inspection-contract platform managing 200+ contracts across 80 active users, with 75GB of project files stored and served from S3',
        'Designed a role-based access control (RBAC) system with granular permissions across multiple user roles, making permissions simple to add or remove per role and automatically syncing every affected user\'s permissions whenever a role is updated',
        'Built real-time chat and live system notifications with SignalR Hubs, delivering 1,000+ messages/day to distributed inspection teams with persistent message history',
        'Cut API response times by 60% (from ~800ms to ~320ms) by profiling slow endpoints, rewriting N+1 queries, adding targeted indexes, and introducing in-memory caching for hot read paths',
        'Designed the data model and workflow engine for multi-stage inspection contracts, cutting processing time from ~2 hours to ~20 minutes per contract',
        'Integrated Sentry for production error monitoring and alerting, capturing exceptions with stack traces and request context to diagnose and fix issues quickly',
      ],
    },
    'nct': {
      location: 'Beijing, China',
      locationType: 'Remote',
      title: 'Full-Stack Developer',
      description: [
        'Built an inspection-management and financial-tracking platform from the ground up as part of a 6-person team, taking it from empty repo to production in 3 months',
        'Developed financial modules that track income and expenses, auto-calculate profit margins, and generate monthly reports, replacing ~20 hours/month of manual spreadsheet work',
        'Designed the REST API and relational schema backing the platform, supporting 460 users and 3,500+ inspection records',
        'Implemented role-based access control and secure authentication across the platform',
      ],
    },
    'sino-uk': {
      location: 'Beijing, China',
      locationType: 'Remote',
      title: 'Sole Back-end Developer',
      employmentType: 'School management platform',
      description: [
        'Built the end-to-end backend for a school-management platform serving teachers and students, covering class scheduling, homework assignment and submission, progress reporting, and finance',
        'Implemented a constraint-based class scheduling algorithm using teacher availability, eliminating scheduling conflicts and ~6 hours/week of manual timetabling',
        'Developed the homework workflow (assignment, student submission, and teacher grading) along with the progress reports generated from it',
        'Designed and automated the financial subsystem for student and teacher accounts, plus an organization-wide financial and statistics dashboard, removing ~15 hours/month of manual accounting',
        'Cut response times by 55% (from ~600ms to ~270ms) on the platform\'s heaviest reporting and dashboard queries by introducing Redis caching',
      ],
    },
  },
  aiWorkflow: [
    'Work daily with Claude Code and other agentic coding assistants for implementation, refactoring, and code review',
    'Used AI-assisted workflows to deliver ISBIS\'s 4 role-based dashboards and proctored exam system within 3 months of joining, while shipping a full e-commerce platform in parallel',
    'Apply prompt and context engineering, scoping context tightly to get production-quality output in token-efficient workflows that keep AI tooling costs low',
    'Own the architecture and review every AI-generated change before merge, so AI speed never comes at the cost of code quality',
  ],
  projects: {
    'jalali-picker': {
      period: 'Open-source npm package',
      description: [
        'Authored and published an open-source Vue component for Jalali (Persian) calendar date/time selection, filling a gap in the Vue ecosystem for Persian-locale applications',
        'Made it fully customizable through themes, colors, formats, locale, range/time modes, and slot-based overrides, so consumers can restyle and extend every part without forking',
      ],
    },
    'python-automation': {
      title: 'Python Automation Scripts',
      period: 'Automation',
      description: [
        'Wrote scheduled database backup and cross-database data migration scripts',
        'Built Telegram bots that publish data to Telegram channels on a recurring schedule',
      ],
    },
  },
  contributing: {
    title: 'Contributing',
    paragraphs: [
      'I\'m interested in open-source projects that solve real, everyday problems: small, well-documented tools that save other developers time. vue-jalali-datetime-picker started that way, filling a gap for Persian-locale Vue applications.',
      'I\'d be happy to contribute to useful projects in the .NET and Vue ecosystems, whether that\'s building features, fixing bugs, reviewing pull requests, improving documentation, or helping maintain a library long-term. If you have an idea or an issue that needs an extra pair of hands, get in touch.',
    ],
    ctaLabel: 'Start a conversation',
    ctaSubject: 'Open source collaboration',
  },
  education: {
    'university': {
      school: 'Payame Noor University of Tabriz',
      degree: 'B.Sc. Computer Engineering',
      description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Operating Systems',
    },
    'high-school': {
      school: 'Tabriz Ferdowsi High School',
      degree: 'Diploma, Mathematics & Physics',
    },
  },
  footer: {
    craftedBy: 'Crafted by',
    basedIn: 'Based in',
    availability: 'Availability',
    availabilityValue: 'Open to remote',
    typeface: 'Typeface',
    stack: 'Stack',
    languages: 'Languages',
  },
} satisfies PortfolioCopy
