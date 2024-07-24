import { RichHtmlComponent } from '@/type'

type RichParagraphProps = RichHtmlComponent

const RichParagraph = (props: RichParagraphProps) => {
  return <p className="mb-4 leading-relaxed text-gray-800">{props.children}</p>
}

export default RichParagraph
