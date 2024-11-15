import Image from 'next/image'
import React from 'react'

type SnsLinkProps = {
  href: string
  icon: string
  alt: string
}

const ICON_SIZE = 24

const SnsLink = ({ href, icon, alt }: SnsLinkProps) => {
  return (
    <a
      className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:invert dark:hover:bg-gray-300"
      href={href}
      target="_blank"
    >
      <Image alt={alt} height={ICON_SIZE} src={icon} width={ICON_SIZE} />
    </a>
  )
}

export default SnsLink
