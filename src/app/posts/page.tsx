import type { Metadata } from 'next'

import { Heading1 } from '@/components/heading'
import PostItems from '@/components/posts/post-items'
import { fetchPosts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Posts - Uralog',
  description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。'
}

const PostsPage = async () => {
  const totalPosts = await fetchPosts()

  return (
    <>
      <Heading1>Posts</Heading1>
      <PostItems posts={totalPosts} showSearch />
    </>
  )
}

export default PostsPage
