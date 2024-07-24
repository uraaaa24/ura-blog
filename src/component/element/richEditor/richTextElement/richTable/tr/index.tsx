import { RichHtmlComponent } from '@/type'

type RichTableRowProps = RichHtmlComponent

const RichTableRow = (props: RichTableRowProps) => {
  return <tr className="hover:bg-gray-50">{props.children}</tr>
}

export default RichTableRow
