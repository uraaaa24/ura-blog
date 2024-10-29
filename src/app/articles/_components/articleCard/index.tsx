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
      <div className="flex h-full flex-col gap-4 rounded-xl bg-[#ffffff] p-10 text-center text-[#333]">
        <h2 className="flex min-h-20 flex-1 items-center justify-center text-xl font-bold">
          <span className="inline-block text-left">{title}</span>
        </h2>
        <p className="text-sm text-[#728d81]">{date}</p>
      </div>
    </Link>
  )
}

export default ArticleCard
