<script setup lang="ts">
import type { StackGroup } from '~/types/portfolio'

/** Numbered category column (192px) + pill badges, dashed vertical guide between. Stacks on mobile. */
defineProps<{ groups: StackGroup[] }>()
</script>

<template>
  <div class="relative">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 inset-s-48 -z-1 hidden w-px border-e border-dashed border-line sm:block"
    />
    <div
      v-for="(group, i) in groups"
      :key="group.category"
      class="grid grid-cols-1 items-start gap-y-2 border-b border-line py-4 last:border-b-0 sm:grid-cols-[192px_1fr]"
    >
      <div class="ps-4 text-sm leading-6">
        <span
          class="me-1.5 font-mono text-muted-foreground/80 select-none"
          aria-hidden="true"
        >{{ String(i + 1).padStart(2, '0') }}</span>
        {{ group.category }}
      </div>
      <ul class="flex flex-wrap gap-1.5 px-4">
        <li
          v-for="item in group.items"
          :key="item"
          class="flex"
        >
          <span class="flex h-6 items-center justify-center gap-[5px] rounded-full bg-badge px-2 font-mono text-xs text-foreground inset-ring inset-ring-border">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
