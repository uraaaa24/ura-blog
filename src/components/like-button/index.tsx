'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import twemoji from '@twemoji/api'
import Image from 'next/image'

type LikeButtonProps = {
  slug: string
}

const LikeButton = ({ slug }: LikeButtonProps) => {
  const [count, setCount] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pendingCountRef = useRef<number>(0)

  // 絵文字をtwemojiのSVG URLに変換
  const emojiSrc = useMemo(() => {
    const emoji = '💪'
    const parsed = twemoji.parse(emoji, {
      folder: 'svg',
      ext: '.svg'
    })
    const match = parsed.match(/src="([^"]+)"/)
    return match ? match[1] : null
  }, [])

  // カウント数を取得
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`/api/likes/${slug}`)
        const data = await res.json()
        setCount(data.likes)
      } catch (error) {
        console.error('Failed to fetch count:', error)
      }
    }

    fetchCount()
  }, [slug])

  // デバウンス処理付きで応援
  const handleCheer = useCallback(() => {
    // 楽観的更新：即座にカウントを増やす
    setCount((prev) => prev + 1)
    pendingCountRef.current += 1

    // アニメーション
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    // 既存のタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // 600ms後にAPIリクエストを送信
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/likes/${slug}`, { method: 'POST' })
        const data = await res.json()
        setCount(data.likes)
        pendingCountRef.current = 0
      } catch (error) {
        console.error('Failed to cheer:', error)
        // エラー時は楽観的更新を元に戻す
        setCount((prev) => prev - pendingCountRef.current)
        pendingCountRef.current = 0
      }
    }, 600)
  }, [slug])

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <button
      type="button"
      onClick={handleCheer}
      className={`
        group relative inline-flex flex-col items-center gap-1.5 px-4 py-2.5
        bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-lg
        hover:border-gray-400 dark:hover:border-gray-500
        transition-all duration-200
        ${isAnimating ? 'scale-110' : 'scale-100'}
      `}
      aria-label="応援する"
    >
      {emojiSrc && (
        <Image
          src={emojiSrc}
          alt="💪"
          width={32}
          height={32}
          className="select-none transition-transform duration-200 group-hover:scale-110"
          unoptimized
        />
      )}
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{count}</span>
    </button>
  )
}

export default LikeButton
