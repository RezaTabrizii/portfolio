<script setup lang="ts">
import { CV, GITHUB_URL, LINKEDIN_URL, NAV, OG_IMAGE, SOURCE_URL } from '~/data/portfolio'

const { t } = useI18n()
const P = usePortfolio()
const nav = computed(() => NAV.map(item => ({ title: t(`nav.${item.key}`), href: item.href })))

// <html lang/dir>, plus canonical, hreflang alternates and og:locale (those need `i18n.baseUrl`).
// `rel="me"` ties the profiles to this site for search engines and identity verification.
const localeHead = useLocaleHead()
const route = useRoute()
const siteUrl = useRuntimeConfig().public.siteUrl
useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: [
    ...localeHead.value.link,
    { rel: 'me', href: GITHUB_URL },
    { rel: 'me', href: LINKEDIN_URL },
  ],
  meta: localeHead.value.meta,
}))

// Absolute URLs only: Open Graph rejects relative ones, so these are omitted without a site URL.
const ogImage = siteUrl ? `${siteUrl}${OG_IMAGE.src}` : undefined
const nameParts = computed(() => P.value.name.split(' '))
useSeoMeta({
  title: () => P.value.meta.title,
  description: () => P.value.meta.description,
  author: () => P.value.name,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType: 'profile',
  ogSiteName: () => P.value.name,
  ogTitle: () => P.value.meta.title,
  ogDescription: () => P.value.meta.description,
  ogUrl: () => (siteUrl ? `${siteUrl}${route.path === '/' ? '' : route.path}` : undefined),
  ogImage,
  ogImageWidth: ogImage ? OG_IMAGE.width : undefined,
  ogImageHeight: ogImage ? OG_IMAGE.height : undefined,
  ogImageType: ogImage ? OG_IMAGE.type : undefined,
  ogImageAlt: () => (ogImage ? `${P.value.name} — ${P.value.headline}` : undefined),
  profileFirstName: () => nameParts.value[0],
  profileLastName: () => nameParts.value.slice(1).join(' '),
  profileUsername: GITHUB_URL.split('/').pop(),
  twitterCard: 'summary_large_image',
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
