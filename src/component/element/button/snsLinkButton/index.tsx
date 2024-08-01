import Image from 'next/image'

import { ICON_SIZE } from '@/constant/icon'

import Tooltip from '../../tooptip'

type SNSLinkProps = {
  sns: {
    name: string
    href: string
    iconSrc: string
    alt: string
  }
}

const SNSLinkButton = (props: SNSLinkProps) => {
  return (
    <Tooltip label={props.sns.name} className={`rounded-full p-2 transition-all duration-200`}>
      <a href={props.sns.href} target="_blank">
        <Image
          src={props.sns.iconSrc}
          width={ICON_SIZE.MEDIUM}
          height={ICON_SIZE.MEDIUM}
          alt={props.sns.alt}
          className="dark:invert"
        />
      </a>
    </Tooltip>
  )
}

export default SNSLinkButton
