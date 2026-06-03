import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { Post } from '../types'
import PostItems from './post-items'

type LatestPostsProps = {
  totalPosts: Post[]
}

const LatestPosts = ({ totalPosts }: LatestPostsProps) => {
  return (
    <>
      <PostItems posts={totalPosts} />
      <div className="mt-6 flex justify-center">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span>View all</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </>
  )
}

export default LatestPosts
