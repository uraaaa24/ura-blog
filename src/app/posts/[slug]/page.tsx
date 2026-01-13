import Image from 'next/image'
import { notFound } from 'next/navigation'

import PostContent from './_components/post-content'

import type { Metadata } from 'next'

import Breadcrumb from '@/components/breadcrumb'
import { generateOGPMetadata } from '@/lib/ogp'
import { getAllPosts, getPostBySlug } from '@/lib/post'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  // OGP画像を含む完全なメタデータを生成
  return generateOGPMetadata(post)
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug
  }))
}

const PostPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const post = await getPostBySlug(params.slug)

  if (!post) notFound()

  const breadcrumbItems = [{ label: 'Posts', href: '/posts' }, { label: post.title }]

  return (
    <article>
      <Breadcrumb items={breadcrumbItems} />
      <header className="border-b border-gray-300 dark:border-gray-600 mb-12">
        <div className="flex flex-col items-center gap-8 pb-8">
          <Image src={post.thumbnail ?? ''} alt={post.title} width={64} height={64} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
            {post.formattedDate}
          </time>
        </div>
        {/* TODO: 別の場所でタグは表示させる */}
        {/* {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap ml-4 gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )} */}
      </header>

      <PostContent content={post.content} />
    </article>
  )
}

export default PostPage
