'use client'

import Image from 'next/image'

type ShareButtonProps = {
  title: string
  url: string
}

const ShareButton = ({ title, url }: ShareButtonProps) => {
  const shareText = `${title}\n${url}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-lg bg-black px-4 py-2 text-white transition-opacity duration-200 dark:bg-white dark:text-black"
      aria-label="Share on X"
    >
      <Image src="/x.svg" alt="X" width={24} height={24} className="invert dark:invert-0" />
      <span className="text-sm font-medium">Share</span>
    </a>
  )
}

export default ShareButton
