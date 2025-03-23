import { NextResponse } from 'next/server'

import { notion } from '@/lib/notion'
import { extractImageSrc } from '@/lib/post'
import { formattedRawDate } from '@/lib/util'

export const GET = async (_request: Request, { params }: { params: { id: string } }) => {
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'IDが指定されていません。' }, { status: 400 })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const post: any = await notion.pages.retrieve({ page_id: id })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blocks: any = await notion.blocks.children.list({ block_id: id })

    console.log('blocks', blocks)

    const postProperties = {
      title: post.properties.title.title[0].plain_text,
      description: post.properties.description.rich_text[0].plain_text,
      thumbnail: extractImageSrc(post.properties.thumbnail.rich_text[0].plain_text || ''),
      tags: post.properties.tags.multi_select,
      published: post.properties.published.checkbox,
      slug: post.id,
      date: post.properties.published_at.formula.string,
      formattedDate: formattedRawDate(post.properties.published_at.formula.string),
      content: blocks.results
    }

    return new NextResponse(JSON.stringify(postProperties), { status: 200 })
  } catch (error) {
    console.error(`Notionページ（ID: ${id}）の取得に失敗:`, error)

    return new NextResponse(JSON.stringify({ error: 'Notionページの取得に失敗しました。' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
