import Image from 'next/image'

import { mPlusRounded1c700 } from '@/constant/font'

const AuthorBiography = () => {
  return (
    <div className="flex items-center gap-6 py-4">
      <Image src="/my-icon.jpeg" alt="author" width={80} height={80} className="rounded-full" />
      <div>
        <p className={`${mPlusRounded1c700.className} text-[#e30613] text-2xl`}>Ura</p>
        <p className="text-gray-400">
          Software Developer
          <br />
          都内で4年目エンジニアとして勤務しています ⚽️ ☕️
        </p>
      </div>
    </div>
  )
}

export default AuthorBiography
