import { RichHtmlComponent } from '@/type'

type RichListItemProps = RichHtmlComponent

const RichListItem = (props: RichListItemProps) => {
  return <li className="ml-4">{props.children}</li>
}

export default RichListItem
