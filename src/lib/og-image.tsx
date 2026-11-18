import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630
}

export const OG_IMAGE_CONTENT_TYPE = 'image/png'

const SITE_NAME = "ura's notes"
const SITE_TAGLINE = 'web engineer based in Japan'
const FONT_FAMILY = 'Zen Kaku Gothic New'

type FontWeight = 500 | 700

/**
 * Google Fonts から、描画する文字だけを含むサブセットを取得する。
 * 取得できなかった場合は next/og の既定フォントで描画する。
 */
const loadGoogleFont = async (weight: FontWeight, text: string) => {
  try {
    const params = new URLSearchParams({
      family: `${FONT_FAMILY}:wght@${weight}`,
      text
    })
    const css = await (await fetch(`https://fonts.googleapis.com/css2?${params}`)).text()
    const fontUrl = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
    if (!fontUrl) return null

    const response = await fetch(fontUrl)
    if (!response.ok) return null

    return {
      name: FONT_FAMILY,
      data: await response.arrayBuffer(),
      weight,
      style: 'normal' as const
    }
  } catch {
    return null
  }
}

const loadAvatar = async () => {
  const avatar = await readFile(path.join(process.cwd(), 'public/ura-icon.png'))
  return `data:image/png;base64,${avatar.toString('base64')}`
}

type OgImageOptions = {
  /** 記事タイトル。省略するとサイト全体の画像になる */
  title?: string
}

/**
 * アバター・見出し・補足を中央に積んだOGP画像を生成する。
 * 記事ではタイトルを見出しに、サイト全体ではブログ名を見出しにする。
 */
export const createOgImage = async ({ title }: OgImageOptions = {}) => {
  const heading = title ?? SITE_NAME
  const caption = title ? SITE_NAME : SITE_TAGLINE

  const [avatar, ...fonts] = await Promise.all([
    loadAvatar(),
    loadGoogleFont(500, caption),
    loadGoogleFont(700, heading)
  ])

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
        padding: '0 120px',
        background: '#f7f7f7',
        color: '#111827',
        fontFamily: FONT_FAMILY,
        textAlign: 'center'
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img elements */}
      <img src={avatar} alt="" width={120} height={120} style={{ borderRadius: 9999 }} />
      <div
        style={{
          fontSize: title ? 64 : 88,
          fontWeight: 700,
          lineHeight: title ? 1.4 : 1,
          letterSpacing: title ? '-0.01em' : '-0.03em'
        }}
      >
        {heading}
      </div>
      <div style={{ fontSize: 26, fontWeight: 500, color: '#6b7280' }}>{caption}</div>
    </div>,
    {
      ...OG_IMAGE_SIZE,
      fonts: fonts.filter((font) => font !== null)
    }
  )
}
