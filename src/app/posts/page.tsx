import { fetchPosts } from '@/lib/data'

import PostsPageContent from './_components/posts-page-content'

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

  return <PostsPageContent posts={totalPosts} />
}

export default PostsPage
