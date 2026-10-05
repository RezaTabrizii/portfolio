<script setup lang="ts">
import type { FooterField, SocialLink } from '~/types/portfolio'
import { Separator } from '@/components/ui/separator'
import { icons } from '~/lib/icons'

/** Footer laid out as the title block of a technical drawing. */
defineProps<{
  title: string
  subtitle?: string
  fields?: FooterField[]
  socials?: SocialLink[]
}>()

const span = {
  1: 'col-span-1',
  2: 'col-span-2',
  4: 'col-span-2 sm:col-span-4',
} as const

const { t } = useI18n()
const localePath = useLocalePath()

const isExternal = (href: string) => /^https?:\/\//.test(href)
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

      <!-- <dl
        v-if="fields?.length"
        class="grid grid-cols-2 gap-px bg-line font-mono sm:grid-cols-4"
      >
        <div
          v-for="field in fields"
          :key="field.label"
          :class="['flex min-w-0 flex-col gap-1 bg-background px-4 py-3', span[field.span ?? 1]]"
        >
          <dt class="text-2xs font-medium tracking-wider text-muted-foreground uppercase">
            {{ field.label }}
          </dt>
          <dd class="text-sm/normal">
            <ul
              v-if="Array.isArray(field.value)"
              class="flex flex-col gap-0.5"
            >
              <li
                v-for="line in field.value"
                :key="line"
              >
                {{ line }}
              </li>
            </ul>
            <a
              v-else-if="field.href"
              class="link-underline"
              :href="field.href"
              v-bind="isExternal(field.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
            >{{ field.value }}</a>
            <template v-else>
              {{ field.value }}
            </template>
          </dd>
        </div>
      </dl> -->

      <!-- <div class="h-4 screen-line-top" /> -->

      <div class="flex items-center gap-3 px-4 py-3 text-muted-foreground screen-line-top screen-line-bottom screen-line-bottom-border">
        <NuxtLink
          :to="localePath('/')"
          :aria-label="t('footer.home')"
          class="me-auto flex"
        >
          <img
            src="/rt-symbol-black.svg"
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
            v-bind="isExternal(social.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
          >
            <component
              :is="icons[social.icon]"
              class="size-4"
            />
          </a>
        </template>
      </div>
    </div>
    <!-- <div class="h-(--fade-bottom-height)" /> -->
  </footer>
</template>
