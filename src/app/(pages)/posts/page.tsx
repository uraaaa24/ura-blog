import { getPosts } from '@/features/posts/server/posts'
import PostsPageContent from '@/features/posts/components/posts-page-content'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。',
  alternates: { canonical: '/posts' },
  openGraph: {
    title: "Posts | ura's notes",
    description: 'フロントエンド開発やプログラミングに関する記事をまとめたブログ一覧。',
    url: '/posts',
    images: ['/opengraph-image'],
    type: 'website'
  }
}

const PostsPage = async () => {
  const totalPosts = await getPosts()

  return <PostsPageContent posts={totalPosts} />
}

export default PostsPage
