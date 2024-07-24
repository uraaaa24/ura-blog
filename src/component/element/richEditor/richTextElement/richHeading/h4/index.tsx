import { RichHtmlComponent } from '@/type'

type RichHeadingProps = RichHtmlComponent

const RichHeading4 = (props: RichHeadingProps) => {
  return (
    <h4 id={props.id} className="text-xl font-semibold mt-6 mb-2">
      {props.children}
    </h4>
  )
}

export default RichHeading4
