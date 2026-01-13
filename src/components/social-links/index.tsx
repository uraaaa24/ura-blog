import { Rss } from 'lucide-react'
import Image from 'next/image'

import { SOCIAL_LINKS } from '@/constants/sns'

const SocialLinks = () => {
  return (
    <div className="flex space-x-6">
      {Object.entries(SOCIAL_LINKS).map(([key, { href, src, alt }]) => {
        const isExternal = !href.startsWith('/')

        return (
          <a
            key={href}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="hover:opacity-75 transition-opacity duration-200"
          >
            {key === 'rss' ? (
              <Rss size={24} className="text-orange-500 dark:text-orange-400" aria-label={alt} />
            ) : (
              <Image
                src={src}
                alt={alt}
                width={24}
                height={24}
                className={key !== 'zenn' ? 'dark:invert' : ''}
              />
            )}
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
