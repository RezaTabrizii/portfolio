<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// Rare in this design: radius 14px, shadow-xs + 1px foreground/10 ring, no border.
const props = withDefaults(defineProps<{
  size?: 'default' | 'sm'
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
})
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :class="
      cn(
        'group/card flex flex-col gap-6 overflow-hidden rounded-xl bg-card py-6 text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 data-[size=sm]:gap-4 data-[size=sm]:py-4 dark:shadow-none dark:ring-border',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
