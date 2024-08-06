import Image from 'next/image'

import SNSLink from '@/component/element/button/snsLinkButton'
import Container from '@/component/layout/container'
import { SKILLS } from '@/constant/about'
import { notoSansJP700 } from '@/constant/font'
import { SNS_LINKS_VALUES } from '@/constant/sns'

export const generateMetadata = () => {
  return {
    title: 'About | Ura Blog',
    icons: [{ rel: 'icon', url: '/my-icon.png' }]
  }
}

const About = () => {
  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">About</h1>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-8 items-center mb-8">
          <Image src="/my-icon.png" alt="author" width={200} height={200} className="rounded-full border-2" />
          <div>
            <p className={`${notoSansJP700.className} text-primary text-3xl mb-2`}>Ura</p>
            <p className="text-xl mb-4">
              Software Developer
              <br />
              都内で4年目エンジニアとして勤務しています ⚽️ ☕️
            </p>

            <div className="flex space-x-4">
              {SNS_LINKS_VALUES.map((sns, index) => (
                <SNSLink key={index} sns={sns} />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">スキルセット</h2>
          <p>{SKILLS.join(' , ')}</p>
        </div>
      </div>
    </Container>
  )
}

export default About
