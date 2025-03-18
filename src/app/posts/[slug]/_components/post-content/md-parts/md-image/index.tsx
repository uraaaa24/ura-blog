type MDImageProps = {
  src?: string
  alt?: string
}

const MDImage = ({ src, alt }: MDImageProps) => {
  return (
    <span className="w-auto flex items-center justify-center h-auto">
      <img className="max-w-full h-auto max-h-96 rounded-lg" src={src || ''} alt={alt || ''} />
    </span>
  )
}

export default MDImage
