import { RichHtmlComponent } from '@/type'

type RichCodeProps = RichHtmlComponent

const RichCode = (props: RichCodeProps) => {
  return <code className="text-[#e30613] bg-gray-200 dark:bg-gray-600 rounded-md px-1 py-0.5">{props.children}</code>
}

export default RichCode
