// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // shadcn-vue components are single-word by convention (Button, Card, …).
    'vue/multi-word-component-names': 'off',
  },
})
