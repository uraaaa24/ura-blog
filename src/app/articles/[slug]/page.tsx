import React from 'react'

import MarkDown from '@/components/markdown'

import { getPostBySlug } from '@/lib/api'

const ArticlePage = ({ params }: { params: { slug: string } }) => {
  const { content } = getPostBySlug('article', params.slug)

  return (
    <div>
      <MarkDown content={content} />
    </div>
  )
}

export default ArticlePage
