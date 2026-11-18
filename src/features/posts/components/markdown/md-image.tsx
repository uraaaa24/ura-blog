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
    <span className="my-6 flex h-auto w-auto items-center justify-center">
      {/* biome-ignore lint/performance/noImgElement: markdown images need to preserve each source image's intrinsic aspect ratio */}
      <img
        className="h-auto max-h-96 max-w-full rounded-xl"
        src={processedSrc || ''}
        alt={alt || ''}
        loading="lazy"
      />
    </span>
  )
}

export default MDImage
