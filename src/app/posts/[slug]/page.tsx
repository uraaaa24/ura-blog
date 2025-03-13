import Image from 'next/image'
import { notFound } from 'next/navigation'

import PostContent from '@/components/postContent'
import { getAllPosts, getPostBySlug } from '@/lib/post'

import type { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <header className="border-b border-gray-300 mb-12">
        <div className="flex flex-col items-center gap-8 pb-8">
          <Image src={post.thumbnail ?? ''} alt={post.title} width={64} height={64} />
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-gray-500">
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
