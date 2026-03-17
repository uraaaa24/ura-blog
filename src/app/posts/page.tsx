import PostItems from '@/components/posts/post-items'
import { fetchPosts } from '@/lib/data'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。',
  openGraph: {
    title: 'Posts - Uralog',
    description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。',
    type: 'website'
  }
}

const PostsPage = async () => {
  const totalPosts = await fetchPosts()

  return (
    <>
      <div className="flex items-baseline gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Posts</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Articles and technical writings</p>
      </div>
      <PostItems posts={totalPosts} showSearch />
    </>
  )
}

export default PostsPage
