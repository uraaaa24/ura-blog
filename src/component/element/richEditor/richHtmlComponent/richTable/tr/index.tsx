import { RichHtmlComponent } from '@/type'

type RichTableRowProps = RichHtmlComponent

const RichTableRow = (props: RichTableRowProps) => {
  return <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">{props.children}</tr>
}

export default RichTableRow
