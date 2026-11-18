import { imageSize } from 'image-size'
import fs from 'node:fs'
import path from 'node:path'

import { postsDirectory } from './local-post-files'

const publicDirectory = path.join(process.cwd(), 'public')
const CONTENTS_PREFIX = '/contents/'

export type ImageDimensions = {
  width: number
  height: number
}

/** `/contents/...` は記事ディレクトリ、それ以外の `/...` はpublicディレクトリとして解決する。 */
const resolveLocalImagePath = (src: string): string | undefined => {
  if (!src.startsWith('/') || src.startsWith('//')) return undefined

  const pathname = decodeURIComponent(src.replace(/[?#].*$/, ''))
  const [baseDir, relativePath] = pathname.startsWith(CONTENTS_PREFIX)
    ? [postsDirectory, pathname.slice(CONTENTS_PREFIX.length)]
    : [publicDirectory, pathname.slice(1)]

  const filePath = path.resolve(baseDir, relativePath)
  const relative = path.relative(baseDir, filePath)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return undefined

  return filePath
}

/** ローカル画像の表示上の幅と高さを返す。取得できない場合はundefined。 */
export const getLocalImageSize = (src: string): ImageDimensions | undefined => {
  try {
    const filePath = resolveLocalImagePath(src)
    if (!filePath) return undefined

    // 記事ページはビルド時に生成されるため、画像をサーバーバンドルに含める必要はない
    const { width, height, orientation } = imageSize(
      fs.readFileSync(/*turbopackIgnore: true*/ filePath)
    )
    if (!width || !height) return undefined

    // EXIFの回転（5〜8）は縦横が入れ替わって表示される
    return orientation && orientation >= 5 ? { width: height, height: width } : { width, height }
  } catch {
    return undefined
  }
}
