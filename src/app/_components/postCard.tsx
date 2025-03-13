import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/lib/post'

type PostCardProps = {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.slug}`} className="w-full border-b border-gray-300 py-4">
      <article className="block h-full">
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 mr-4 bg-gray-200 rounded-2xl flex-shrink-0 flex items-center justify-center">
            <Image src={post.thumbnail ?? ''} alt={post.title} width={40} height={40} />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <div className="flex flex-wrap items-center text-sm text-gray-500">
              <time dateTime={post.date}>{post.formattedDate}</time>
              {/* {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap ml-4 gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
