import Image from 'next/image'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import PostContent from './_components/post-content'

import type { Metadata } from 'next'

import Breadcrumb from '@/components/breadcrumb'
import ScrollToTop from '@/components/scroll-to-top'
import TableOfContents from '@/components/table-of-contents'
import { generateOGPMetadata } from '@/lib/ogp'
import { getAllPosts, getPostBySlug } from '@/lib/post'
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData
} from '@/lib/structured-data'

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

  const parsedDate = new Date(post.date)
  const dateTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString()

  // 構造化データを生成
  const articleStructuredData = generateArticleStructuredData(post)
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbItems)

  return (
    <>
      {/* 構造化データ (JSON-LD) */}
      <Script id="article-structured-data" type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </Script>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </Script>

      <article>
        <Breadcrumb items={breadcrumbItems} />
        <header className="border-b border-gray-300 dark:border-gray-600 mb-12">
          <div className="flex flex-col items-center gap-8 pb-8">
            <Image
              src={post.thumbnail ?? ''}
              alt={`${post.title}の記事サムネイル`}
              width={64}
              height={64}
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={dateTime}>{post.formattedDate}</time>
            </div>
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

        {post.toc && post.toc.length > 0 && <TableOfContents items={post.toc} />}

        <PostContent content={post.content} />
      </article>

      <ScrollToTop />
    </>
  )
}

export default PostPage
