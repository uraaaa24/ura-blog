import type { ReactNode } from 'react'
import { tileSize, tilesPerRow } from '../../constants'

type GrassProps = {
  rowIndex: number
  children?: ReactNode
}

const Grass = ({ rowIndex, children }: GrassProps) => {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={0xbaf455} flatShading />
      </mesh>
      {children}
    </group>
  )
}

export default Grass
