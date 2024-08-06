import { RichHtmlComponent } from '@/type'

type RichTableRowProps = RichHtmlComponent

const RichTableRow = (props: RichTableRowProps) => {
  return <tr>{props.children}</tr>
}

export default RichTableRow
