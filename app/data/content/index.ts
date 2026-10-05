import type { PortfolioCopy } from '~/types/portfolio'
import de from './de'
import en from './en'
import fa from './fa'
import ja from './ja'
import tr from './tr'
import zh from './zh'

/** Portfolio copy per locale code (see `i18n.locales` in nuxt.config). */
export const CONTENT: Record<string, PortfolioCopy> = { en, de, zh, ja, tr, fa }
