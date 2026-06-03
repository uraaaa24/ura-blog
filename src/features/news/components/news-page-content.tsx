'use client'

import PageHeader from '@/components/layouts/page-header'
import { useEffect, useState } from 'react'
import type { NewsArticle } from '../types'
import NewsCard from './news-card'

const NewsPageContent = () => {
  const [newsData, setNewsData] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/news')
        if (response.ok) {
          const data = await response.json()
          setNewsData(data)
        }
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <>
      <PageHeader title="English News" />
      {loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>Loading news...</p>
        </div>
      )}

      {!loading && newsData.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No news articles found</p>
        </div>
      ) : (
        <ul>
          {newsData.map((article) => (
            <li key={article.url}>
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default NewsPageContent
