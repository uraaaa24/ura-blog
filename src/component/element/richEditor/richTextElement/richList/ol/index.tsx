import { RichHtmlComponent } from '@/type'

type RichListProps = RichHtmlComponent

const RichOrderList = (props: RichListProps) => {
  return <ol className="list-decimal pl-4 my-2 space-y-2">{props.children}</ol>
}

export default RichOrderList
