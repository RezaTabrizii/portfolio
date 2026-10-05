<script setup lang="ts">
/** `start — end` in the meta row; a missing `end` reads "Present". */
defineProps<{
  start: string
  end?: string
}>()

const { t } = useI18n()
</script>

<template>
  <dd class="flex items-center gap-0.5">
    <span>{{ start }}</span>
    <span class="font-mono">—</span>
    <span>{{ end ?? t('period.present') }}</span>
  </dd>
</template>
