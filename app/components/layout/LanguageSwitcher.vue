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
import { menuContentClass, menuItemClass } from '~/lib/menu'

/** Header language menu: icon button → list of locales by native name, linking to the same page. */
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <DropdownMenuRoot :modal="false">
    <DropdownMenuTrigger
      :aria-label="t('header.language')"
      :class="buttonVariants({ variant: 'ghost', size: 'icon-sm' })"
    >
      <Languages />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="end"
        :side-offset="8"
        :class="[menuContentClass, 'min-w-40']"
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
            :class="menuItemClass"
          >
            <span class="flex-1">{{ item.name }}</span>
            <Check
              v-if="item.code === locale"
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
