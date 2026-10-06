<script setup lang="ts">
import { onClickOutside, onKeyStroke, useMediaQuery } from '@vueuse/core'
import { FileDown, Github, Menu, X } from 'lucide-vue-next'
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
const { t } = useI18n()
const localePath = useLocalePath()

const menuOpen = ref(false)
const headerEl = useTemplateRef<HTMLElement>('headerEl')
const isDesktop = useMediaQuery('(min-width: 48rem)')

function closeMenu() {
  menuOpen.value = false
}

function isActive(href: string) {
  return route.hash === href
}

// Dismiss on navigation, Escape, outside click, or when growing past the md breakpoint.
watch(() => route.fullPath, closeMenu)
watch(isDesktop, desktop => desktop && closeMenu())
onKeyStroke('Escape', closeMenu)
onClickOutside(headerEl, closeMenu)

const iconButton = buttonVariants({ variant: 'ghost', size: 'icon-sm' })
</script>

<template>
  <header
    ref="headerEl"
    class="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-(--page-gutter)"
  >
    <div class="mx-auto flex h-(--header-height) max-w-rail items-center gap-4 border-x pe-2 ps-4 screen-line-top screen-line-bottom screen-line-top-border screen-line-bottom-border">
      <NuxtLink
        :to="localePath('/')"
        :aria-label="logoAlt ?? t('footer.home')"
        class="flex mt-1"
        @click="scrollToTop"
      >
        <!-- Black glyph: multiply on light, invert + screen on dark. -->
        <img
          src="/brand/rt-symbol-black.svg"
          alt=""
          width="24"
          height="24"
          class="block size-6 mix-blend-multiply dark:mix-blend-screen dark:invert"
        >
      </NuxtLink>

      <div class="flex-1" />

      <nav
        :aria-label="t('header.sections')"
        class="hidden items-center gap-3 md:flex lg:gap-4"
      >
        <NuxtLink
          v-for="item in nav"
          :key="item.href"
          :to="item.href"
          :aria-current="isActive(item.href) ? 'location' : undefined"
          class="text-sm/normal font-medium tracking-wide text-muted-foreground transition-colors duration-150 hover:text-foreground aria-[current]:text-foreground"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>

      <div class="flex items-center">
        <template v-if="githubHref">
          <Separator
            orientation="vertical"
            class="me-2 data-[orientation=vertical]:h-5"
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
              :aria-label="t('header.downloadCv')"
              :data-cursor-label="t('header.downloadCv')"
              :class="iconButton"
            >
              <FileDown />
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {{ t('header.downloadCv') }}
          </TooltipContent>
        </Tooltip>

        <LanguageSwitcher />
        <Separator
          orientation="vertical"
          class="mx-2 data-[orientation=vertical]:h-5"
        />
        <ThemeToggle />

        <button
          v-if="nav.length"
          type="button"
          :aria-label="menuOpen ? t('header.closeMenu') : t('header.openMenu')"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :class="[iconButton, 'ms-1 md:hidden']"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" />
          <Menu v-else />
        </button>
      </div>
    </div>

    <!-- Below md the inline nav is hidden; it collapses into this dropdown. -->
    <Transition
      enter-active-class="transition duration-150 ease-out motion-reduce:transition-none"
      enter-from-class="-translate-y-1 opacity-0"
      leave-active-class="transition duration-100 ease-in motion-reduce:transition-none"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        :aria-label="t('header.sections')"
        class="absolute inset-x-(--page-gutter) top-full mx-auto max-w-rail border-x border-b bg-background shadow-lg md:hidden"
      >
        <ul class="m-0 grid list-none grid-cols-2 p-0">
          <li
            v-for="item in nav"
            :key="item.href"
            class="border-b border-line even:border-s [&:nth-last-child(-n+2):nth-child(odd)]:border-b-0 [&:last-child]:border-b-0 last:odd:col-span-2"
          >
            <NuxtLink
              :to="item.href"
              :aria-current="isActive(item.href) ? 'location' : undefined"
              class="block px-4 py-3 text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-[current]:text-foreground"
              @click="closeMenu"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
