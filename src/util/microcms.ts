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

/**  検索ワードを指定して記事を取得する */
export const searchArticles = async (q: string, page: number, perPage: number = 4) => {
  const data = await client.getList<Article>({
    endpoint: 'article',
    queries: { q, offset: (page - 1) * perPage, limit: perPage }
  })

  return {
    articles: data.contents,
    totalCount: data.totalCount,
    totalPages: Math.ceil(data.totalCount / perPage)
  }
}

/** タグ一覧を取得する */
export const getAllTags = async () => {
  const data = await client.getAllContents<Tag>({
    endpoint: 'tag'
  })

  return data
}
