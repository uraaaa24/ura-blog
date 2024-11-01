import React from 'react'

import MarkDown from '@/components/markdown'
import Tag from '@/components/tag'

import { getPostBySlug } from '@/lib/api'

const ArticlePage = ({ params }: { params: { slug: string } }) => {
  const { title, date, tags, content } = getPostBySlug('article', params.slug)

  return (
    <article className="rounded-xl bg-white px-8 py-10 dark:bg-gray-800">
      <header className="mb-10 flex flex-col items-center gap-2 text-center">
        <p className="text-gray-500 dark:text-gray-400">{date}</p>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>
      <MarkDown content={content} />
    </article>
  )
}

export default ArticlePage
