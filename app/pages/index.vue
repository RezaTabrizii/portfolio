<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const { t } = useI18n()
const P = usePortfolio()

const mailto = computed(() => `mailto:${P.value.email}`)
const collaborationMailto = computed(() => `${mailto.value}?subject=${encodeURIComponent(P.value.contributing.ctaSubject)}`)

useHead(() => ({
  script: [{
    key: 'ld-person',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': P.value.name,
      'jobTitle': P.value.jobTitle,
      'email': `mailto:${P.value.email}`,
      'address': { '@type': 'PostalAddress', 'addressLocality': P.value.city, 'addressCountry': 'IR' },
      'sameAs': P.value.socials.filter(s => s.href.startsWith('http')).map(s => s.href),
      'knowsAbout': P.value.stack.flatMap(g => g.items),
    }),
  }],
}))
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
          :href="`tel:${P.phone.replace(/\s+/g, '')}`"
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
