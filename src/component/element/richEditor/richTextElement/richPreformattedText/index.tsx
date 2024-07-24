import { Code } from 'bright'

import { RichHtmlComponent } from '@/type'

type RichPerformedTextProps = RichHtmlComponent & {
  fileName?: string
  language?: string
}

const RichPerformedText = (props: RichPerformedTextProps) => {
  return (
    <Code lang={props.language} title={props.fileName} theme="github-dark-dimmed" lineNumbers className="text-sm">
      {props.children}
    </Code>
  )
}

export default RichPerformedText
