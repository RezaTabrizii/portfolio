<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="cn(
      'pointer-events-none inline-flex h-5 w-fit min-w-6 items-center justify-center gap-1 rounded-sm px-1 font-sans text-sm leading-none font-normal tracking-tight text-muted-foreground select-none',
      'bg-black/5 shadow-[inset_0_0_1px_rgb(0_0_0/0.1)] dark:bg-white/10 dark:shadow-[inset_0_0_1px_rgb(255_255_255/0.2)]',
      '[[data-slot=tooltip-content]_&]:bg-white/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:shadow-[inset_0_0_1px_rgb(255_255_255/0.2)]',
      'dark:[[data-slot=tooltip-content]_&]:bg-black/10 dark:[[data-slot=tooltip-content]_&]:shadow-[inset_0_0_1px_rgb(0_0_0/0.1)]',
      '[&_svg:not([class*=size-])]:size-3',
      props.class,
    )"
  >
    <slot />
  </kbd>
</template>
