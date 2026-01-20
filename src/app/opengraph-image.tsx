import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Uralog - フロントエンド技術ブログ'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
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
        padding: '100px 120px',
        position: 'relative'
      }}
    >
      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          textAlign: 'center'
        }}
      >
        {/* Site Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            height: '160px',
            backgroundColor: '#e5e7eb',
            borderRadius: '24px',
            fontSize: '80px'
          }}
        >
          📝
        </div>

        {/* Site Name */}
        <h1
          style={{
            fontSize: '96px',
            fontWeight: 700,
            color: '#111827',
            lineHeight: 1.2,
            margin: 0
          }}
        >
          Uralog
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '32px',
            color: '#6b7280',
            fontWeight: 400,
            margin: 0,
            maxWidth: '800px'
          }}
        >
          フロントエンド開発の技術記事やプログラミングに関する知識を発信
        </p>
      </div>
    </div>,
    {
      ...size
    }
  )
}
