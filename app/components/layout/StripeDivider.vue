<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

/** 32px diagonal-stripe band between panels; stripes bleed to the viewport edges. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    aria-hidden="true"
    :class="cn('stripe-divider h-(--separator-height) w-full border-x', props.class)"
  />
</template>
