<script setup lang="ts">
import type { SocialLink } from '~/types/portfolio'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { icons } from '~/lib/icons'

/** Row of outline icon-sm buttons with tooltips "Title (handle)". */
defineProps<{ links: SocialLink[] }>()
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li
      v-for="link in links"
      :key="link.href"
    >
      <Tooltip>
        <TooltipTrigger as-child>
          <a
            :href="link.href"
            :aria-label="link.title"
            :class="buttonVariants({ variant: 'outline', size: 'icon-sm', class: 'text-foreground/80 shadow-none' })"
            v-bind="externalLinkAttrs(link.href)"
          >
            <component
              :is="icons[link.icon]"
              class="size-[18px]"
            />
          </a>
        </TooltipTrigger>
        <TooltipContent>{{ link.handle ? `${link.title} (${link.handle})` : link.title }}</TooltipContent>
      </Tooltip>
    </li>
  </ul>
</template>
