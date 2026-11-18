import { describe, expect, it } from 'vitest'

import { getLocalImageSize } from './image-size'

describe('getLocalImageSize', () => {
  it('reads images under /contents from the posts directory', () => {
    expect(getLocalImageSize('/contents/markdown-cheatsheet/example.jpeg')).toEqual({
      width: 2128,
      height: 1476
    })
  })

  it('reads other root-relative images from the public directory', () => {
    expect(getLocalImageSize('/icon.png?v=1')).toEqual({ width: 1254, height: 1254 })
  })

  it.each([
    'https://cdn.jsdelivr.net/image.png',
    '//example.com/image.png',
    '/contents/../package.json',
    '/missing.png',
    ''
  ])('returns undefined for %s', (src) => {
    expect(getLocalImageSize(src)).toBeUndefined()
  })
})
