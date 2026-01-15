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
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
        padding: '100px 120px',
        position: 'relative'
      }}
    >
      {/* Main Content - Same structure as post-item */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          width: '100%'
        }}
      >
        {/* Thumbnail with rounded background */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            height: '160px',
            backgroundColor: '#e5e7eb',
            borderRadius: '24px',
            flexShrink: 0
          }}
        >
          <img
            width={100}
            height={100}
            src={emoji}
            alt="Post thumbnail"
            style={{
              borderRadius: 128
            }}
          />
        </div>

        {/* Title and Date Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.2,
              margin: 0,
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
                color: '#6b7280',
                fontWeight: 400
              }}
            >
              {date}
            </span>
          )}
        </div>
      </div>

      {/* Site Name */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '120px',
          fontSize: '28px',
          color: '#9ca3af',
          fontWeight: 600
        }}
      >
        Uralog
      </div>
    </div>,
    {
      width: 1200,
      height: 630
    }
  )
}
