<script setup lang="ts">
import { FileDown, Github, Menu, X } from 'lucide-vue-next'
import type { NavItem } from '~/types/portfolio'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

/** Sticky 56px header on the rail: mark · nav · GitHub · Download CV · theme toggle. */
const props = defineProps<{
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

const menuOpen = ref(false)
const headerEl = useTemplateRef<HTMLElement>('headerEl')

function closeMenu() {
  menuOpen.value = false
}

function isActive(href: string) {
  return route.hash === href
}

watch(() => route.fullPath, closeMenu)

// Dismiss on Escape, outside click, or when growing past the md breakpoint.
onMounted(() => {
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu()
  const onPointer = (e: PointerEvent) => {
    if (menuOpen.value && headerEl.value && !headerEl.value.contains(e.target as Node)) closeMenu()
  }
  const mq = window.matchMedia('(min-width: 48rem)')
  const onMq = () => mq.matches && closeMenu()
  window.addEventListener('keydown', onKey)
  mq.addEventListener('change', onMq)
  window.addEventListener('pointerdown', onPointer)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    mq.removeEventListener('change', onMq)
    window.removeEventListener('pointerdown', onPointer)
  })
})

const iconButton = buttonVariants({ variant: 'ghost', size: 'icon-sm' })
</script>

<template>
  <header
    ref="headerEl"
    class="sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-(--page-gutter)"
  >
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
        class="hidden items-center gap-3 md:flex lg:gap-4"
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

        <button
          v-if="props.nav.length"
          type="button"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :class="[iconButton, 'ml-1 md:hidden']"
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
        aria-label="Sections"
        class="absolute inset-x-(--page-gutter) top-full mx-auto max-w-rail border-x border-b bg-background shadow-lg md:hidden"
      >
        <ul class="m-0 grid list-none grid-cols-2 p-0">
          <li
            v-for="item in nav"
            :key="item.href"
            class="border-b border-line even:border-l [&:nth-last-child(-n+2):nth-child(odd)]:border-b-0 [&:last-child]:border-b-0 last:odd:col-span-2"
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
