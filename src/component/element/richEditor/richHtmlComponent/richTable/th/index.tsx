import { notoSansJP700 } from '@/constant/font'
import { RichHtmlComponent } from '@/type'

type RichTableHeaderProps = RichHtmlComponent

const RichTableHeader = (props: RichTableHeaderProps) => {
  return (
    <th className={`${notoSansJP700.className} border px-4 py-2 bg-slate-300 dark:bg-slate-600 text-left text-sm`}>
      {props.children}
    </th>
  )
}

export default RichTableHeader
