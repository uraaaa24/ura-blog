import React from 'react'

import MarkDown from '@/components/markdown'
import Tag from '@/components/tag'

import { getPostBySlug } from '@/lib/api'

const ArticlePage = ({ params }: { params: { slug: string } }) => {
  const { title, date, tags, content } = getPostBySlug('article', params.slug)

  return (
    <div className="rounded-xl bg-[#ffffff] px-8 py-12">
      <div className="mb-10 flex flex-col gap-2 text-center">
        <p className="text-[#728d81]">{date}</p>
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex justify-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <MarkDown content={content} />
    </div>
  )
}

export default ArticlePage
