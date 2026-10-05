<script setup lang="ts">
import { Infinity as InfinityIcon } from 'lucide-vue-next'

/** `start — end` in the meta row; a missing `end` renders the infinity glyph ("Present"). */
const { t } = useI18n()

defineProps<{
  start: string
  end?: string
}>()
</script>

<template>
  <dd class="flex items-center gap-0.5">
    <span>{{ start }}</span>
    <span class="font-mono">—</span>
    <span v-if="end">{{ end }}</span>
    <template v-else>
      <InfinityIcon
        class="size-[18px] translate-y-[0.5px]"
        :stroke-width="1.5"
        aria-hidden="true"
      />
      <span class="sr-only">{{ t('period.present') }}</span>
    </template>
  </dd>
</template>
