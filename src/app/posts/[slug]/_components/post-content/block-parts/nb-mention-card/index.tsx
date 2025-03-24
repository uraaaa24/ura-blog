'use client'

import { useState } from 'react'

type MentionCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mention: any
  index: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fallback: any
}

const NBMentionCard = ({ mention, index, fallback }: MentionCardProps) => {
  const link = mention.link_mention
  const [thumbLoading, setThumbLoading] = useState(true)

  if (!link) return fallback

  return (
    <a
      key={index}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-gray-300 rounded-xl transition-colors duration-200 overflow-hidden relative mb-4"
    >
      <div className="flex flex-row">
        {link.thumbnail_url && (
          <div className="relative w-2/5 h-32 flex-shrink-0 hidden sm:block">
            {thumbLoading && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-tl-xl rounded-bl-xl" />
            )}
            <img
              ref={(node) => {
                // 画像がキャッシュ済みの場合、onLoad が発火しないケースに対応
                if (node && node.complete && thumbLoading) {
                  setThumbLoading(false)
                }
              }}
              src={link.thumbnail_url}
              alt={link.title}
              crossOrigin="anonymous"
              onLoad={() => setThumbLoading(false)}
              style={{ opacity: thumbLoading ? 0 : 1, transition: 'opacity 0.5s' }}
              className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
            />
          </div>
        )}
        <div
          className={`p-4 flex flex-col justify-between ${
            link.thumbnail_url ? 'w-full sm:w-3/5' : 'w-full'
          }`}
        >
          <div>
            <div className="text-lg font-semibold line-clamp-1 mb-1">{link.title}</div>
            <div className="text-sm text-gray-600 line-clamp-1 whitespace-pre-wrap mb-4">
              {link.description}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            {link.icon_url && (
              <img
                src={link.icon_url}
                width={16}
                height={16}
                alt={link.link_provider || 'icon'}
                className="rounded-full"
              />
            )}
            <div className="text-xs text-gray-400 line-clamp-1">{link.href}</div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default NBMentionCard
