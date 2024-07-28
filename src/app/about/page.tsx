import Image from 'next/image'

import { QUALIFICATIONS, SKILLS } from '@/constant/about'
import { mPlusRounded1c700 } from '@/constant/font'
import { ICON_SIZE } from '@/constant/icon'

export const generateMetadata = () => {
  return {
    title: 'About | Ura Blog',
    icons: [{ rel: 'icon', url: '/my-icon.jpeg' }]
  }
}

const About = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl">
      <div className="flex gap-8 items-center mb-8">
        <Image src="/my-icon.jpeg" alt="author" width={200} height={200} className="rounded-full" />
        <div>
          <p className={`${mPlusRounded1c700.className} text-[#e30613] text-3xl mb-2`}>Ura</p>
          <p className="text-gray-500 text-xl mb-4">
            Software Developer
            <br />
            都内で4年目エンジニアとして勤務しています ⚽️ ☕️
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/uraaaa24"
              target="_blank"
              className="rounded-full p-2 hover:bg-[#d4c2e8] transition-all duration-200"
            >
              <Image src="/icons/github.svg" width={ICON_SIZE.MEDIUM} height={ICON_SIZE.MEDIUM} alt="GitHub" />
            </a>
            <a
              href="https://x.com/__ars____24"
              target="_blank"
              className="rounded-full p-2 hover:bg-[#cccccc] transition-all duration-200"
            >
              <Image src="/icons/x.svg" width={ICON_SIZE.MEDIUM} height={ICON_SIZE.MEDIUM} alt="X" />
            </a>
            <a
              href="https://zenn.dev/uraaaa24"
              target="_blank"
              className="rounded-full p-2 hover:bg-[#cce7ff] transition-all duration-200"
            >
              <Image src="/icons/zenn.svg" width={ICON_SIZE.MEDIUM} height={ICON_SIZE.MEDIUM} alt="Zenn" />
            </a>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">スキルセット</h2>
        <p className="text-gray-700">{SKILLS.join(' , ')}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">資格</h2>
        <ul className="list-none">
          {QUALIFICATIONS.map((qualification, index) => (
            <li key={index} className="text-gray-700 mb-1">
              {qualification}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default About
