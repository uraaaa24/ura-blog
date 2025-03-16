import Image from 'next/image'

import { SOCIAL_LINKS } from '@/constants/sns'

const SocialLinks = () => {
  return (
    <div className="flex space-x-6">
      {SOCIAL_LINKS.map(({ href, src, alt }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
          <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            className="hover:opacity-75 transition-opacity duration-200"
          />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
