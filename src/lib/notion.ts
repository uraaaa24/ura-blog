import { Client } from '@notionhq/client'

import { API_URL, NOTION_TOKEN } from './envs'
import { extractImageSrc, type Post } from './post'
import { formattedRawDate } from './util'

export const notion = new Client({
  auth: NOTION_TOKEN
})

export const getAllNotionPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/notion`)
    const data = await response.json()

    if (!data) return []
    const _data: Post[] = data?.results
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((post: any) => {
        return {
          title: post.properties.title.title[0].plain_text,
          description: post.properties.description.rich_text[0].plain_text,
          thumbnail: extractImageSrc(post.properties.thumbnail.rich_text[0].plain_text || ''),
          tags: post.properties.tags.multi_select,
          published: post.properties.published.checkbox,
          slug: post.id,
          date: post.properties.published_at.formula.string,
          formattedDate: formattedRawDate(post.properties.published_at.formula.string),
          id: post.id
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((post: any) => post.published)
    return _data
  } catch (error) {
    console.error('データの取得に失敗しました:', error)
    return []
  }
}
