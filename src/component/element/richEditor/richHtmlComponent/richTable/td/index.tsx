import { RichHtmlComponent } from '@/type'

type TableDataProps = RichHtmlComponent

const TableData = (props: TableDataProps) => {
  return <td className="border px-4 py-2 text-sm">{props.children}</td>
}

export default TableData
