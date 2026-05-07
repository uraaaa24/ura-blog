import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
}

const Section = ({ children }: SectionProps) => {
  return <section className="pb-6 mb-6">{children}</section>
}

export default Section
