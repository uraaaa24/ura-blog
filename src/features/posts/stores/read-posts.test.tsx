import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { markPostAsRead, useReadPostKeys } from './read-posts'

const POST_KEY = 'local:/posts/testing'

describe('read posts', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('stores a post as read without duplicates', () => {
    markPostAsRead(POST_KEY)
    markPostAsRead(POST_KEY)

    expect(JSON.parse(window.localStorage.getItem('gana-blog:read-posts') ?? '[]')).toEqual([
      POST_KEY
    ])
  })

  it('updates subscribers when a post is marked as read', () => {
    const { result } = renderHook(() => useReadPostKeys())

    expect(result.current.has(POST_KEY)).toBe(false)

    act(() => markPostAsRead(POST_KEY))

    expect(result.current.has(POST_KEY)).toBe(true)
  })

  it('ignores malformed storage values', () => {
    window.localStorage.setItem('gana-blog:read-posts', '{invalid json')
    const { result } = renderHook(() => useReadPostKeys())

    expect(result.current.size).toBe(0)
  })
})
