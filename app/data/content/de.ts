import type { PortfolioCopy } from '~/types/portfolio'

export default {
  meta: {
    title: 'Reza Tabrizi — Full-Stack-Entwickler (.NET & Vue)',
    description: 'Full-Stack-Entwickler mit über 3 Jahren Erfahrung in der End-to-End-Entwicklung von Produktivsystemen mit .NET und Vue. Ansässig in Täbris, Iran — offen für Remote-Arbeit.',
  },
  name: 'Reza Tabrizi',
  avatarAlt: 'RT-Monogramm',
  jobTitle: 'Full-Stack-Entwickler',
  tagline: 'Full-Stack · .NET & Vue',
  headline: 'Full-Stack-Entwickler — .NET & Vue',
  sentences: [
    'Full-Stack-Entwickler — .NET & Vue',
    'Produktivsysteme von Ende zu Ende',
    'Open-Source-Autor auf npm',
  ],
  location: 'Täbris, Iran (offen für Remote)',
  city: 'Täbris',
  languages: ['Persisch (Muttersprache)', 'Türkisch (Muttersprache)', 'Englisch (verhandlungssicher)'],
  emailLabel: 'E-Mail',
  summary:
    'Full-Stack-Entwickler mit über 3 Jahren Erfahrung darin, Produktivsysteme mit .NET und Vue von Ende zu Ende auszuliefern, deployt mit Docker und fundiert in SOLID, Clean Architecture und Systemdesign, was den schnellen Einstieg in neue Stacks ermöglicht. Im Backend RBAC-Systeme, Echtzeitfunktionen mit SignalR und gegen Race Conditions abgesicherte Zahlungsabläufe gebaut, im Frontend Nuxt-Dashboards für mehrere Rollen und SEO-optimierte Onlineshops. Autor einer Open-Source-Vue-Komponente auf npm; nutzt täglich agentische KI-Coding-Tools mit eng begrenztem Kontext für kostengünstige Änderungen in Produktionsqualität, behält dabei die Verantwortung für das Design und prüft jeden Diff.',
  stack: {
    languages: 'Sprachen',
    backend: 'Backend',
    frontend: 'Frontend',
    data: 'Daten',
    devops: 'DevOps',
    practices: 'Methoden',
  },
  experience: {
    'isbis': {
      location: 'Peking, China',
      locationType: 'Remote',
      title: 'Frontend-Entwickler',
      description: [
        'Frontend für ein Bildungsportal entwickelt, das Schüler, Eltern, Schulen und Berater miteinander verbindet',
        '4 rollenbasierte Dashboards mit jeweils eigenem Berechtigungsmodell in einem einzigen Nuxt.js-Monorepo entwickelt; Komponenten, Pinia-Stores, Typen und API-Clients werden zwischen den Apps geteilt, sodass jede Nutzergruppe ohne doppelten UI-Code angebunden wird',
        'Eine beaufsichtigte Prüfungsumgebung mit zwei Geräten gebaut: Kandidaten legen die Prüfung auf einem Gerät ab, während ein zweites Gerät Kamera- und Raumbild an einen Live-Monitoring-Hub streamt; die Prüfung pausiert automatisch, sobald eines der Geräte die Verbindung verliert',
        'Darauf aufbauend das Live-Aufsichts-Dashboard umgesetzt, mit dem Admins und Schulpersonal parallele Prüfungssitzungen in Echtzeit verfolgen und Kandidaten bei beobachtetem Betrug sofort disqualifizieren können',
        'Die Schulsuche und den Bewerbungsablauf mit barrierefreien, responsiven Komponenten neu gestaltet und den Bewerbungsprozess von 5 auf 3 Schritte verkürzt',
      ],
    },
    'nira': {
      location: 'Täbris, Iran',
      title: 'Full-Stack-Entwickler',
      employmentType: 'Eigenes Nebenprojekt',
      description: [
        'Eine komplette E-Commerce-Plattform allein konzipiert, entwickelt und deployt, inklusive Datenbankschema, .NET-REST-API, Onlineshop und einem Vue-Adminpanel, mit dem auch nicht-technisches Personal den Shop betreiben kann. Das MVP ging nach 5 Wochen live',
        'Eine GitLab-CI/CD-Pipeline eingerichtet, die den Stack bei jedem Merge mit Docker Compose baut und deployt, sodass Releases ohne manuelle Serverarbeit ausgeliefert werden',
        'Den Checkout- und Zahlungsablauf mit Nebenläufigkeitskontrollen auf Datenbankebene umgesetzt und so doppelte Abbuchungen und Überverkäufe durch Race Conditions bei gleichzeitigen Bestellungen ausgeschlossen',
        'Einen pixelgenauen Nuxt- und Tailwind-Shop nach Figma-Designs gebaut und technisches SEO (SSR, strukturierte Daten, Meta-Optimierung) umgesetzt, um organischen Suchtraffic zu gewinnen',
      ],
    },
    'ika': {
      location: 'Teheran, Iran',
      locationType: 'Remote',
      title: 'Backend-Entwickler',
      description: [
        'Das Backend einer Enterprise-Plattform für Inspektionsverträge entworfen, die über 200 Verträge für 80 aktive Nutzer verwaltet und 75 GB Projektdateien über S3 speichert und ausliefert',
        'Ein System für rollenbasierte Zugriffskontrolle (RBAC) mit feingranularen Berechtigungen über mehrere Rollen entworfen; Berechtigungen lassen sich pro Rolle einfach hinzufügen oder entfernen und werden bei jeder Rollenänderung automatisch für alle betroffenen Nutzer synchronisiert',
        'Echtzeit-Chat und Live-Systembenachrichtigungen mit SignalR-Hubs umgesetzt, die täglich über 1.000 Nachrichten mit persistentem Verlauf an verteilte Inspektionsteams zustellen',
        'API-Antwortzeiten um 60 % gesenkt (von ~800 ms auf ~320 ms) durch Profiling langsamer Endpunkte, Umschreiben von N+1-Abfragen, gezielte Indizes und In-Memory-Caching für stark frequentierte Lesepfade',
        'Datenmodell und Workflow-Engine für mehrstufige Inspektionsverträge entworfen und die Bearbeitungszeit von ~2 Stunden auf ~20 Minuten pro Vertrag reduziert',
        'Sentry für Fehlerüberwachung und Alarmierung in Produktion integriert; Exceptions werden mit Stacktraces und Request-Kontext erfasst, um Probleme schnell zu diagnostizieren und zu beheben',
      ],
    },
    'nct': {
      location: 'Peking, China',
      locationType: 'Remote',
      title: 'Full-Stack-Entwickler',
      description: [
        'Als Teil eines 6-köpfigen Teams eine Plattform für Inspektionsmanagement und Finanzverfolgung von Grund auf entwickelt und in 3 Monaten vom leeren Repository in die Produktion gebracht',
        'Finanzmodule entwickelt, die Einnahmen und Ausgaben erfassen, Gewinnmargen automatisch berechnen und Monatsberichte erstellen, was ~20 Stunden manuelle Tabellenarbeit pro Monat ersetzt',
        'REST-API und relationales Schema der Plattform entworfen, ausgelegt für 460 Nutzer und über 3.500 Inspektionsdatensätze',
        'Rollenbasierte Zugriffskontrolle und sichere Authentifizierung plattformweit umgesetzt',
      ],
    },
    'sino-uk': {
      location: 'Peking, China',
      locationType: 'Remote',
      title: 'Alleiniger Backend-Entwickler',
      employmentType: 'Schulverwaltungsplattform',
      description: [
        'Das komplette Backend einer Schulverwaltungsplattform für Lehrkräfte und Schüler entwickelt, inklusive Stundenplanung, Vergabe und Abgabe von Hausaufgaben, Fortschrittsberichten und Finanzen',
        'Einen constraint-basierten Algorithmus zur Stundenplanung auf Basis der Verfügbarkeit der Lehrkräfte umgesetzt, der Terminkonflikte und ~6 Stunden manuelle Planung pro Woche eliminiert',
        'Den Hausaufgaben-Workflow (Vergabe, Abgabe durch Schüler und Bewertung durch Lehrkräfte) samt der daraus erzeugten Fortschrittsberichte entwickelt',
        'Das Finanzsubsystem für Schüler- und Lehrerkonten sowie ein organisationsweites Finanz- und Statistik-Dashboard entworfen und automatisiert, was ~15 Stunden manuelle Buchhaltung pro Monat einspart',
        'Antwortzeiten der aufwendigsten Berichts- und Dashboard-Abfragen der Plattform durch Redis-Caching um 55 % gesenkt (von ~600 ms auf ~270 ms)',
      ],
    },
  },
  aiWorkflow: [
    'Arbeite täglich mit Claude Code und anderen agentischen Coding-Assistenten für Implementierung, Refactoring und Code-Reviews',
    'Mit KI-gestützten Workflows die 4 rollenbasierten Dashboards und das beaufsichtigte Prüfungssystem von ISBIS innerhalb von 3 Monaten nach Einstieg geliefert, parallel zu einer kompletten E-Commerce-Plattform',
    'Setze Prompt- und Context-Engineering ein und begrenze den Kontext gezielt, um in token-effizienten Workflows Ergebnisse in Produktionsqualität bei niedrigen KI-Kosten zu erzielen',
    'Verantworte die Architektur und prüfe jede KI-generierte Änderung vor dem Merge, damit KI-Tempo nie auf Kosten der Codequalität geht',
  ],
  projects: {
    'jalali-picker': {
      period: 'Open-Source-npm-Paket',
      description: [
        'Eine Open-Source-Vue-Komponente zur Datums- und Zeitauswahl im Jalali-Kalender (persischer Kalender) entwickelt und veröffentlicht, die eine Lücke im Vue-Ökosystem für persischsprachige Anwendungen schließt',
        'Über Themes, Farben, Formate, Locale, Bereichs- und Zeitmodi sowie Slot-basierte Overrides vollständig anpassbar gemacht, sodass Nutzer jeden Teil ohne Fork umgestalten und erweitern können',
      ],
    },
    'python-automation': {
      title: 'Python-Automatisierungsskripte',
      period: 'Automatisierung',
      description: [
        'Skripte für geplante Datenbank-Backups und datenbankübergreifende Datenmigration geschrieben',
        'Telegram-Bots gebaut, die Daten in regelmäßigen Abständen in Telegram-Kanälen veröffentlichen',
      ],
    },
  },
  contributing: {
    title: 'Mitwirken',
    paragraphs: [
      'Mich interessieren Open-Source-Projekte, die echte, alltägliche Probleme lösen: kleine, gut dokumentierte Tools, die anderen Entwicklern Zeit sparen. vue-jalali-datetime-picker ist genau so entstanden und schließt eine Lücke für persischsprachige Vue-Anwendungen.',
      'Ich trage gern zu nützlichen Projekten im .NET- und Vue-Ökosystem bei, sei es durch neue Features, Bugfixes, Reviews von Pull Requests, bessere Dokumentation oder die langfristige Pflege einer Bibliothek. Wenn Sie eine Idee oder ein Issue haben, für das ein zusätzliches Paar Hände hilfreich wäre, melden Sie sich gern.',
    ],
    ctaLabel: 'Gespräch beginnen',
    ctaSubject: 'Open-Source-Zusammenarbeit',
  },
  education: {
    'university': {
      school: 'Payame-Noor-Universität Täbris',
      degree: 'B.Sc. Technische Informatik',
      description: 'Relevante Kurse: Datenstrukturen, Algorithmen, Datenbanksysteme, Softwaretechnik, Betriebssysteme',
    },
    'high-school': {
      school: 'Ferdowsi-Gymnasium Täbris',
      degree: 'Abitur, Schwerpunkt Mathematik & Physik',
    },
  },
} satisfies PortfolioCopy
