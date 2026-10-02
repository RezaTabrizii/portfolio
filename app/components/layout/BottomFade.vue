<template>
  <!-- Fixed 96px fade + 1px blur at the bottom of the viewport. -->
  <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background backdrop-blur-[1px] [mask-image:linear-gradient(to_top,#000_25%,transparent)]"
  />
</template>
