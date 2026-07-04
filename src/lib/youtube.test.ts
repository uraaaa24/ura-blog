import { describe, expect, it } from 'vitest'

import { getYouTubeVideoId, isPlainUrlText } from './youtube'

describe('getYouTubeVideoId', () => {
  it('extracts video IDs from common YouTube URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    expect(getYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    expect(getYouTubeVideoId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('ignores non-YouTube URLs', () => {
    expect(getYouTubeVideoId('https://example.com/watch?v=dQw4w9WgXcQ')).toBeUndefined()
  })
})

describe('isPlainUrlText', () => {
  it('detects bare autolink text', () => {
    expect(isPlainUrlText(['https://youtu.be/dQw4w9WgXcQ'], 'https://youtu.be/dQw4w9WgXcQ')).toBe(
      true
    )
    expect(isPlainUrlText('動画', 'https://youtu.be/dQw4w9WgXcQ')).toBe(false)
  })
})
