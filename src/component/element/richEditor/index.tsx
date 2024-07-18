import parse, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'

type RichEditorProps = {
  body: string
}

const RichEditor = (props: RichEditorProps) => {
  /**
   * DOMNodeがElementかどうかを判定する
   * @see https://github.com/remarkablemark/html-react-parser/issues/221#issuecomment-784073240
   * 参照日: 2024-07-07
   */
  const isElement = (domNode: DOMNode): domNode is Element => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    const isTag = domNode.type === 'tag'
    const hasAttributes = (domNode as Element).attribs !== undefined

    return isTag && hasAttributes
  }

  /** htmlのタグに応じてReactコンポーネントを返す */
  const options: HTMLReactParserOptions = {
    replace: (domNode): React.ReactElement | undefined => {
      if (isElement(domNode)) {
        const { name, children } = domNode

        switch (name) {
          // TODO: タグに応じたコンポーネントを追加（コンポーネントに切り出す）
          case 'h2':
            return <h2 className="text-3xl font-bold">{domToReact(children as DOMNode[])}</h2>
          case 'h3':
            return <h3 className="text-2xl font-bold">{domToReact(children as DOMNode[])}</h3>
          default:
            return undefined
        }
      }
      return undefined
    }
  }
  return <div className="bg-white w-full rounded-sm">{parse(props.body, options)}</div>
}

export default RichEditor
