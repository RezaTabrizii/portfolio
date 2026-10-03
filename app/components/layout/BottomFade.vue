<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

/** Hidden once the page is scrolled to the bottom, so it doesn't cover the end of the footer. */
const { arrivedState } = useWindowScroll({ offset: { bottom: 1 } })
</script>

<template>
  <!-- Fixed 96px fade + 1px blur at the bottom of the viewport. -->
  <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background backdrop-blur-[1px] transition-opacity duration-300 [mask-image:linear-gradient(to_top,#000_25%,transparent)]"
    :class="arrivedState.bottom ? 'opacity-0' : 'opacity-100'"
  />
</template>
