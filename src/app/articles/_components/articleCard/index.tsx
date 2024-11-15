import Link from 'next/link'
import React from 'react'

type ArticleCardProps = {
  slug: string
  title: string
  date: string
}

const ArticleCard = ({ slug, title, date }: ArticleCardProps) => {
  return (
    <Link href={`/articles/${slug}`}>
      <div className="flex h-full flex-col gap-4 rounded-xl border-2 border-[#e5e5e5] bg-gray-50  p-8 text-center text-gray-800 shadow-sm transition-colors hover:bg-gray-100 dark:border-[#37464f] dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        <h2 className="flex min-h-20 flex-1 items-center justify-center text-xl font-bold">
          <span className="inline-block text-left">{title}</span>
        </h2>
      </div>
    </Link>
  )
}

export default ArticleCard
