import type { ReactNode } from 'react'
import { tileSize, tilesPerRow } from '../../constants'

type GrassProps = {
  rowIndex: number
  children?: ReactNode
  isDark: boolean
}

const Grass = ({ rowIndex, children, isDark }: GrassProps) => {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={isDark ? 0x355e3b : 0xbaf455} flatShading />
      </mesh>
      {children}
    </group>
  )
}

export default Grass
