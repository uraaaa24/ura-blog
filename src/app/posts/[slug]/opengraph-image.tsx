import { ImageResponse } from 'next/og'

import { getPostBySlug } from '@/lib/post'

export const alt = 'Uralog - 記事'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type OGP = {
  title: string
  date?: string
  thumb: string // emoji でも URL でもOK
}

const FALLBACK: OGP = {
  title: 'Uralog - 技術ブログ',
  date: '',
  thumb: '📝'
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  const data: OGP = post
    ? {
        title: post.title.slice(0, 20),
        date: post.formattedDate,
        thumb: post.thumbnail || FALLBACK.thumb
      }
    : FALLBACK

  return ogpImage(data)
}

const ogpImage = ({ title, date, thumb }: OGP) =>
  new ImageResponse(
    <div style={styles.root}>
      <div style={styles.row}>
        <div style={styles.thumbWrap}>
          {/* biome-ignore lint/performance/noImgElement: next/og supports only standard img elements */}
          <img src={thumb} width={100} height={100} alt="" style={styles.thumb} />
        </div>

        <div style={styles.text}>
          <h1 style={styles.title}>{title}</h1>
          {date ? <span style={styles.date}>{date}</span> : null}
        </div>
      </div>

      <div style={styles.brand}>Uralog</div>
    </div>,
    size
  )

const styles: Record<string, React.CSSProperties> = {
  root: {
    width: '100%',
    height: '100%',
    padding: '100px 120px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f7f7'
  },
  row: { width: '100%', display: 'flex', alignItems: 'center', gap: 40 },
  thumbWrap: {
    width: 160,
    height: 160,
    borderRadius: 24,
    background: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  thumb: { borderRadius: 128 },
  text: { flex: 1, display: 'flex', flexDirection: 'column', gap: 16 },
  title: { margin: 0, fontSize: 56, fontWeight: 700, color: '#111827', lineHeight: 1.2 },
  date: { fontSize: 24, color: '#6b7280' },
  brand: {
    position: 'absolute',
    right: 120,
    bottom: 60,
    fontSize: 28,
    fontWeight: 600,
    color: '#9ca3af'
  }
}
