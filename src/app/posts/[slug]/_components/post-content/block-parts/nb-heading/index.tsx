import type { ReactNode } from 'react'

type NBHeadingProps = {
  children: ReactNode
}

export const NBHeading2 = ({ children }: NBHeadingProps) => {
  return (
    <h2 className="relative text-2xl font-bold mt-14 mb-10 w-fit" id={String(children)}>
      {children}
    </h2>
  )
}

export const NBHeading3 = ({ children }: NBHeadingProps) => {
  return <h3 className="relative text-xl font-semibold mt-10 mb-6 w-fit">{children}</h3>
}
