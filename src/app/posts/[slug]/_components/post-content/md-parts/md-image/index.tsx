type MDImageProps = {
  src?: string | Blob
  alt?: string
}

const MDImage = ({ src, alt }: MDImageProps) => {
  return (
    <span className="w-auto flex items-center justify-center h-auto">
      <img className="max-w-full h-auto max-h-96 rounded-xl" src={src || ''} alt={alt || ''} />
    </span>
  )
}

export default MDImage
