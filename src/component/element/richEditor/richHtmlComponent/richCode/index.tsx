import { RichHtmlComponent } from '@/type'

type RichCodeProps = RichHtmlComponent

const RichCode = (props: RichCodeProps) => {
  return <code className="bg-slate-200 rounded-md px-1 py-0.5">{props.children}</code>
}

export default RichCode
