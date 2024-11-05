import { ReactNode } from 'react'

/** Combines multiple class names into a single string. */
export function cx(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(' ')
}

/* Converts a string to a slug. */
export function slugify(text: ReactNode): string {
  if (typeof text === 'string') {
    return text.trim().replace(/\s+/g, '-').toLowerCase()
  }

  return String(text)
}
