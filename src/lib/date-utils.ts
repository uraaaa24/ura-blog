/**
 * Convert value to valid Date or null if invalid
 */
export const toValidDate = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const date = new Date(
    typeof value === 'string' || typeof value === 'number' ? value : String(value)
  )
  return Number.isNaN(date.getTime()) ? null : date
}

/**
 * Format date to string with given options
 */
export const formatDate = (date: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts }).format(date)
