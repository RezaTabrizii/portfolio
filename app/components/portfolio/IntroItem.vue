<script setup lang="ts">
import type { IconName } from '~/lib/icons'
import { IconTile } from '@/components/ui/icon-tile'
import { icons } from '~/lib/icons'

/** Mono overview row: icon tile + text/link. Used in the 2-col grid under the profile header. */
withDefaults(defineProps<{
  icon?: IconName
  href?: string
  span?: 1 | 2
}>(), {
  icon: 'briefcase-business',
  span: 1,
})
</script>

<template>
  <div :class="['flex items-center gap-4 font-mono text-sm/normal', span === 2 && 'sm:col-span-2']">
    <IconTile>
      <component :is="icons[icon]" />
    </IconTile>
    <p class="text-balance">
      <a
        v-if="href"
        class="link"
        :href="href"
        v-bind="externalLinkAttrs(href)"
      ><slot /></a>
      <slot v-else />
    </p>
  </div>
</template>
