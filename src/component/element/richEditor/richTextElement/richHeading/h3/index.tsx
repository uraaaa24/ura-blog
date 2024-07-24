import { RichHtmlComponent } from '@/type'

type RichHeadingProps = RichHtmlComponent

const RichHeading3 = (props: RichHeadingProps) => {
  return (
    <h3 id={props.id} className="text-2xl font-semibold mt-8 mb-4">
      {props.children}
    </h3>
  )
}

export default RichHeading3
