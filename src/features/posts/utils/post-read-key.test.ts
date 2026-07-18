import { describe, expect, it } from 'vitest'

import { createPostReadKey } from './post-read-key'

describe('createPostReadKey', () => {
  it('creates a key from the post source and href', () => {
    expect(createPostReadKey({ source: 'local', href: '/posts/testing' })).toBe(
      'local:/posts/testing'
    )
  })
})
