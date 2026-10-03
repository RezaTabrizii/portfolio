<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { PORTFOLIO as P } from '~/data/portfolio'

const mailto = `mailto:${P.email}`
const collaborationMailto = `${mailto}?subject=${encodeURIComponent(P.openSource.ctaSubject)}`

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': P.name,
      'jobTitle': 'Full-Stack Developer',
      'email': `mailto:${P.email}`,
      'address': { '@type': 'PostalAddress', 'addressLocality': 'Tabriz', 'addressCountry': 'IR' },
      'sameAs': P.socials.filter(s => s.href.startsWith('http')).map(s => s.href),
      'knowsAbout': P.stack.flatMap(g => g.items),
    }),
  }],
})
</script>

<template>
  <div class="mx-auto max-w-rail">
    <ProfileHeader
      :name="P.name"
      avatar-src="/profile1.jpg"
      :avatar-alt="P.avatarAlt"
      :sentences="P.sentences"
    >
      <template #figure>
        <div class="absolute inset-0 flex items-center justify-center dot-grid">
          <!-- <img
            src="/logo-glyph.png"
            alt=""
            width="56"
            height="56"
            class="w-14 opacity-85 mix-blend-multiply dark:mix-blend-screen dark:invert"
          > -->
        </div>
      </template>
    </ProfileHeader>

    <StripeDivider />

    <Panel>
      <PanelContent>
        <SocialLinks :links="P.socials" />
      </PanelContent>
      <div class="absolute -top-4 right-full mr-4 hidden w-20 flex-col items-end min-[1000px]:flex">
        <HandwrittenNote>follow me</HandwrittenNote>
        <HandwrittenArrow
          :size="28"
          style="transform: translateX(12px) scaleX(-1) rotate(-6deg)"
        />
      </div>
    </Panel>

    <section
      aria-label="Overview"
      class="relative border-x"
    >
      <PanelContent class="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
        <IntroItem
          icon="code-xml"
          :span="2"
        >
          {{ P.currentRole.title }} <span aria-label="at">@</span><NuxtLink
            class="link ml-0.5 font-medium"
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
          {{ P.email }}
        </IntroItem>
        <IntroItem
          icon="phone"
          :href="`tel:${P.phone.replace(/\s+/g, '')}`"
        >
          {{ P.phone }}
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
          About
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
          Stack
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
          Experience
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

    <Panel id="projects">
      <PanelHeader>
        <PanelTitle
          href="#projects"
          :sup="P.projects.length"
        >
          Projects
        </PanelTitle>
      </PanelHeader>
      <ProjectItem
        v-for="project in P.projects"
        :key="project.title"
        v-bind="project"
      />
    </Panel>

    <StripeDivider />

    <Panel id="open-source">
      <PanelHeader>
        <PanelTitle href="#open-source">
          {{ P.openSource.title }}
        </PanelTitle>
      </PanelHeader>
      <PanelContent class="flex flex-col gap-4">
        <div class="typeset-description">
          <p
            v-for="(paragraph, i) in P.openSource.paragraphs"
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
            data-cursor-label="Email"
          >
            <Mail />{{ P.openSource.ctaLabel }}
          </Button>
        </div>
      </PanelContent>
      <div class="absolute top-2 left-full ml-2 hidden w-16 flex-col items-start min-[1000px]:flex">
        <HandwrittenNote :rotate="4">
          let's build<br>together
        </HandwrittenNote>
        <HandwrittenArrow
          :size="24"
          style="transform: translateX(-6px) rotate(6deg)"
        />
      </div>
    </Panel>

    <StripeDivider />

    <Panel id="education">
      <PanelHeader>
        <PanelTitle href="#education">
          Education
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
