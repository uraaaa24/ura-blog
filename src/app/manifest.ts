import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Uralog - フロントエンド開発ブログ',
    short_name: 'Uralog',
    description:
      'React、Next.js、TypeScriptを使ったフロントエンド開発の技術記事やプログラミングに関する知識を発信するエンジニアブログです。',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#1a1a1a',
    icons: [
      {
        src: '/ura-icon.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/ura-icon.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
