import AboutReadMore from './about-read-more'

import { Heading1 } from '@/components/heading'
import SocialLinks from '@/components/social-links'

const HeroContent = () => {
  return (
    <>
      <Heading1>Hi there, I&apos;m Ura! ⚽️</Heading1>
      <div className="flex flex-col space-y-6">
        <p>
          I&apos;m an engineer focusing on front-end development.
          <br />I also have experience in back-end and infrastructure.
          <br />A devoted Arsenal fan who loves playing soccer.
          <br />
          Fueled by a good cup of coffee ☕️
          <br />
        </p>
        <SocialLinks />
        <AboutReadMore />
      </div>
    </>
  )
}

export default HeroContent
