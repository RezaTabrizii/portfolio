<script setup lang="ts">
import { ChevronsUpDown, Link } from 'lucide-vue-next'
import type { Project } from '~/types/portfolio'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { IconTile } from '@/components/ui/icon-tile'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { icons } from '~/lib/icons'

/** Full-width collapsible project row; dashed guide after the icon gutter. */
withDefaults(defineProps<Project>(), {
  icon: 'box',
  skills: () => [],
})
</script>

<template>
  <Collapsible
    :default-open="defaultOpen"
    :unmount-on-hide="false"
    as-child
  >
    <div class="border-b border-line">
      <div class="relative flex items-center transition-colors duration-150 hover:bg-accent-muted">
        <IconTile class="mx-4">
          <component :is="icons[icon]" />
        </IconTile>

        <div class="flex flex-1 items-center gap-2 border-l border-dashed border-line p-4">
          <div class="flex-1">
            <h3 class="mb-1 text-base leading-snug font-medium text-balance">
              <CollapsibleTrigger class="cursor-pointer text-left outline-none focus-visible:underline">
                <!-- Stretches the trigger over the whole row. -->
                <span
                  class="absolute inset-0"
                  aria-hidden="true"
                />
                {{ title }}
              </CollapsibleTrigger>
            </h3>
            <dl class="flex flex-wrap items-center gap-x-2 text-sm/normal text-muted-foreground tabular-nums">
              <Period
                v-if="period.end"
                :start="period.start"
                :end="period.end === 'present' ? undefined : period.end"
              />
              <dd v-else>
                {{ period.start }}
              </dd>
            </dl>
          </div>

          <Tooltip v-if="link">
            <TooltipTrigger as-child>
              <a
                :href="link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open project"
                class="relative flex size-6 items-center justify-center text-muted-foreground"
              >
                <Link class="size-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Open project</TooltipContent>
          </Tooltip>
          <span
            class="flex text-muted-foreground"
            aria-hidden="true"
          >
            <ChevronsUpDown class="size-4" />
          </span>
        </div>
      </div>

      <CollapsibleContent class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div class="flex flex-col gap-4 border-t border-line p-4">
          <Description
            v-if="description"
            :value="description"
          />
          <SkillTags
            v-if="skills.length"
            :skills="skills"
          />
        </div>
      </CollapsibleContent>
    </div>
  </Collapsible>
</template>
