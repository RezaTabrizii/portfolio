<script setup lang="ts">
import { FileDown, Github } from 'lucide-vue-next'
import type { NavItem } from '~/types/portfolio'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

/** Sticky 56px header on the rail: mark · nav · GitHub · Download CV · theme toggle. */
defineProps<{
  nav: NavItem[]
  logoAlt?: string
  githubHref?: string
  /** Shows the "Download CV" icon button when set. */
  cvHref?: string
  cvFileName?: string
}>()

const route = useRoute()

function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

const iconButton = buttonVariants({ variant: 'ghost', size: 'icon-sm' })
</script>

<template>
  <header class="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-(--page-gutter)">
    <div class="mx-auto flex h-(--header-height) max-w-rail items-center gap-4 border-x pr-2 pl-4 screen-line-top screen-line-bottom screen-line-top-border screen-line-bottom-border">
      <NuxtLink
        to="/"
        :aria-label="logoAlt ?? 'Home'"
        class="flex mt-1"
        @click="scrollToTop"
      >
        <!-- logo-glyph.png has an opaque white background: multiply on light, invert + screen on dark. -->
        <img
          src="/rt-symbol-black.svg"
          alt=""
          width="24"
          height="24"
          class="block size-6 mix-blend-multiply dark:mix-blend-screen dark:invert"
        >
      </NuxtLink>

      <div class="flex-1" />

      <nav
        aria-label="Sections"
        class="hidden items-center gap-4 sm:flex"
      >
        <NuxtLink
          v-for="item in nav"
          :key="item.href"
          :to="item.href"
          :aria-current="route.hash === item.href ? 'location' : undefined"
          class="text-sm/normal font-medium tracking-wide text-muted-foreground transition-colors duration-150 hover:text-foreground aria-[current]:text-foreground"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>

      <div class="flex items-center">
        <template v-if="githubHref">
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-5"
          />
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                :href="githubHref"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                :class="iconButton"
              >
                <Github />
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              GitHub
            </TooltipContent>
          </Tooltip>
        </template>

        <Tooltip v-if="cvHref">
          <TooltipTrigger as-child>
            <a
              :href="cvHref"
              :download="cvFileName || ''"
              aria-label="Download CV"
              data-cursor-label="Download CV"
              :class="iconButton"
            >
              <FileDown />
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Download CV
          </TooltipContent>
        </Tooltip>

        <Separator
          orientation="vertical"
          class="mx-2 data-[orientation=vertical]:h-5"
        />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
