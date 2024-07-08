import { MicroCMSQueries } from 'microcms-js-sdk'

import { client } from '@/lib/microcms'
import { Article, Tag } from '@/type/microcms'

/** 記事一覧を取得する */
export const getAllArticles = async (queries?: MicroCMSQueries) => {
  const data = await client.getAllContents<Article>({
    endpoint: 'article',
    queries
  })

  return data
}

/** IDを指定して記事を取得する */
export const getArticleById = async (id: string) => {
  const data = await client.get<Article>({
    endpoint: 'article',
    contentId: id
  })

  return data
}

export const getAllTags = async () => {
  const data = await client.getAllContents<Tag>({
    endpoint: 'tag'
  })

  return data
}
