<!--
  Site-wide right-click menu. Wraps a single root element (the layout) as the trigger.
  Context items appear when right-clicking selected text or a link; the rest are site actions.
  Shift + right-click, inputs and touch devices keep the browser's native menu.
-->
<script setup lang="ts">
import { useClipboard, useEventListener, useMediaQuery } from '@vueuse/core'
import { ArrowUp, Check, ChevronRight, Copy, ExternalLink, FileDown, Github, Languages, Link, SunMoon } from 'lucide-vue-next'
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from 'reka-ui'
import { Kbd } from '@/components/ui/kbd'
import { menuContentClass, menuItemClass, menuSeparatorClass } from '~/lib/menu'

const props = defineProps<{
  cvHref?: string
  cvFileName?: string
  sourceHref?: string
}>()

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const toggleTheme = useThemeToggle()
const { copy } = useClipboard({ legacy: true })
const coarse = useMediaQuery('(pointer: coarse)')

// What was under the pointer when the menu opened.
const selection = ref('')
const linkHref = ref('')

// Capture phase runs before reka-ui's trigger handler; stopping it there leaves the native menu.
useEventListener('contextmenu', (e: MouseEvent) => {
  if (e.shiftKey || isEditableTarget(e.target)) {
    e.stopPropagation()
    return
  }
  selection.value = window.getSelection()?.toString().trim() ?? ''
  const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href]') : null
  linkHref.value = link?.href ?? ''
}, { capture: true })

const pageUrl = () => `${window.location.origin}${window.location.pathname}`
</script>

<template>
  <ContextMenuRoot :modal="false">
    <ContextMenuTrigger
      as-child
      :disabled="coarse"
    >
      <slot />
    </ContextMenuTrigger>

    <ContextMenuPortal>
      <ContextMenuContent :class="[menuContentClass, 'min-w-56']">
        <template v-if="selection || linkHref">
          <ContextMenuItem
            v-if="selection"
            :class="menuItemClass"
            @select="copy(selection)"
          >
            <Copy /> {{ t('contextMenu.copy') }}
          </ContextMenuItem>
          <template v-if="linkHref">
            <ContextMenuItem
              as-child
              :class="menuItemClass"
            >
              <a
                :href="linkHref"
                target="_blank"
                rel="noopener noreferrer"
              ><ExternalLink /> {{ t('contextMenu.openInNewTab') }}</a>
            </ContextMenuItem>
            <ContextMenuItem
              :class="menuItemClass"
              @select="copy(linkHref)"
            >
              <Link /> {{ t('contextMenu.copyLinkAddress') }}
            </ContextMenuItem>
          </template>
          <ContextMenuSeparator :class="menuSeparatorClass" />
        </template>

        <ContextMenuItem
          :class="menuItemClass"
          @select="copy(pageUrl())"
        >
          <Link /> {{ t('contextMenu.copyPageLink') }}
        </ContextMenuItem>
        <ContextMenuItem
          :class="menuItemClass"
          @select="scrollToTop"
        >
          <ArrowUp /> {{ t('contextMenu.backToTop') }}
        </ContextMenuItem>

        <ContextMenuSeparator :class="menuSeparatorClass" />

        <ContextMenuItem
          :class="menuItemClass"
          @select="toggleTheme"
        >
          <SunMoon /> <span class="flex-1">{{ t('theme.toggle') }}</span> <Kbd>D</Kbd>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger :class="menuItemClass">
            <Languages />
            <span class="flex-1">{{ t('contextMenu.language') }}</span>
            <span class="font-mono text-xs text-muted-foreground uppercase">{{ locale }}</span>
            <ChevronRight class="rtl:rotate-180" />
          </ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent
              :side-offset="4"
              :class="[menuContentClass, 'min-w-40']"
            >
              <ContextMenuItem
                v-for="l in locales"
                :key="l.code"
                as-child
                :class="menuItemClass"
              >
                <NuxtLink
                  :to="switchLocalePath(l.code)"
                  :lang="l.language"
                  :dir="l.dir ?? 'ltr'"
                  :aria-current="l.code === locale ? 'true' : undefined"
                >
                  <span class="flex-1">{{ l.name }}</span>
                  <Check
                    v-if="l.code === locale"
                    aria-hidden="true"
                  />
                  <span
                    v-else
                    class="font-mono text-xs text-muted-foreground uppercase"
                  >{{ l.code }}</span>
                </NuxtLink>
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>

        <template v-if="props.cvHref || props.sourceHref">
          <ContextMenuSeparator :class="menuSeparatorClass" />
          <ContextMenuItem
            v-if="props.cvHref"
            as-child
            :class="menuItemClass"
          >
            <a
              :href="props.cvHref"
              :download="props.cvFileName || ''"
            ><FileDown /> {{ t('header.downloadCv') }}</a>
          </ContextMenuItem>
          <ContextMenuItem
            v-if="props.sourceHref"
            as-child
            :class="menuItemClass"
          >
            <a
              :href="props.sourceHref"
              target="_blank"
              rel="noopener noreferrer"
            ><Github /> {{ t('contextMenu.viewSource') }}</a>
          </ContextMenuItem>
        </template>

        <ContextMenuSeparator :class="menuSeparatorClass" />
        <p class="px-2 py-1 text-2xs text-muted-foreground">
          {{ t('contextMenu.nativeHint') }}
        </p>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
