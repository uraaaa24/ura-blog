import { ImageResponse } from 'next/og'

import type { NextRequest } from 'next/server'

import { getPostBySlug } from '@/lib/post'

export const runtime = 'nodejs'

const defaultOGPData = {
  title: 'Uralog - 技術ブログ',
  date: '',
  emoji: '📝'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // slugから記事データを取得
  const slug = searchParams.get('slug')

  if (!slug)
    return generateOGPImage(defaultOGPData.title, defaultOGPData.date, defaultOGPData.emoji)

  const post = await getPostBySlug(slug)
  if (!post)
    return generateOGPImage(defaultOGPData.title, defaultOGPData.date, defaultOGPData.emoji)

  return generateOGPImage(
    post.title.slice(0, 20),
    post.formattedDate,
    post.thumbnail || defaultOGPData.emoji
  )
}

const generateOGPImage = (title: string, date: string, emoji: string) => {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
        padding: '80px',
        position: 'relative'
      }}
    >
      {/* メインコンテンツエリア */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '1000px',
          height: '450px',
          border: '1px solid #d1d5db',
          position: 'relative'
        }}
      >
        {/* Thumbnail */}
        <img
          width={80}
          height={80}
          src={emoji}
          alt="Uralog Logo"
          style={{
            borderRadius: 128
          }}
        />
        {/* Title */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#374151',
            textAlign: 'center',
            maxWidth: '100%',
            wordBreak: 'break-word'
          }}
        >
          {title}
        </h1>
        {/* Date */}
        {date && (
          <span
            style={{
              fontSize: '24px',
              color: '#6b7280'
            }}
          >
            {date}
          </span>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '30px',
            fontSize: '24px',
            color: '#9ca3af',
            fontWeight: 500
          }}
        >
          Uralog
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630
    }
  )
}
