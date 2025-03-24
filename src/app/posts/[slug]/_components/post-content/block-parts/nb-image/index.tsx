type NBImageProps = {
  src?: string
  alt?: string
}

const NBImage = ({ src, alt }: NBImageProps) => {
  return (
    <span className="w-auto flex items-center justify-center h-auto">
      <img className="max-w-full h-auto max-h-96 rounded-xl" src={src || ''} alt={alt || ''} />
    </span>
  )
}

export default NBImage
