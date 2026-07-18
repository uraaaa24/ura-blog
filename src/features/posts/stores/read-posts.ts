'use client'

import { useMemo, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'gana-blog:read-posts'
const READ_POSTS_UPDATED_EVENT = 'gana-blog:read-posts-updated'

const parseReadPostKeys = (storedValue: string): string[] => {
  try {
    const parsedValue: unknown = JSON.parse(storedValue)
    if (!Array.isArray(parsedValue)) return []

    return parsedValue.filter((value): value is string => typeof value === 'string')
  } catch {
    return []
  }
}

const getStoredReadPosts = () => {
  if (typeof window === 'undefined') return '[]'

  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

const getServerSnapshot = () => '[]'

export const markPostAsRead = (postKey: string) => {
  if (typeof window === 'undefined') return

  const readPostKeys = parseReadPostKeys(getStoredReadPosts())
  if (readPostKeys.includes(postKey)) return

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...readPostKeys, postKey]))
    window.dispatchEvent(new Event(READ_POSTS_UPDATED_EVENT))
  } catch {
    // Reading an article should still work when storage is unavailable or full.
  }
}

const subscribeToReadPosts = (onStoreChange: () => void) => {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onStoreChange()
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(READ_POSTS_UPDATED_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(READ_POSTS_UPDATED_EVENT, onStoreChange)
  }
}

export const useReadPostKeys = () => {
  const storedReadPosts = useSyncExternalStore(
    subscribeToReadPosts,
    getStoredReadPosts,
    getServerSnapshot
  )

  return useMemo<ReadonlySet<string>>(
    () => new Set(parseReadPostKeys(storedReadPosts)),
    [storedReadPosts]
  )
}
