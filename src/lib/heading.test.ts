import { describe, expect, it } from 'vitest'

import { toHashHref, toHeadingId } from './heading'

describe('toHeadingId', () => {
  it('should preserve repeated hyphens created from removed punctuation', () => {
    expect(toHeadingId('1. ステアリング (Steering / コンテキスト収集)')).toBe(
      '1-ステアリング-steering--コンテキスト収集'
    )
  })
})

describe('toHashHref', () => {
  it('should encode heading IDs as URL fragments', () => {
    expect(toHashHref('見出し 1 / React?')).toBe(
      '#%E8%A6%8B%E5%87%BA%E3%81%97%201%20%2F%20React%3F'
    )
  })
})
