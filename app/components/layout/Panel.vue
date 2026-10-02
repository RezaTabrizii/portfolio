<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

/** Bordered section on the 768px rail, with full-bleed hairlines above and below. */
const props = defineProps<{
  id?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <section
    :id="id"
    data-slot="panel"
    :class="cn(
      'relative scroll-mt-[calc(var(--header-height)+var(--separator-height))] border-x screen-line-top screen-line-bottom screen-line-bottom-border',
      props.class,
    )"
  >
    <slot />
  </section>
</template>
