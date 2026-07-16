import { ImageResponse } from 'next/og'

import { getPostBySlug } from '@/features/posts/server/posts'

export const runtime = 'nodejs'

export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default async function OpenGraphImage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)

  const title = post?.title ?? 'Gana'
  const date = post?.formattedDate

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 72,
        background: '#0b1220',
        color: '#ffffff'
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
      {date ? <div style={{ marginTop: 24, fontSize: 22, opacity: 0.8 }}>{date}</div> : null}
      <div style={{ marginTop: 44, fontSize: 20, opacity: 0.7 }}>Gana</div>
    </div>,
    {
      ...size
    }
  )
}
