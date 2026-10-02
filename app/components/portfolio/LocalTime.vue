<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'

/** Live local time in the owner's time zone. Client-only: a prerendered time would be stale. */
const props = defineProps<{
  timeZone: string
  city: string
}>()

const formatter = computed(() => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: props.timeZone }))
const time = ref<string>()

function update() {
  time.value = formatter.value.format(new Date())
}

onMounted(update)
useIntervalFn(update, 15_000)
</script>

<template>
  <IntroItem icon="clock-3">
    <time class="inline-block min-w-[7ch]">{{ time ?? '--:--' }}</time>
    <span class="text-muted-foreground"> // {{ city }}</span>
  </IntroItem>
</template>
