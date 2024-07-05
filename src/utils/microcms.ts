import { MicroCMSQueries } from 'microcms-js-sdk'

import { client } from '@/libs/microcms'
import { Article } from '@/types/microcms'

export const getAllArticles = async (queries?: MicroCMSQueries) => {
  const data = await client.getList<Article>({
    endpoint: 'article',
    queries
  })

  return data
}
