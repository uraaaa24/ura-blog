import { Heading1 } from '@/components/heading'
import PostItems from '@/components/posts/post-items'
import { fetchPosts } from '@/lib/data'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts - Uralog',
  description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。'
}

const PostsPage = async () => {
  const totalPosts = await fetchPosts()

  return (
    <>
      <Heading1>Posts</Heading1>
      <PostItems totalPosts={totalPosts} />
    </>
  )
}

export default PostsPage
