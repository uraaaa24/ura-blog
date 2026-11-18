import type { CSSProperties } from 'react'

import { getLocalImageSize } from '../../server/image-size'

// max-h-96 と揃える
const MAX_IMAGE_HEIGHT = 384

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

  const size = processedSrc ? getLocalImageSize(processedSrc) : undefined

  // 読み込み前から表示サイズを確定させ、レイアウトシフトを防ぐ
  const style: CSSProperties | undefined = size
    ? {
        width: `min(100%, ${size.width}px, ${(MAX_IMAGE_HEIGHT * size.width) / size.height}px)`,
        aspectRatio: `${size.width} / ${size.height}`
      }
    : undefined

  return (
    <span className="my-6 flex h-auto w-auto items-center justify-center">
      <img
        className="h-auto max-h-96 max-w-full rounded-xl"
        src={processedSrc || ''}
        alt={alt || ''}
        width={size?.width}
        height={size?.height}
        style={style}
        loading="lazy"
      />
    </span>
  )
}

export default MDImage
