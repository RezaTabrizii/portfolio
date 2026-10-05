<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { Check, Link } from 'lucide-vue-next'

/** Panel heading (30/36, weight 500). With `href`, shows a hover "copy link to section" button. */
const props = withDefaults(defineProps<{
  as?: 'h1' | 'h2' | 'h3'
  href?: `#${string}`
  sup?: number | string
  copyable?: boolean
}>(), {
  as: 'h2',
  copyable: true,
})

const { t } = useI18n()
const { copy, copied } = useClipboard({ copiedDuring: 1500 })

function copyLink() {
  if (!props.href) return
  copy(`${window.location.origin}${window.location.pathname}${props.href}`)
}
</script>

<template>
  <component
    :is="as"
    data-slot="panel-title"
    class="group/title relative text-3xl leading-9 font-medium tracking-tight text-balance"
  >
    <NuxtLink
      v-if="href"
      :to="href"
    >
      <slot />
    </NuxtLink>
    <slot v-else />
    <sup
      v-if="sup != null"
      class="relative top-[-0.9em] ms-1 align-baseline text-sm leading-none font-medium tracking-normal text-muted-foreground"
    >{{ sup }}</sup>
    <button
      v-if="copyable && href"
      type="button"
      :aria-label="copied ? t('panel.linkCopied') : t('panel.copyLink')"
      class="absolute top-1 ms-1 inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-opacity duration-150 group-hover/title:opacity-100 hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none dark:hover:bg-muted/50"
      @click="copyLink"
    >
      <Check
        v-if="copied"
        class="size-4"
      />
      <Link
        v-else
        class="size-4"
      />
    </button>
  </component>
</template>
