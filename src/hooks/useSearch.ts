import { useMemo, useState } from 'react'

type UseSearchOptions<T> = {
  items: T[]
  searchKey: keyof T
}

type UseSearchReturn<T> = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredItems: T[]
}

/**
 * Generic search hook for filtering items by a specific property
 * @param items - Array of items to search through
 * @param searchKey - Property key to search in (must be a string property)
 * @returns Search query state and filtered items
 */
export const useSearch = <T>({ items, searchKey }: UseSearchOptions<T>): UseSearchReturn<T> => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        if (!searchQuery) return true

        const value = item[searchKey]
        if (typeof value !== 'string') return false

        return value.toLowerCase().includes(searchQuery.toLowerCase())
      }),
    [items, searchQuery, searchKey]
  )

  return {
    searchQuery,
    setSearchQuery,
    filteredItems
  }
}
