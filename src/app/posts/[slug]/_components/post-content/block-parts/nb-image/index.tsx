'use client'

import { useState } from 'react'

import Image from 'next/image'

type NBImageProps = {
  src?: string
  alt?: string
}

const NBImage = ({ src, alt }: NBImageProps) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative flex items-center justify-center w-full h-96 rounded-xl">
      {loading && <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-xl" />}
      {src && (
        <Image
          src={src}
          alt={alt || ''}
          fill
          className={`rounded-xl transition-opacity duration-500 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      )}
    </div>
  )
}

export default NBImage
