import { RichHtmlComponent } from '@/type'

type RichEmphasisProps = RichHtmlComponent

const RichEmphasis = (props: RichEmphasisProps) => {
  return <em>{props.children}</em>
}

export default RichEmphasis
