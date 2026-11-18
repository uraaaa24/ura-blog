import Image from 'next/image'
import Link from 'next/link'

import { SOCIAL_LINKS } from '@/constants/sns'

const HeroContent = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 md:space-y-14">
      <Image
        priority
        src="/ura-icon.png"
        alt="ura's avatar"
        width={120}
        height={120}
        className="rounded-full object-cover"
      />

      <div className="max-w-2xl space-y-6 text-center md:space-y-8">
        <div className="relative inline-block">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            ura&apos;s notes
          </h1>
        </div>

        <div className="space-y-5">
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            web engineer based in Japan
          </p>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-500">
            Front-end focused, building simple and useful things.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-2 md:pt-4">
        <Link
          href={SOCIAL_LINKS.github.href}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 transition-opacity hover:opacity-100 dark:invert"
          aria-label="GitHub"
        >
          <Image src={SOCIAL_LINKS.github.src} alt="GitHub" width={24} height={24} />
        </Link>
        <Link
          href={SOCIAL_LINKS.x.href}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 transition-opacity hover:opacity-100 dark:invert"
          aria-label="X (Twitter)"
        >
          <Image src={SOCIAL_LINKS.x.src} alt="X" width={24} height={24} />
        </Link>
        <Link
          href={SOCIAL_LINKS.zenn.href}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 transition-opacity hover:opacity-100"
          aria-label="Zenn"
        >
          <Image src={SOCIAL_LINKS.zenn.src} alt="Zenn" width={24} height={24} />
        </Link>
      </div>
    </div>
  )
}

export default HeroContent
