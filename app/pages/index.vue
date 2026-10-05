<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { CONTENT } from '~/data/content'
import { AVATAR, SPOKEN_LANGUAGES } from '~/data/portfolio'

const { t, localeProperties } = useI18n()
const P = usePortfolio()

const mailto = computed(() => `mailto:${P.value.email}`)
const tel = computed(() => `tel:${P.value.phone.replace(/\s+/g, '')}`)
const collaborationMailto = computed(() => `${mailto.value}?subject=${encodeURIComponent(P.value.contributing.ctaSubject)}`)

// Structured data for search and answer engines: a ProfilePage about one Person, plus the
// open-source package they author. The Person keeps one `@id` across locales so every
// translation describes the same entity.
const route = useRoute()
const { siteUrl, buildDate } = useRuntimeConfig().public
const abs = (path: string) => `${siteUrl}${path}`
const PERSON_ID = abs('/#person')
const WEBSITE_ID = abs('/#website')

const structuredData = computed(() => {
  const p = P.value
  const pageUrl = abs(route.path === '/' ? '/' : route.path)
  const otherNames = [...new Set(Object.values(CONTENT).map(c => c.name))].filter(n => n !== p.name)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        'url': abs('/'),
        'name': p.name,
        'inLanguage': localeProperties.value.language,
        'publisher': { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#webpage`,
        'url': pageUrl,
        'name': p.meta.title,
        'description': p.meta.description,
        'inLanguage': localeProperties.value.language,
        'isPartOf': { '@id': WEBSITE_ID },
        'mainEntity': { '@id': PERSON_ID },
        'dateModified': buildDate,
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        'name': p.name,
        'alternateName': otherNames,
        'url': abs('/'),
        'image': abs(AVATAR.photo),
        'jobTitle': p.jobTitle,
        'description': p.summary,
        'email': p.email,
        'telephone': p.phone.replace(/\s+/g, ''),
        'address': { '@type': 'PostalAddress', 'addressLocality': p.city, 'addressCountry': 'IR' },
        'knowsLanguage': SPOKEN_LANGUAGES,
        'knowsAbout': p.stack.flatMap(g => g.items),
        'worksFor': p.experience.filter(e => e.isCurrent).map(e => ({
          '@type': 'Organization',
          'name': e.companyName,
          ...(e.companyWebsite && { url: e.companyWebsite }),
        })),
        'alumniOf': p.education.map(e => ({ '@type': 'EducationalOrganization', 'name': e.school })),
        'sameAs': p.socials.filter(s => s.href.startsWith('http')).map(s => s.href),
      },
      ...p.projects.filter(pr => pr.link).map(pr => ({
        '@type': 'SoftwareSourceCode',
        'name': pr.title,
        'description': [pr.description ?? []].flat().join(' '),
        'codeRepository': pr.link,
        'sameAs': pr.links?.map(l => l.href).filter(href => href !== pr.link),
        'programmingLanguage': pr.skills,
        'author': { '@id': PERSON_ID },
      })),
    ],
  }
})

useHead(() => ({
  script: [{
    key: 'ld-profile',
    type: 'application/ld+json',
    // `<` is escaped so copy can never close the script tag early.
    innerHTML: JSON.stringify(structuredData.value).replace(/</g, '\\u003c'),
  }],
}))
</script>

<template>
  <div class="mx-auto max-w-rail">
    <ProfileHeader
      :name="P.name"
      :avatar-src="AVATAR.src"
      :avatar-srcset="AVATAR.srcset"
      :avatar-alt="P.avatarAlt"
      :sentences="P.sentences"
    >
      <template #figure>
        <div class="absolute inset-0 dot-grid">
          <LogoModel />
        </div>
      </template>
    </ProfileHeader>

    <StripeDivider />

    <Panel>
      <PanelContent>
        <SocialLinks :links="P.socials" />
      </PanelContent>
      <div class="absolute -top-4 inset-e-full me-4 hidden w-20 flex-col items-end min-[1000px]:flex">
        <HandwrittenNote>{{ t('notes.followMe') }}</HandwrittenNote>
        <!-- Mirrored in RTL, where the note sits in the opposite gutter. -->
        <div class="flex rtl:-scale-x-100">
          <HandwrittenArrow
            :size="28"
            style="transform: translateX(12px) scaleX(-1) rotate(-6deg)"
          />
        </div>
      </div>
    </Panel>

    <section
      :aria-label="t('section.overview')"
      class="relative border-x"
    >
      <PanelContent class="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
        <IntroItem
          icon="code-xml"
          :span="2"
        >
          {{ P.currentRole.title }} <span :aria-label="t('intro.at')">@</span><NuxtLink
            class="link ms-0.5 font-medium"
            :to="P.currentRole.anchor"
          >{{ P.currentRole.company }}</NuxtLink>
        </IntroItem>
        <IntroItem icon="map-pin">
          {{ P.location }}
        </IntroItem>
        <LocalTime
          :time-zone="P.timeZone"
          :city="P.city"
        />
        <IntroItem
          icon="mail"
          :href="mailto"
        >
          <span dir="ltr">{{ P.email }}</span>
        </IntroItem>
        <IntroItem
          icon="phone"
          :href="tel"
        >
          <span dir="ltr">{{ P.phone }}</span>
        </IntroItem>
        <IntroItem
          icon="languages"
          :span="2"
        >
          {{ P.languages.join(' · ') }}
        </IntroItem>
      </PanelContent>
    </section>

    <StripeDivider />

    <Panel id="about">
      <PanelHeader>
        <PanelTitle href="#about">
          {{ t('section.about') }}
        </PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div class="typeset-description">
          <p>{{ P.summary }}</p>
        </div>
      </PanelContent>
    </Panel>

    <StripeDivider />

    <Panel id="stack">
      <PanelHeader>
        <PanelTitle href="#stack">
          {{ t('section.stack') }}
        </PanelTitle>
      </PanelHeader>
      <TechStack :groups="P.stack" />
    </Panel>

    <StripeDivider />

    <Panel id="experience">
      <PanelHeader>
        <PanelTitle
          href="#experience"
          :sup="P.experience.length"
        >
          {{ t('section.experience') }}
        </PanelTitle>
      </PanelHeader>
      <div class="px-4">
        <ExperienceItem
          v-for="item in P.experience"
          :key="item.id"
          v-bind="item"
        />
      </div>
    </Panel>

    <StripeDivider />

    <Panel id="ai-workflow">
      <PanelHeader>
        <PanelTitle href="#ai-workflow">
          {{ t('section.aiWorkflow') }}
        </PanelTitle>
      </PanelHeader>
      <PanelContent class="flex flex-col gap-4">
        <Description :value="P.aiWorkflow.description" />
        <SkillTags :skills="P.aiWorkflow.skills" />
      </PanelContent>
    </Panel>

    <StripeDivider />

    <Panel id="projects">
      <PanelHeader>
        <PanelTitle
          href="#projects"
          :sup="P.projects.length"
        >
          {{ t('section.projects') }}
        </PanelTitle>
      </PanelHeader>
      <ProjectItem
        v-for="project in P.projects"
        :key="project.title"
        v-bind="project"
      />
    </Panel>

    <StripeDivider />

    <Panel id="contributing">
      <PanelHeader>
        <PanelTitle href="#contributing">
          {{ P.contributing.title }}
        </PanelTitle>
      </PanelHeader>
      <PanelContent class="flex flex-col gap-4">
        <div class="typeset-description">
          <p
            v-for="(paragraph, i) in P.contributing.paragraphs"
            :key="i"
          >
            {{ paragraph }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button
            as="a"
            variant="outline"
            size="sm"
            :href="collaborationMailto"
            :data-cursor-label="P.emailLabel"
          >
            <Mail />{{ P.contributing.ctaLabel }}
          </Button>
        </div>
      </PanelContent>
      <div class="absolute top-2 inset-s-full ms-2 hidden w-16 flex-col items-start min-[1000px]:flex">
        <HandwrittenNote
          :rotate="4"
          class="whitespace-pre-line"
        >
          {{ t('notes.buildTogether') }}
        </HandwrittenNote>
        <div class="flex rtl:-scale-x-100">
          <HandwrittenArrow
            :size="24"
            style="transform: translateX(-6px) rotate(6deg)"
          />
        </div>
      </div>
    </Panel>

    <StripeDivider />

    <Panel id="education">
      <PanelHeader>
        <PanelTitle href="#education">
          {{ t('section.education') }}
        </PanelTitle>
      </PanelHeader>
      <PanelContent class="flex flex-col gap-4">
        <EducationItem
          v-for="(item, i) in P.education"
          :key="item.school"
          v-bind="item"
          :last="i === P.education.length - 1"
        />
      </PanelContent>
    </Panel>
  </div>
</template>
