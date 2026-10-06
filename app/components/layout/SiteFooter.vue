<script setup lang="ts">
import type { SocialLink } from '~/types/portfolio'
import { Separator } from '@/components/ui/separator'
import { icons } from '~/lib/icons'

/** Footer laid out as the title block of a technical drawing. */
defineProps<{
  title: string
  subtitle?: string
  socials?: SocialLink[]
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="max-w-screen overflow-x-clip px-(--page-gutter)">
    <div class="mx-auto max-w-rail border-x">
      <div class="screen-line-top screen-line-bottom screen-line-top-border">
        <div
          class="stripe-divider h-12"
          aria-hidden="true"
        />
      </div>

      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 font-mono text-sm/normal screen-line-bottom">
        <span class="font-medium">{{ title }}</span>
        <span
          v-if="subtitle"
          class="font-sans text-muted-foreground"
        >{{ subtitle }}</span>
      </div>

      <div class="flex items-center gap-3 px-4 py-3 text-muted-foreground screen-line-top screen-line-bottom screen-line-bottom-border">
        <NuxtLink
          :to="localePath('/')"
          :aria-label="t('footer.home')"
          class="me-auto flex"
        >
          <img
            src="/brand/rt-symbol-black.svg"
            alt=""
            width="16"
            height="16"
            class="size-4 opacity-60 mix-blend-multiply dark:mix-blend-screen dark:invert"
          >
        </NuxtLink>
        <template
          v-for="(social, i) in socials"
          :key="social.href"
        >
          <Separator
            v-if="i > 0"
            orientation="vertical"
            class="data-[orientation=vertical]:h-4"
          />
          <a
            :href="social.href"
            :aria-label="social.title"
            class="flex transition-colors duration-150 hover:text-foreground"
            v-bind="externalLinkAttrs(social.href)"
          >
            <component
              :is="icons[social.icon]"
              class="size-4"
            />
          </a>
        </template>
      </div>
    </div>
  </footer>
</template>
