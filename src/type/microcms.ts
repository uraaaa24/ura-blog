import { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk'

export type Article = {
  /** 記事ID */
  id: string
  /** タイトル */
  title: string
  /** 本文 */
  body: string
  /** アイキャッチ画像 */
  eyeCatch?: MicroCMSImage
  /** タグ */
  tags: Tag[]
} & MicroCMSDate

export type Tag = {
  /** タグID */
  id: string
  /** タグ名 */
  name: string
} & MicroCMSDate
