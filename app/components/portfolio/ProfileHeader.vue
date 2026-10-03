<script setup lang="ts">
/** Profile hero: avatar column, "Fig. 1." figure (slot), name row + flipping tagline. */
withDefaults(defineProps<{
  name: string
  avatarSrc?: string
  avatarAlt?: string
  sentences?: string[]
  verified?: boolean
  caption?: string
}>(), {
  avatarAlt: '',
  sentences: () => [],
  caption: 'Fig. 1.',
})
</script>

<template>
  <div class="grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[1fr_auto] overflow-y-clip border-x screen-line-bottom screen-line-bottom-border">
    <figure class="relative col-start-2 row-start-1 m-0 hidden min-h-0 p-4 sm:block">
      <slot name="figure" />
      <figcaption class="pointer-events-none absolute right-4 bottom-4 font-mono text-sm leading-none tracking-wide text-[color-mix(in_oklab,var(--muted-foreground)_60%,var(--background))] tabular-nums select-none">
        {{ caption }}
      </figcaption>
    </figure>

    <div class="col-start-1 row-span-2 row-start-1 flex flex-col">
      <div class="mt-auto shrink-0 border-r border-line screen-line-top">
        <div class="mx-0.5 my-[3px] flex">
          <div class="relative size-24 rounded-full sm:size-32 md:size-40">
            <img
              v-if="avatarSrc"
              :src="avatarSrc"
              :alt="avatarAlt"
              width="160"
              height="160"
              class="block size-full rounded-[inherit] object-cover select-none"
            >
            <div
              v-else
              class="size-full rounded-[inherit] bg-muted"
            />
            <div class="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring inset-ring-foreground/30" />
          </div>
        </div>
      </div>
    </div>

    <!-- Below sm the figure is hidden and the name block takes over its rows. -->
    <div class="col-start-2 row-span-2 row-start-1 flex flex-col sm:row-span-1 sm:row-start-2">
      <div class="z-1 flex flex-1 flex-col sm:mt-auto sm:flex-none sm:border-t sm:border-line">
        <div class="flex min-w-0 flex-1 -translate-x-px items-center gap-2 py-2 pr-2 pl-3 sm:py-0 sm:pl-4">
          <h1 class="min-w-0 -translate-y-px truncate text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
            {{ name }}
          </h1>
          <svg
            v-if="verified"
            viewBox="0 0 24 24"
            class="size-[18px] shrink-0 text-info"
            aria-label="Verified"
          >
            <path
              fill="currentColor"
              d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
            />
          </svg>
        </div>
        <div class="flex h-9 min-w-0 items-center border-t border-line py-1 pr-2 pl-3 text-muted-foreground sm:pl-4">
          <FlipSentences :sentences="sentences" />
        </div>
      </div>
    </div>
  </div>
</template>
