<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

/** 24px chip framing a leading 16px icon — layered border + 1px offset ring (site-wide signature). */
const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="icon-tile"
    :class="cn(
      'flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted text-muted-foreground select-none',
      'shadow-[0_0_0_1px_var(--background),0_0_0_2px_color-mix(in_oklab,var(--border)_50%,transparent)] dark:shadow-[0_0_0_1px_var(--background),0_0_0_2px_var(--line)]',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
