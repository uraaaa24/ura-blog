import { RichHtmlComponent } from '@/type'

type RichParagraphProps = RichHtmlComponent

const RichParagraph = (props: RichParagraphProps) => {
  return <p className="mb-4 leading-relaxed">{props.children}</p>
}

export default RichParagraph
