import { RichHtmlComponent } from '@/type'

type RichHeadingProps = RichHtmlComponent

const RichHeading2 = (props: RichHeadingProps) => {
  return (
    <h2 id={props.id} className="text-3xl font-semibold mt-10 mb-6">
      {props.children}
    </h2>
  )
}

export default RichHeading2
