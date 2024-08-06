import { RichHtmlComponent } from '@/type'

type RichTableRowProps = RichHtmlComponent

const RichTableRow = (props: RichTableRowProps) => {
  return <tr className="hover:bg-slate-100 dark:hover:bg-slate-800">{props.children}</tr>
}

export default RichTableRow
