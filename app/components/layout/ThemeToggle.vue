<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { buttonVariants } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement
    && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
}

// "D" toggles the theme (same shortcut as the source site). Ignore modified keys so ⌘D / Ctrl+D still bookmark.
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key.toLowerCase() !== 'd' || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
  if (isTypingTarget(e.target)) return
  toggle()
})
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <button
        type="button"
        aria-label="Toggle mode"
        :class="buttonVariants({ variant: 'ghost', size: 'icon-sm', class: 'border-none' })"
        @click="toggle"
      >
        <!-- "Dark side" half-circle from the source; rotates 180° over 500ms on theme change. -->
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
          class="size-4"
        >
          <path
            class="origin-center transition-transform duration-500 ease-in-out dark:rotate-180"
            d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z"
          />
        </svg>
      </button>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <span class="flex items-center gap-3">Toggle mode <Kbd>D</Kbd></span>
    </TooltipContent>
  </Tooltip>
</template>
