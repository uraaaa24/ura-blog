import Image from 'next/image'

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

  // 外部URLの場合はimgタグを使用（Next.js ImageはremotePatternsの設定が必要）
  const isExternalUrl = processedSrc.startsWith('http')

  if (isExternalUrl) {
    return (
      <span className="w-auto flex items-center justify-center h-auto my-6">
        {/* biome-ignore lint/performance/noImgElement: external URLs are not optimized to avoid remotePatterns config */}
        <img
          className="max-w-full h-auto max-h-96 rounded-xl shadow-sm"
          src={processedSrc || ''}
          alt={alt || ''}
          loading="lazy"
        />
      </span>
    )
  }

  return (
    <span className="w-auto flex items-center justify-center h-auto my-6">
      <Image
        className="max-w-full h-auto max-h-96 rounded-xl shadow-sm"
        src={processedSrc || ''}
        alt={alt || ''}
        width={800}
        height={400}
        loading="lazy"
      />
    </span>
  )
}

export default MDImage
