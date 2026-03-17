import twemoji from '@twemoji/api'
import Image from 'next/image'
import Link from 'next/link'

import Section from '@/components/section'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  description: 'お探しのページは存在しないか、移動した可能性があります。',
  robots: {
    index: false,
    follow: true
  }
}

const notFoundMessages = [
  { emoji: '🗺️', text: 'このページは地図にありません' },
  { emoji: '🧭', text: '迷子になってしまいました' },
  { emoji: '🚀', text: 'このページは宇宙の彼方へ...' },
  { emoji: '🎯', text: 'ページが的を外れました' },
  { emoji: '📭', text: 'このページは配達されませんでした' },
  { emoji: '🌊', text: 'ページが波にさらわれました' },
  { emoji: '🎪', text: 'このページは別の公演中です' }
]

const extractImageSrc = (emoji: string) => {
  const parsed = twemoji.parse(emoji, {
    folder: 'svg',
    ext: '.svg'
  })
  const match = parsed.match(/src="([^"]+)"/)
  return match ? match[1] : null
}

export default function NotFound() {
  const randomMessage = notFoundMessages[Math.floor(Math.random() * notFoundMessages.length)]
  const emojiSrc = extractImageSrc(randomMessage.emoji)

  return (
    <Section>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Image
          src={emojiSrc ?? ''}
          alt={randomMessage.emoji}
          width={128}
          height={128}
          className="mb-8"
        />

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">{randomMessage.text}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          お探しのページは存在しないか、移動した可能性があります
        </p>

        <Link
          href="/"
          className="px-4 py-3 text-sm text-gray-100 bg-gray-800 dark:bg-gray-700 rounded-lg transition-colors hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          ホームに戻る
        </Link>
      </div>
    </Section>
  )
}
