import Image from 'next/image'

type RichImageProps = {
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

const RichImage = (props: RichImageProps) => {
  return (
    <figure className="mb-4">
      <Image src={props.src} alt={props.alt} width={props.width} height={props.height} />
      <figcaption className="text-sm text-slate-500 text-center">{props.caption}</figcaption>
    </figure>
  )
}

export default RichImage
