import React from 'react'

import ArticleCard from '@/app/articles/_components/articleCard'
import { Post } from '@/types/post'

type ArticleListProps = {
  posts: Post[]
}

const ArticleList = ({ posts }: ArticleListProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-6 py-5">
      {posts.map((post, index) => {
        return <ArticleCard date={post.date} key={index} slug={post.slug} title={post.title} />
      })}
    </div>
  )
}

export default ArticleList
