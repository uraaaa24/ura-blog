import Image from 'next/image'
import React from 'react'

import { SNS_LIST } from '@/constants/sns'

import SnsLink from './_components/snsLink'

const AboutPage = () => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border-2 border-[#e5e5e5] bg-gray-50 p-8 text-center text-gray-800 shadow-sm transition-colors dark:border-[#37464f] dark:bg-gray-800 dark:text-gray-200">
      <div className="flex h-full items-center">
        <div className="flex w-3/5 flex-col items-center">
          <h1 className="text-3xl font-bold">Ura</h1>
          <p className="mt-4">uraのアウトプット記録です。</p>
          <div className="mt-4 flex gap-2">
            {SNS_LIST.map((sns) => (
              <SnsLink key={sns.href} {...sns} />
            ))}
          </div>
        </div>
        <div className="flex w-2/5 justify-center">
          <Image alt="ura" className="rounded-full" height={300} src="/my-icon.jpg" width={300} />
        </div>
      </div>
    </div>
  )
}

export default AboutPage
