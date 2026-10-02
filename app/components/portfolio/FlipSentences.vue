<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'

/** Tagline that flips every `interval` ms with a single 1.5s shimmer per sentence. */
const props = withDefaults(defineProps<{
  sentences: string[]
  interval?: number
}>(), { interval: 3000 })

const index = ref(0)

useIntervalFn(() => {
  if (props.sentences.length > 1) index.value = (index.value + 1) % props.sentences.length
}, () => props.interval)
</script>

<template>
  <span class="sr-only">{{ sentences.join('. ') }}</span>
  <span
    :key="index"
    aria-hidden="true"
    class="inline-block max-w-full truncate align-top font-mono text-xs/[21px] text-shimmer animate-flip-shimmer sm:text-sm/normal"
  >{{ sentences[index] }}</span>
</template>
