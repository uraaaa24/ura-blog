import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/lib/post'

type PostCardProps = {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const isExternalPost = useMemo(() => post.slug.startsWith('https'), [post.slug])
  const href = useMemo(
    () => (isExternalPost ? post.slug : `/posts/${post.slug}`),
    [isExternalPost, post.slug]
  )

  const externalProps = useMemo(
    () => (isExternalPost ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    [isExternalPost]
  )

  return (
    <Link href={href} {...externalProps} className="border-b border-gray-300 py-4 block">
      <article className="h-full">
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 mr-4 bg-gray-200 rounded-2xl flex-shrink-0 flex items-center justify-center">
            <Image
              src={post.thumbnail ?? ''}
              alt={post.title}
              width={40}
              height={40}
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500">
              <time dateTime={post.date}>{post.formattedDate}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
