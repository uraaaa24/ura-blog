import Link from 'next/link'
import React from 'react'

type ArticleCardProps = {
  slug: string
  title: string
  date: string
}

const ArticleCard = ({ slug, title, date }: ArticleCardProps) => {
  return (
    <Link href={`articles/${slug}`}>
      <div className="flex h-full flex-col gap-4 rounded-lg bg-[#233b41] p-10 text-center text-[#FFFFFF]">
        <h2 className="flex min-h-20 flex-1 items-center justify-center text-xl font-bold">
          <span className="inline-block text-left">{title}</span>
        </h2>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </Link>
  )
}

export default ArticleCard
