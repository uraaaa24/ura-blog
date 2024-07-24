import { RichHtmlComponent } from '@/type'

type RichTbodyProps = RichHtmlComponent

const RichTableBody = (props: RichTbodyProps) => {
  return <tbody>{props.children}</tbody>
}

export default RichTableBody
