import { tileSize } from '../../constants'

type TreeProps = {
  tileIndex: number
  height: number
  isDark: boolean
}

const Tree = ({ tileIndex, height, isDark }: TreeProps) => {
  return (
    <group position-x={tileIndex * tileSize}>
      <mesh position-z={height / 2 + 20} castShadow receiveShadow>
        <boxGeometry args={[30, 30, height]} />
        <meshLambertMaterial color={isDark ? 0x3f7a2f : 0x7aa21d} flatShading />
      </mesh>
      <mesh position-z={10} castShadow receiveShadow>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color={isDark ? 0x2f1f1d : 0x4d2926} flatShading />
      </mesh>
    </group>
  )
}

export default Tree
