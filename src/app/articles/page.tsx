import ArticleList from '@/components/article/articleList'
import { getAllArticles } from '@/lib/api'
import React from 'react'

const ArticlesPage = () => {
  const allArticles = getAllArticles()
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-2">Articles</h1>
      <ArticleList posts={allArticles} />
    </div>
  )
}

export default ArticlesPage
