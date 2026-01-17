'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

type ShareButtonProps = {
  title: string
  slug: string
}

const ShareButton = ({ title, slug }: ShareButtonProps) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    // クライアントサイドで現在のURLを取得
    const currentUrl = `${window.location.origin}/posts/${slug}`
    setUrl(currentUrl)
  }, [slug])

  // タイトルの後に改行を入れてURLを表示
  const shareText = `${title}\n${url}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity duration-200"
      aria-label="Xでシェア"
    >
      <Image src="/x.svg" alt="X" width={18} height={18} className="invert dark:invert-0" />
      <span className="text-sm font-medium">Share</span>
    </a>
  )
}

export default ShareButton
