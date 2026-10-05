<script setup lang="ts">
import type { Experience } from '~/types/portfolio'

/** Company block: logo/dot, name, location, live ping, and positions on a vertical timeline. */
const props = defineProps<Experience>()

const { t } = useI18n()
const anchor = computed(() => `experience-${props.id}`)
</script>

<template>
  <div
    :id="anchor"
    class="flex scroll-mt-[calc(var(--header-height)+var(--separator-height))] flex-col gap-4 py-4 screen-line-bottom"
  >
    <div class="flex items-center gap-3">
      <div class="flex size-6 shrink-0 items-center justify-center">
        <img
          v-if="companyLogo"
          :src="companyLogo"
          alt=""
          width="24"
          height="24"
          class="rounded-full grayscale transition-[filter] duration-300 ease-in-out hover:grayscale-0"
        >
        <span
          v-else
          class="flex size-2 rounded-full bg-(--zinc-300)"
        />
      </div>

      <div class="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pe-1">
        <h3 class="text-xl leading-6 font-medium">
          <a
            v-if="companyWebsite"
            class="link"
            :href="companyWebsite"
            target="_blank"
            rel="noopener noreferrer"
          >{{ companyName }}</a>
          <template v-else>
            {{ companyName }}
          </template>
        </h3>
        <dl
          v-if="location || isCurrent"
          class="flex min-w-0 items-center gap-1.5 text-sm/normal whitespace-nowrap text-muted-foreground"
        >
          <dd v-if="location">
            {{ location }}
          </dd>
          <dd v-if="locationType">
            ({{ locationType }})
          </dd>
          <dd v-if="isCurrent">
            <!-- Current-role ping (info blue). -->
            <span class="relative flex size-2.5 translate-x-px translate-y-px items-center justify-center">
              <span class="absolute size-2.5 animate-ping-dot rounded-full bg-info opacity-50" />
              <span class="relative size-1.5 rounded-full bg-info" />
              <span class="sr-only">{{ t('experience.current') }}</span>
            </span>
          </dd>
        </dl>
      </div>
    </div>

    <div class="relative flex flex-col gap-4 before:absolute before:top-0 before:inset-s-3 before:h-full before:w-px before:bg-border">
      <PositionItem
        v-for="(position, i) in positions"
        :key="position.title + i"
        v-bind="position"
        :last="i === positions.length - 1"
      />
    </div>
  </div>
</template>
