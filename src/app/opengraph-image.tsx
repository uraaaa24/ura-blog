import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
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
      <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>Uralog</div>
      <div style={{ marginTop: 20, fontSize: 28, opacity: 0.9 }}>Web開発の学びをまとめるブログ</div>
      <div style={{ marginTop: 44, fontSize: 20, opacity: 0.7 }}>uraaaa24</div>
    </div>,
    {
      ...size
    }
  )
}
