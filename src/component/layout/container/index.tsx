import { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
}

const Container = (props: ContainerProps) => {
  return <div className="max-w-5xl mx-auto">{props.children}</div>
}

export default Container
