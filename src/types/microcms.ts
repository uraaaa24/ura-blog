import { MicroCMSDate } from 'microcms-js-sdk'

export type Article = {
  id: string
  title: string
  body: string
} & MicroCMSDate
