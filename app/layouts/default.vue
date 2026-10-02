<script setup lang="ts">
import { CV, FOOTER_FIELDS, FOOTER_SOCIALS, GITHUB_URL, NAV, PORTFOLIO } from '~/data/portfolio'
</script>

<!-- `isolate` gives the full-bleed hairlines (z-index:-1 pseudo-elements) a stacking context. -->
<template>
  <div class="relative isolate">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
    >Skip to content</a>

    <ClientOnly>
      <CustomCursor />
    </ClientOnly>

    <SiteHeader
      :nav="NAV"
      :logo-alt="`${PORTFOLIO.name} — Home`"
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
      :title="PORTFOLIO.name"
      subtitle="Full-Stack Developer — .NET & Vue"
      :fields="FOOTER_FIELDS"
      :socials="FOOTER_SOCIALS"
    />

    <BottomFade />
  </div>
</template>
