import { MicroCMSImage } from 'microcms-js-sdk'
import Image from 'next/image'
import Link from 'next/link'

import { convertDate } from '@/util'

type CardProps = {
  id: string
  title: string
  body: string
  createdAt: string
  eyeCatch?: MicroCMSImage
}

const Card = (props: CardProps) => {
  // NOTE: bodyからHTMLタグを除去
  const bodyText = props.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')

  return (
    <Link href={`/articles/${props.id}`}>
      <div className="bg-white rounded-lg overflow-hidden h-full">
        <div className="relative w-full h-40">
          <Image
            src={props.eyeCatch?.url || '/static/no-image.png'}
            alt={props.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-out transform hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{props.title}</h2>
            <p className="text-sm text-gray-600">{convertDate(props.createdAt)}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{bodyText}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
