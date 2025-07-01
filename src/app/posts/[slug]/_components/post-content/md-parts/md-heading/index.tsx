import type { ReactNode } from 'react'

type MDHeadingProps = {
  children: ReactNode
}

export const MDHeading2 = ({ children }: MDHeadingProps) => {
  return (
    <h2 className="relative text-2xl font-bold mt-14 mb-10 w-fit" id={String(children)}>
      {children}
    </h2>
  )
}

export const MDHeading1 = ({ children }: MDHeadingProps) => {
  return (
    <h1 className="relative text-4xl font-bold mt-16 mb-12 w-fit" id={String(children)}>
      {children}
    </h1>
  )
}

export const MDHeading3 = ({ children }: MDHeadingProps) => {
  return <h3 className="relative text-xl font-semibold mt-10 mb-6 w-fit">{children}</h3>
}

export const MDHeading4 = ({ children }: MDHeadingProps) => {
  return <h4 className="relative text-lg font-semibold mt-8 mb-4 w-fit">{children}</h4>
}

export const MDHeading5 = ({ children }: MDHeadingProps) => {
  return <h5 className="relative text-base font-semibold mt-6 mb-3 w-fit">{children}</h5>
}

export const MDHeading6 = ({ children }: MDHeadingProps) => {
  return <h6 className="relative text-sm font-semibold mt-4 mb-2 w-fit">{children}</h6>
}
