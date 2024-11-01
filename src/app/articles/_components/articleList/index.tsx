import React from 'react'

import ArticleCard from '@/app/articles/_components/articleCard'
import { Post } from '@/types/post'

type ArticleListProps = {
  posts: Post[]
}

const ArticleList = ({ posts }: ArticleListProps) => {
  return (
    <div className="grid w-full gap-6 py-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {posts.map((post, index) => (
        <ArticleCard key={index} {...post} />
      ))}
    </div>
  )
}

export default ArticleList
