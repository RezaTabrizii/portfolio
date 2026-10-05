<script setup lang="ts">
import type { Education } from '~/types/portfolio'

/** Education entry: graduation-cap tile on the timeline rail; meta = period · degree. */
withDefaults(defineProps<Education & { defaultOpen?: boolean, last?: boolean }>(), {
  last: true,
  skills: () => [],
})
</script>

<template>
  <div class="relative before:absolute before:top-0 before:inset-s-3 before:h-full before:w-px before:bg-border">
    <PositionItem
      :title="school"
      icon="graduation-cap"
      :start="start"
      :end="end"
      :detail="degree"
      :description="description"
      :skills="skills"
      :default-open="defaultOpen"
      :last="last"
    />
  </div>
</template>
