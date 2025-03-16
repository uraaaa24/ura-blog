type MDImageProps = {
  src?: string
  alt?: string
}

const MDImage = ({ src, alt }: MDImageProps) => {
  return <img className="max-w-full h-auto" src={src || ''} alt={alt || ''} />
}

export default MDImage
