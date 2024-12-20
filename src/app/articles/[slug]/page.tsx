import React from 'react'

import MarkDown from '@/components/markdown'
import Tag from '@/components/tag'

import { getPostBySlug } from '@/lib/api'

const ArticlePage = ({ params }: { params: { slug: string } }) => {
  const { title, date, tags, content } = getPostBySlug('article', params.slug)

  return (
    <article className="my-8">
      <header className="mb-16 flex flex-col items-center gap-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">{date}</p>
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>
      <div className="my-8 rounded-xl border-2 border-[#e5e5e5] p-10 dark:border-[#37464f] ">
        <MarkDown content={content} />
      </div>
    </article>
  )
}

export default ArticlePage
