import Image from 'next/image'

import { ICON_SIZE } from '@/constant/icon'

import Tooltip from '../../tooptip'

type SNSLinkProps = {
  sns: {
    name: string
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
    <Tooltip
      label={props.sns.name}
      className={`rounded-full p-2 hover:bg-[${props.sns.color?.dark}] dark:hover:bg-[${props.sns.color?.dark}] transition-all duration-200`}
    >
      <a
        href={props.sns.href}
        target="_blank"
        // className={`rounded-full p-2 hover:bg-[${props.sns.color?.dark}] dark:hover:bg-[${props.sns.color?.dark}] transition-all duration-200`}
      >
        <Image
          src={props.sns.iconSrc}
          width={ICON_SIZE.MEDIUM}
          height={ICON_SIZE.MEDIUM}
          alt={props.sns.alt}
          className="invert"
        />
      </a>
    </Tooltip>
  )
}

export default SNSLink
