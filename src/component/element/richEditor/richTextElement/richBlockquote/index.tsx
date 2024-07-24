import { RichHtmlComponent } from '@/type'

type RichBlockquoteProps = RichHtmlComponent

const RichBlockquote = (props: RichBlockquoteProps) => {
  return <blockquote className="border-l-4 border-gray-300 pl-4 my-4">{props.children}</blockquote>
}

export default RichBlockquote
