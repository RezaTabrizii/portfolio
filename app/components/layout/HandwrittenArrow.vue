<script setup lang="ts">
/** Hand-drawn arrow from the source (points down-left). Mirror/rotate via `style`. */
withDefaults(defineProps<{ size?: number }>(), { size: 32 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0 text-muted-foreground"
  >
    <path d="M34 4c1 15-5 26-21 30" />
    <path d="m22 37-9-3 7.5-8" />
  </svg>
</template>
