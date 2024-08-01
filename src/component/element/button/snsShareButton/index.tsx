import Image from 'next/image'

import Tooltip from '../../tooptip'

const SNSShareIconSize = 32

type SNSButtonProps = {
  icon: string
  alt: string
  url: string
  description: string
}

const SNSShareButton = (props: SNSButtonProps) => {
  return (
    <Tooltip label={props.description}>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <Image
          src={props.icon}
          alt={props.alt}
          width={SNSShareIconSize}
          height={SNSShareIconSize}
          className="dark:invert"
        />
      </a>
    </Tooltip>
  )
}

export default SNSShareButton
