import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/lib/post'

type PostCardProps = {
  post: Post
}

const PostItem = ({ post }: PostCardProps) => {
  const isExternalPost = post.slug.startsWith('https')
  const href = isExternalPost ? post.slug : `/posts/${post.slug}`
  const fallbackLetter = post.title.trim().charAt(0) || '?'

  const parsedDate = new Date(post.date)
  const dateTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()

  const externalProps = isExternalPost ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Link
      href={href}
      {...externalProps}
      className="border-b border-gray-300 dark:border-gray-600 py-4 block"
    >
      <article className="h-full">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 mr-4 bg-gray-200 dark:bg-gray-700 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
            {post.thumbnail ? (
              <Image src={post.thumbnail} alt={post.title} width={40} height={40} unoptimized />
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{post.title}</h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={dateTime}>{post.formattedDate}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostItem
