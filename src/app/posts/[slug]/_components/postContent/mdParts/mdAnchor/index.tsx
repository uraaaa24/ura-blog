import type { ReactNode } from 'react'

type MDAnchorProps = {
  href?: string
  children: ReactNode
}

const MDAnchor = ({ href, children, ...props }: MDAnchorProps) => {
  const isHeading = href && href.startsWith('#')
  if (isHeading) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} className="text-blue-500 hover:underline transition-colors" {...props}>
      {children}
    </a>
  )
}

export default MDAnchor
