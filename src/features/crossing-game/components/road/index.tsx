import type { ReactNode } from 'react'
import { tileSize, tilesPerRow } from '../../constants'

type RoadProps = {
  rowIndex: number
  children?: ReactNode
  isDark: boolean
}

const Road = ({ rowIndex, children, isDark }: RoadProps) => {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <planeGeometry args={[tilesPerRow * tileSize, tileSize]} />
        <meshLambertMaterial color={isDark ? 0x202633 : 0x454a59} flatShading />
      </mesh>
      {children}
    </group>
  )
}

export default Road
