import { mPlusRounded1c700 } from '@/constant/font'
import { RichHtmlComponent } from '@/type'

type RichTableHeaderProps = RichHtmlComponent

const RichTableHeader = (props: RichTableHeaderProps) => {
  return (
    <th className={`${mPlusRounded1c700.className} border px-4 py-2 bg-slate-200 dark:bg-slate-700 text-left text-sm`}>
      {props.children}
    </th>
  )
}

export default RichTableHeader
