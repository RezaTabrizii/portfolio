<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="panel-description"
    :class="cn('py-4 text-base text-balance text-muted-foreground', props.class)"
  >
    <slot />
  </div>
</template>
