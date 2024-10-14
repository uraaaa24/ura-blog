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
      <div className="rounded-sm border border-red-400 p-2">
        {slug}
        {title}
        {date}
      </div>
    </Link>
  )
}

export default PostCard
