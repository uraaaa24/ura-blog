import Link from 'next/link'
import React from 'react'

type PostCardProps = {
  slug: string
  title: string
  date: string
}

const PostCard = ({ slug, title, date }: PostCardProps) => {
  return (
    <Link href={slug}>
      <div className="flex flex-col h-full gap-4 rounded-lg bg-[#233b41] p-10 text-center text-[#FFFFFF]">
        <h2 className="flex flex-1 items-center justify-center min-h-20 text-lg font-bold">
          <span className="inline-block text-left">{title}</span>
        </h2>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </Link>
  )
}

export default PostCard
