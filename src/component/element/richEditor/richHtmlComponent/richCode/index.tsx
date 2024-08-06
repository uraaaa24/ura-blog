import { RichHtmlComponent } from '@/type'

type RichCodeProps = RichHtmlComponent

const RichCode = (props: RichCodeProps) => {
  return <code className="text-primary bg-slate-200 dark:bg-slate-700 rounded-md px-1 py-0.5">{props.children}</code>
}

export default RichCode
