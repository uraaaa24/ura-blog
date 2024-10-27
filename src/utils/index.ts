/** Combines multiple class names into a single string. */
export function cx(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(' ')
}
