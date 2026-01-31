import { Heading1 } from '@/components/heading'
import SocialLinks from '@/components/social-links'

import AboutReadMore from './about-read-more'

const HeroContent = () => {
  return (
    <>
      <Heading1>Hi, I&apos;m Ura!</Heading1>
      <div className="flex flex-col space-y-6">
        <p className="text-gray-700 dark:text-gray-300">Web engineer who loves building things.</p>
        <SocialLinks />
        <AboutReadMore />
      </div>
    </>
  )
}

export default HeroContent
