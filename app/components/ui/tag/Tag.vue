<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

/** Mono xs pill for skills under experience/projects. */
const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="tag"
    :class="cn(
      'inline-flex items-center rounded-full border bg-tag px-1.5 py-0.5 font-mono text-xs leading-4 text-muted-foreground [&_svg]:size-3.5 [&_svg]:shrink-0',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
