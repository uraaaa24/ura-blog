import Image from 'next/image'
import Link from 'next/link'

import { markPostAsRead } from '../stores/read-posts'
import type { PostSummary } from '../types'
import ReadDogEar from './read-dog-ear'

type PostItemProps = {
  /** 記事の情報 */
  post: PostSummary
  /** 記事の一意なキー */
  postKey: string
  /** 記事が既読かどうか */
  isRead: boolean
}

const PostItem = ({ post, postKey, isRead }: PostItemProps) => {
  const fallbackLetter = post.title?.trim().charAt(0) || '?'

  const parsedDate = new Date(post.publishedAt)
  const dateTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()

  const externalProps =
    post.source === 'zenn' ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <article>
      <Link
        href={post.href}
        {...externalProps}
        className="group/post-item relative block py-4 focus-visible:z-30 focus-visible:outline-none"
        onClick={() => markPostAsRead(postKey)}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 z-10 rounded-sm border-[1.5px] border-transparent group-focus-visible/post-item:border-gray-400"
        />
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 h-px bg-gray-300 dark:bg-gray-600 ${isRead ? 'right-4.5' : 'right-0'}`}
        />
        {isRead && <ReadDogEar />}
        <div className="flex items-start gap-4 px-2">
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
            <h3 className="text-lg font-bold leading-7 text-gray-900 transition-colors group-hover/post-item:text-gray-600 dark:text-gray-100 dark:group-hover/post-item:text-gray-300">
              {post.title}
            </h3>
            {isRead && <span className="sr-only">Read</span>}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PostItem
