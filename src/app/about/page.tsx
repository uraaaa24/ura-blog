import Image from 'next/image'

import SNSLink from '@/component/element/link/snsLink'
import { SKILLS, SNS_LINKS } from '@/constant/about'
import { mPlusRounded1c700 } from '@/constant/font'

export const generateMetadata = () => {
  return {
    title: 'About | Ura Blog',
    icons: [{ rel: 'icon', url: '/my-icon.png' }]
  }
}

const About = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl">
      <div className="flex gap-8 items-center mb-8">
        <Image src="/my-icon.png" alt="author" width={200} height={200} className="rounded-full" />
        <div>
          <p className={`${mPlusRounded1c700.className} text-[#e30613] text-3xl mb-2`}>Ura</p>
          <p className="text-xl mb-4">
            Software Developer
            <br />
            都内で4年目エンジニアとして勤務しています ⚽️ ☕️
          </p>

          <div className="flex space-x-4">
            <SNSLink sns={SNS_LINKS.Github} />
            <SNSLink sns={SNS_LINKS.X} />
            <SNSLink sns={SNS_LINKS.Zenn} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">スキルセット</h2>
        <p>{SKILLS.join(' , ')}</p>
      </div>
    </div>
  )
}

export default About
