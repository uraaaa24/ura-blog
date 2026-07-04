import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { processContentImages } from './process-markdown'

const createTempPostDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'ura-blog-post-'))

describe('processContentImages', () => {
  it('rewrites images relative to the post directory', () => {
    const sourceDir = createTempPostDir()
    fs.writeFileSync(path.join(sourceDir, 'image.png'), '')
    fs.mkdirSync(path.join(sourceDir, 'assets'))
    fs.writeFileSync(path.join(sourceDir, 'assets', 'diagram.png'), '')

    const content = [
      '![Alt](./image.png)',
      '![Diagram](assets/diagram.png?raw=1)',
      '![Remote](https://example.com/image.png)',
      '![Public](/already-public.png)'
    ].join('\n')

    expect(processContentImages('cc-sdd', content, { sourceDir })).toBe(
      [
        '![Alt](/contents/cc-sdd/image.png)',
        '![Diagram](/contents/cc-sdd/assets/diagram.png?raw=1)',
        '![Remote](https://example.com/image.png)',
        '![Public](/already-public.png)'
      ].join('\n')
    )
  })

  it('does not rewrite images outside the post directory', () => {
    const parentDir = createTempPostDir()
    const sourceDir = path.join(parentDir, 'post')
    fs.mkdirSync(sourceDir)
    fs.writeFileSync(path.join(parentDir, 'shared.png'), '')

    expect(processContentImages('post', '![Shared](../shared.png)', { sourceDir })).toBe(
      '![Shared](../shared.png)'
    )
  })
})
