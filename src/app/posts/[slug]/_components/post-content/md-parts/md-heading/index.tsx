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

export const MDHeading3 = ({ children }: MDHeadingProps) => {
  return <h3 className="relative text-xl font-semibold mt-10 mb-6 w-fit">{children}</h3>
}
