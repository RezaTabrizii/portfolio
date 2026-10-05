<script setup lang="ts">
import { ChevronsUpDown } from 'lucide-vue-next'
import type { IconName } from '~/lib/icons'
import type { MonthYear } from '~/types/portfolio'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { IconTile } from '@/components/ui/icon-tile'
import { Separator } from '@/components/ui/separator'
import { icons } from '~/lib/icons'

/** One role on the timeline rail — collapsible title row, meta line, description and skill tags. */
const props = withDefaults(defineProps<{
  title: string
  icon?: IconName
  employmentType?: string
  start: MonthYear
  end?: MonthYear
  /** Replaces the computed duration in the meta row (e.g. the degree for education). */
  detail?: string
  description?: string | string[]
  skills?: string[]
  defaultOpen?: boolean
  /** Draws the rounded end-cap of the timeline rail. */
  last?: boolean
  /** One level below the enclosing section heading. */
  headingLevel?: 'h3' | 'h4'
}>(), {
  icon: 'code-xml',
  headingLevel: 'h4',
  skills: () => [],
})

const disabled = computed(() => !props.description || props.description.length === 0)
// Ongoing roles are re-measured on the client so a prerendered page never shows a stale duration.
const formatDuration = useFormatDuration()
const buildDuration = computed(() => formatDuration(props.start, props.end))
</script>

<template>
  <Collapsible
    :default-open="defaultOpen"
    :disabled="disabled"
    :unmount-on-hide="false"
    as-child
  >
    <div class="relative">
      <div
        v-if="last"
        aria-hidden="true"
        class="pointer-events-none absolute bottom-0 inset-s-3 size-4 bg-background"
      >
        <span class="block size-full -translate-y-[9px] rounded-es-sm border-b border-s" />
      </div>

      <CollapsibleTrigger
        class="relative block w-full cursor-pointer text-start outline-none before:absolute before:-top-1 before:-inset-e-1 before:-bottom-1.5 before:inset-s-7 before:-z-1 before:rounded-lg before:transition-colors before:duration-150 before:ease-out hover:before:bg-accent-muted focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50 data-disabled:cursor-default data-disabled:before:content-none"
      >
        <div class="relative z-1 mb-1 flex items-start gap-3 text-base">
          <IconTile>
            <component :is="icons[icon]" />
          </IconTile>
          <component
            :is="headingLevel"
            class="flex-1 font-medium text-balance"
          >
            {{ title }}
          </component>
          <span
            v-if="!disabled"
            class="flex h-6 items-center text-muted-foreground"
          >
            <ChevronsUpDown
              class="size-4"
              aria-hidden="true"
            />
          </span>
        </div>

        <dl class="flex flex-wrap items-center gap-x-2 ps-9 text-sm/normal text-muted-foreground tabular-nums">
          <template v-if="employmentType">
            <dd>{{ employmentType }}</dd>
            <Separator
              as="dd"
              orientation="vertical"
              class="data-[orientation=vertical]:h-4"
            />
          </template>
          <Period
            :start="start"
            :end="end"
          />
          <Separator
            as="dd"
            orientation="vertical"
            class="data-[orientation=vertical]:h-4"
          />
          <dd v-if="detail">
            {{ detail }}
          </dd>
          <dd v-else-if="end">
            {{ buildDuration }}
          </dd>
          <dd v-else>
            <ClientOnly>
              {{ formatDuration(start) }}
              <template #fallback>
                {{ buildDuration }}
              </template>
            </ClientOnly>
          </dd>
        </dl>
      </CollapsibleTrigger>

      <CollapsibleContent
        v-if="!disabled"
        class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      >
        <div class="pt-3 pb-1 ps-9">
          <Description :value="description!" />
        </div>
      </CollapsibleContent>

      <SkillTags
        v-if="skills.length"
        :skills="skills"
        class="pt-3 ps-9"
      />
    </div>
  </Collapsible>
</template>
