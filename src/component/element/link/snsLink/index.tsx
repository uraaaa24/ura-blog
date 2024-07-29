import Image from 'next/image'

import { ICON_SIZE } from '@/constant/icon'

type SNSLinkProps = {
  sns: {
    href: string
    iconSrc: string
    alt: string
    color: {
      light: string
      dark: string
    }
  }
}

const SNSLink = (props: SNSLinkProps) => {
  return (
    <a
      href={props.sns.href}
      target="_blank"
      className={`rounded-full p-2 hover:bg-[${props.sns.color?.dark}] dark:hover:bg-[${props.sns.color?.dark}] transition-all duration-200`}
    >
      <Image
        src={props.sns.iconSrc}
        width={ICON_SIZE.MEDIUM}
        height={ICON_SIZE.MEDIUM}
        alt={props.sns.alt}
        className="invert"
      />
    </a>
  )
}

export default SNSLink
