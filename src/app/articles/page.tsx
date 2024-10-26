import React from 'react'

import ArticleList from '@/app/articles/_components/articleList'
import { getAllArticles } from '@/lib/api'

const ArticlesPage = () => {
  const allArticles = getAllArticles()
  return (
    <div>
      <h1 className="mb-2 text-center text-4xl font-bold">Articles</h1>
      <ArticleList posts={allArticles} />
    </div>
  )
}

export default ArticlesPage
