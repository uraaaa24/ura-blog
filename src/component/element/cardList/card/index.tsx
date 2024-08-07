import { MicroCMSImage } from 'microcms-js-sdk'
import Image from 'next/image'
import Link from 'next/link'

import { convertDate } from '@/util'

import CategoryTip from '../../tip/categoryTip'

type CardProps = {
  id: string
  title: string
  createdAt: string
  eyeCatch?: MicroCMSImage
  tags?: {
    id: string
    name: string
  }[]
}

const Card = (props: CardProps) => {
  return (
    <Link href={`/blog/${props.id}`} className="block">
      <div className="relative bg-white overflow-hidden h-64 transition-all duration-300 group">
        <div className="absolute inset-0">
          <Image
            src={props.eyeCatch?.url || '/static/no-image.png'}
            alt={props.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm">{convertDate(props.createdAt)}</p>
          <h2 className="text-2xl group-hover:text-primary transition-colors duration-300">{props.title}</h2>
          {props.tags && (
            <div className="flex gap-1 mt-1">
              {props.tags.map((tag, index) => (
                <CategoryTip key={index} id={tag.id} name={tag.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Card
