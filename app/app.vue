<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'
import { TooltipProvider } from '@/components/ui/tooltip'

// reka-ui primitives (tooltips, menus) read the text direction from here; `fa` is RTL.
const { localeProperties } = useI18n()
const dir = computed(() => (localeProperties.value.dir === 'rtl' ? 'rtl' : 'ltr'))
</script>

<template>
  <ConfigProvider :dir="dir">
    <TooltipProvider>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TooltipProvider>
  </ConfigProvider>
</template>
