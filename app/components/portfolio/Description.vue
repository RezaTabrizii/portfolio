<script setup lang="ts">
/** Typeset body for experience/project/education rows: bullet list for arrays, paragraph otherwise. */
defineProps<{ value: string | string[] }>()
</script>

<template>
  <div class="typeset-description">
    <ul v-if="Array.isArray(value)">
      <li
        v-for="(item, i) in value"
        :key="i"
      >
        {{ item }}
      </li>
    </ul>
    <p v-else>
      {{ value }}
    </p>
  </div>
</template>
