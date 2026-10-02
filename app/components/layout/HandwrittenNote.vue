<script setup lang="ts">
/** Caveat annotation for page gutters ("follow me"). Decorative — hidden from assistive tech. */
withDefaults(defineProps<{ rotate?: number }>(), { rotate: -6 })
</script>

<template>
  <div
    data-slot="handwritten-note"
    aria-hidden="true"
    class="pointer-events-none font-handwritten text-xl leading-none text-muted-foreground select-none"
  >
    <span
      class="inline-block"
      :style="{ transform: `rotate(${rotate}deg)` }"
    ><slot /></span>
  </div>
</template>
