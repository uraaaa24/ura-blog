import { client } from '@/lib/microcms'
import { Article, Tag } from '@/type/microcms'

/** 記事一覧を取得する */
export const getAllArticles = async (page: number, perPage: number = 4) => {
  const data = await client.getList<Article>({
    endpoint: 'article',
    queries: {
      fields: ['id', 'title', 'eyeCatch', 'createdAt', 'tags'],
      offset: (page - 1) * perPage,
      limit: perPage
    }
  })

  return {
    articles: data.contents,
    totalCount: data.totalCount,
    totalPages: Math.ceil(data.totalCount / perPage)
  }
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
    queries: {
      filters: `title[contains]${q}`,
      offset: (page - 1) * perPage,
      limit: perPage
    }
  })

  return {
    articles: data.contents,
    totalCount: data.totalCount,
    totalPages: Math.ceil(data.totalCount / perPage)
  }
}

/** タグを指定して記事を取得する */
export const getArticlesByTag = async (tagId: string, page: number, perPage: number = 4) => {
  const data = await client.getList<Article>({
    endpoint: 'article',
    queries: {
      filters: `tags[contains]${tagId}`,
      offset: (page - 1) * perPage,
      limit: perPage
    }
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
