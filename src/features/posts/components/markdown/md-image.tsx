type MDImageProps = {
  src?: string | Blob
  alt?: string
}

const MDImage = ({ src, alt }: MDImageProps) => {
  // srcがstring以外またはundefinedの場合の処理
  const imageSrc = typeof src === 'string' ? src : ''

  // 相対パスの場合は/を先頭に追加してpublicディレクトリから配信
  const processedSrc =
    imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('/')
      ? `/${imageSrc}`
      : imageSrc

  return (
    <span className="w-auto flex items-center justify-center h-auto my-6">
      {/* biome-ignore lint/performance/noImgElement: markdown images need to preserve each source image's intrinsic aspect ratio */}
      <img
        className="max-w-full h-auto max-h-96 rounded-xl"
        src={processedSrc || ''}
        alt={alt || ''}
        loading="lazy"
      />
    </span>
  )
}

export default MDImage
