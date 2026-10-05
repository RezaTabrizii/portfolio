<script setup lang="ts">
import { CV, GITHUB_URL, NAV, SOURCE_URL } from '~/data/portfolio'

const { t } = useI18n()
const P = usePortfolio()
const nav = computed(() => NAV.map(item => ({ title: t(`nav.${item.key}`), href: item.href })))

// <html lang/dir>, plus canonical, hreflang alternates and og:locale (those need `i18n.baseUrl`).
const localeHead = useLocaleHead()
const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl
useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}))
useSeoMeta({
  title: () => P.value.meta.title,
  description: () => P.value.meta.description,
  ogTitle: () => P.value.meta.title,
  ogDescription: () => P.value.meta.description,
  ogUrl: () => (siteUrl ? `${siteUrl}${route.path === '/' ? '' : route.path}` : undefined),
})

// Replay the loader on every refresh in dev; once per tab in production.
const isDev = import.meta.dev
</script>

<!-- `isolate` gives the full-bleed hairlines (z-index:-1 pseudo-elements) a stacking context. -->
<template>
  <SiteContextMenu
    :cv-href="CV.href"
    :cv-file-name="CV.fileName"
    :source-href="SOURCE_URL"
  >
    <div class="relative isolate">
      <a
        href="#main"
        class="sr-only focus:not-sr-only focus:fixed focus:inset-s-2 focus:top-2 focus:z-[60] focus:rounded-lg focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >{{ t('skipToContent') }}</a>

      <SiteLoader
        :title="P.name"
        :subtitle="P.tagline"
        :loading-label="t('loader.loading')"
        :once-per-session="!isDev"
      />

      <ClientOnly>
        <CustomCursor />
      </ClientOnly>

      <SiteHeader
        :nav="nav"
        :logo-alt="t('header.home', { name: P.name })"
        :github-href="GITHUB_URL"
        :cv-href="CV.href"
        :cv-file-name="CV.fileName"
      />

      <main
        id="main"
        class="max-w-screen overflow-x-clip px-(--page-gutter)"
      >
        <slot />
      </main>

      <SiteFooter
        :title="P.name"
        :subtitle="P.headline"
        :socials="P.socials"
      />

      <BottomFade />
    </div>
  </SiteContextMenu>
</template>
