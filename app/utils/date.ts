import type { MonthYear } from '~/types/portfolio'

function toMonthIndex(value: MonthYear): number {
  const [month, year] = value.split('.').map(Number) as [number, number]
  return year * 12 + (month - 1)
}

/**
 * Compact inclusive duration between two `MM.YYYY` dates, e.g. `1y 6m`, `9m`.
 * Ongoing ranges (no `end`) are measured up to `now`.
 */
export function formatDuration(start: MonthYear, end?: MonthYear, now: Date = new Date()): string {
  const endIndex = end ? toMonthIndex(end) : now.getFullYear() * 12 + now.getMonth()
  const months = Math.max(1, endIndex - toMonthIndex(start) + 1)
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y ? `${y}y` : '', m ? `${m}m` : ''].filter(Boolean).join(' ')
}
