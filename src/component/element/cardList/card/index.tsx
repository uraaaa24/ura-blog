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
      <div className="bg-white rounded-md overflow-hidden h-96 hover:text-[#e30613] transition-all duration-300">
        <div className="relative w-full h-48">
          <Image
            src={props.eyeCatch?.url || '/static/no-image.png'}
            alt={props.title}
            layout="fill"
            objectFit="cover"
            className="h-auto"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col ">
            <p className="text-sm text-gray-600">{convertDate(props.createdAt)}</p>
            <h2 className="text-2xl">{props.title}</h2>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{bodyText}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
