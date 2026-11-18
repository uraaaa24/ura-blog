import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
}

const Section = ({ children }: SectionProps) => {
  return <section className="mb-6 pb-6">{children}</section>
}

export default Section
