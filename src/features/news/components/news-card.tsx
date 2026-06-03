'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { NewsArticle } from '../types'

interface NewsCardProps {
  article: NewsArticle
}

const NewsCard = ({ article }: NewsCardProps) => {
  const [imageError, setImageError] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const fallbackLetter = article.title?.trim().charAt(0) || '?'
  const parsedDate = new Date(article.publishedAt)
  const dateTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()

  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-b border-gray-300 dark:border-gray-600 py-4 block"
    >
      <article className="h-full">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 mr-4 bg-gray-200 dark:bg-gray-700 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
            {article.urlToImage && !imageError ? (
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={64}
                height={64}
                className="object-cover w-full h-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <span
                className="text-gray-600 dark:text-gray-200 text-lg font-semibold uppercase"
                aria-hidden
              >
                {fallbackLetter}
              </span>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{article.title}</h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-2">{article.source.name}</span>
              <span className="mr-1">•</span>
              <time dateTime={dateTime}>{formatDate(article.publishedAt)}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default NewsCard
