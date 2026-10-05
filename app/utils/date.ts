import type { MonthYear } from '~/types/portfolio'

function toMonthIndex(value: MonthYear): number {
  const [month, year] = value.split('.').map(Number) as [number, number]
  return year * 12 + (month - 1)
}

/**
 * Inclusive duration between two `MM.YYYY` dates, split into whole years and months.
 * Ongoing ranges (no `end`) are measured up to `now`.
 */
export function durationParts(start: MonthYear, end?: MonthYear, now: Date = new Date()) {
  const endIndex = end ? toMonthIndex(end) : now.getFullYear() * 12 + now.getMonth()
  const months = Math.max(1, endIndex - toMonthIndex(start) + 1)
  return { years: Math.floor(months / 12), months: months % 12 }
}

/** Compact localized duration, e.g. `1y 6m` / `1年6个月`, using the `duration.*` messages. */
export function useFormatDuration() {
  const { t, locale } = useI18n()
  return (start: MonthYear, end?: MonthYear) => {
    const { years, months } = durationParts(start, end)
    const num = new Intl.NumberFormat(locale.value)
    return [
      years ? t('duration.years', { n: num.format(years) }) : '',
      months ? t('duration.months', { n: num.format(months) }) : '',
    ].filter(Boolean).join(t('duration.separator'))
  }
}
