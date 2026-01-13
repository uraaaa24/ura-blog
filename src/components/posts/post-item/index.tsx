import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/lib/post'

type PostCardProps = {
  post: Post
}

const PostItem = ({ post }: PostCardProps) => {
  const isExternalPost = post.slug.startsWith('https')
  const href = isExternalPost ? post.slug : `/posts/${post.slug}`

  const externalProps = isExternalPost ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Link
      href={href}
      {...externalProps}
      className="border-b border-gray-300 dark:border-gray-600 py-4 block hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors duration-200"
    >
      <article className="h-full">
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 mr-4 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src={post.thumbnail ?? ''}
              alt={`${post.title}'s thumbnail`}
              width={50}
              height={50}
              unoptimized
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{post.title}</h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>{post.formattedDate}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostItem
