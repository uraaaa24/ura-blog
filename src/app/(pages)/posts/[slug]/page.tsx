import Image from 'next/image'
import { notFound } from 'next/navigation'
import Script from 'next/script'

import Breadcrumb from '@/components/layouts/breadcrumb'
import ScrollToTop from '@/components/layouts/scroll-to-top'
import ShareButton from '@/components/ui/share-button'
import { getLocalPosts } from '@/features/posts/api/get-local-posts'
import { getPostBySlug } from '@/features/posts/api/get-post-by-slug'
import { BASE_URL } from '@/lib/envs'
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData
} from '@/lib/structured-data'

import PostContent from '@/features/posts/components/post-content'

import type { Metadata } from 'next'

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

  const canonicalUrl = new URL(`/posts/${post.slug}`, BASE_URL)
  const description = post.excerpt || `${post.title}について書いた記事です。`

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: 'Uralog',
      locale: 'ja_JP',
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: `/posts/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [`/posts/${post.slug}/opengraph-image`]
    }
  }
}

export async function generateStaticParams() {
  const posts = await getLocalPosts()

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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
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

        {/* NOTE: デザイン調整のため一時的に非表示 */}
        {/* {post.toc && post.toc.length > 0 && <TableOfContents items={post.toc} />} */}

        <PostContent content={post.content} />

        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600 flex justify-center items-center gap-4">
          <ShareButton title={post.title} slug={post.slug} />
        </div>
      </article>

      <ScrollToTop />
    </>
  )
}

export default PostPage
