import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '../types'

type PostCardProps = {
  post: Post
}

const PostItem = ({ post }: PostCardProps) => {
  const isExternalPost = post.slug.startsWith('https')
  const href = isExternalPost ? post.slug : `/posts/${post.slug}`
  const fallbackLetter = post.title?.trim().charAt(0) || '?'

  const parsedDate = new Date(post.date)
  const dateTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()

  const externalProps = isExternalPost ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <article>
      <Link href={href} {...externalProps} className="group block py-4">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700">
            {post.thumbnail ? (
              <Image src={post.thumbnail} alt="" width={40} height={40} unoptimized />
            ) : (
              <span className="text-lg font-semibold uppercase text-gray-600 dark:text-gray-200">
                {fallbackLetter}
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={dateTime}>{post.formattedDate}</time>
            </div>
            <h3 className="text-lg font-bold leading-7 text-gray-900 transition-colors group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-300">
              {post.title}
            </h3>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PostItem
