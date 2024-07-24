import { RichHtmlComponent } from '@/type'

type RichListProps = RichHtmlComponent

const RichUnorderedList = (props: RichListProps) => {
  return <ul className="list-disc pl-4 my-2 space-y-2">{props.children}</ul>
}

export default RichUnorderedList
