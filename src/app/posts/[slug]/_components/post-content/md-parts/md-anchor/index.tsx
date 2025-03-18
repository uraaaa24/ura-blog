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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold border-b-2 border-blue-300 hover:border-blue-500 transition-colors mb-6"
      {...props}
    >
      {children}
    </a>
  )
}

export default MDAnchor
