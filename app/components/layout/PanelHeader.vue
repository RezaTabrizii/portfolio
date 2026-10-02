<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <header
    data-slot="panel-header"
    :class="cn('relative px-4 screen-line-bottom', props.class)"
  >
    <slot />
  </header>
</template>
