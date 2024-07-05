import { MicroCMSImage } from 'microcms-js-sdk'
import Image from 'next/image'
import Link from 'next/link'

import { convertDate } from '@/utils'

type CardProps = {
  id: string
  title: string
  createdAt: string
  eyeCatch?: MicroCMSImage
}

const Card = (props: CardProps) => {
  return (
    <Link href={`/articles/${props.id}`}>
      <div className="border-2 rounded-lg overflow-hidden">
        <div className="relative w-full h-40">
          <Image
            src={props.eyeCatch?.url || '/static/no-image.png'}
            alt={props.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl">{props.title}</h2>
          <p>{convertDate(props.createdAt)}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
