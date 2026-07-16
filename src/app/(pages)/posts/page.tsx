import { getPosts } from '@/features/posts/server/posts'
import PostsPageContent from '@/features/posts/components/posts-page-content'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。',
  openGraph: {
    title: 'Posts - Gana',
    description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。',
    type: 'website'
  }
}

const PostsPage = async () => {
  const totalPosts = await getPosts()

  return <PostsPageContent posts={totalPosts} />
}

export default PostsPage
