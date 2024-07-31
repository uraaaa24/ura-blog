import { ReactNode } from 'react'

type TooltipProps = {
  children: ReactNode
  label: string
  className?: string
}

const Tooltip = (props: TooltipProps) => {
  return (
    <div className={`inline-block group relative opacity-60 hover:opacity-100 ${props.className}`}>
      {props.children}
      <span className="pointer-events-none text-xs md:min-w-max min-w-[80vw] absolute -top-10 rounded bg-primary p-1.5 -translate-x-1/2 left-1/2 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-primary before:content-[''] group-hover:opacity-100 group-hover:pointer-events-auto duration-200">
        {props.label}
      </span>
    </div>
  )
}

export default Tooltip
