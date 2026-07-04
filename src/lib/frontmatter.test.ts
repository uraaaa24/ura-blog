import { describe, expect, it } from 'vitest'

import {
  getFrontmatterString,
  getFrontmatterStringArray,
  parseFrontmatter
} from './frontmatter'

describe('parseFrontmatter', () => {
  it('parses string, boolean, and array frontmatter values', () => {
    const parsed = parseFrontmatter(`---
thumbnail: 📄
title: cc-sddの仕様駆動開発についてまとめてみる
excerpt: cc-sdd（仕様駆動開発）について、その概要と利点、実践方法を解説します。
date: 2026-02-03
tags:
  - Development
  - cc-sdd
  - AI
published: true
---

## はじめに
`)

    expect(getFrontmatterString(parsed.data, 'title')).toBe(
      'cc-sddの仕様駆動開発についてまとめてみる'
    )
    expect(getFrontmatterString(parsed.data, 'date')).toBe('2026-02-03')
    expect(getFrontmatterStringArray(parsed.data, 'tags')).toEqual(['Development', 'cc-sdd', 'AI'])
    expect(parsed.data.published).toBe(true)
    expect(parsed.content).toBe('\n## はじめに\n')
  })

  it('returns empty data when frontmatter is missing', () => {
    const parsed = parseFrontmatter('## Title')

    expect(parsed.data).toEqual({})
    expect(parsed.content).toBe('## Title')
  })
})
