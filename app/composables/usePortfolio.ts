import { CONTENT } from '~/data/content'
import { buildPortfolio } from '~/data/portfolio'

/** The portfolio in the active locale (falls back to English). */
export function usePortfolio() {
  const { locale } = useI18n()
  return computed(() => buildPortfolio(CONTENT[locale.value] ?? CONTENT.en!))
}
