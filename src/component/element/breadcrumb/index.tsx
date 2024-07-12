type BreadcrumbProps = {
  words: string[]
}

const Breadcrumb = (props: BreadcrumbProps) => {
  return (
    // textは上下中央寄せ
    <div className="text-center">
      {props.words.map((word) => {
        return (
          <span key={word} className="text-sm border-b border-gray-300 pb-2">
            {word}
          </span>
        )
      })}
    </div>
  )
}

export default Breadcrumb
