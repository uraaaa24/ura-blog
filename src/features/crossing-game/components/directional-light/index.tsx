import type { RefObject } from 'react'
import type * as THREE from 'three'

type DirectionalLightProps = {
  ref: RefObject<THREE.DirectionalLight | null>
}

const DirectionalLight = ({ ref }: DirectionalLightProps) => {
  return (
    <directionalLight
      ref={ref}
      position={[-100, -100, 200]}
      up={[0, 0, 1]}
      castShadow
      shadow-mapSize={[2048, 2048]}
      shadow-camera-left={-400}
      shadow-camera-right={400}
      shadow-camera-top={400}
      shadow-camera-bottom={-400}
      shadow-camera-near={50}
      shadow-camera-far={400}
    />
  )
}

export default DirectionalLight
