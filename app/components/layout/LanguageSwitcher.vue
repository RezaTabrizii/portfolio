<script setup lang="ts">
import { Check, Languages } from 'lucide-vue-next'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'
import { buttonVariants } from '@/components/ui/button'

/** Header language menu: icon button → list of locales by native name, linking to the same page. */
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <DropdownMenuRoot :modal="false">
    <DropdownMenuTrigger
      :aria-label="t('header.language')"
      :class="buttonVariants({ variant: 'ghost', size: 'icon-sm', class: 'w-auto gap-1 px-1.5' })"
    >
      <Languages />
      <span class="font-mono text-xs uppercase">{{ locale }}</span>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="end"
        :side-offset="8"
        class="z-50 min-w-40 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        <DropdownMenuItem
          v-for="item in locales"
          :key="item.code"
          as-child
        >
          <NuxtLink
            :to="switchLocalePath(item.code)"
            :lang="item.language"
            :dir="item.dir ?? 'ltr'"
            :aria-current="item.code === locale ? 'true' : undefined"
            class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
          >
            <span class="flex-1">{{ item.name }}</span>
            <Check
              v-if="item.code === locale"
              class="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span
              v-else
              class="font-mono text-xs text-muted-foreground uppercase"
            >{{ item.code }}</span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
