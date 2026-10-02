<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'

const props = defineProps<{
  skills: string[]
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ul :class="cn('flex flex-wrap gap-1.5', props.class)">
    <li
      v-for="skill in skills"
      :key="skill"
      class="flex"
    >
      <Tag>{{ skill }}</Tag>
    </li>
  </ul>
</template>
