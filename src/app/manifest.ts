import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ura's notes",
    short_name: 'ura',
    description:
      'uraがReact、Next.js、TypeScriptを中心に、フロントエンド開発や日々の学びを記録する個人ブログです。',
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
