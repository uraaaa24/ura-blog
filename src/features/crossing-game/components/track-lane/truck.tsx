import { useRef } from 'react'
import type * as THREE from 'three'
import { tileSize } from '../../constants'
import { useHitDetection } from '../../hooks/use-hit-detection'
import { useVehicleAnimation } from '../../hooks/use-vehicle-animation'
import Whell from '../whell'

type TruckProps = {
  rowIndex: number
  initialtileIndex: number
  direction: boolean
  speed: number
  color: THREE.ColorRepresentation
}

const Truck = ({ rowIndex, initialtileIndex, direction, speed, color }: TruckProps) => {
  const truck = useRef<THREE.Group>(null)
  useVehicleAnimation(truck, direction, speed)
  useHitDetection(truck, rowIndex)

  return (
    <group
      ref={truck}
      position-x={initialtileIndex * tileSize}
      rotation-z={direction ? 0 : Math.PI}
    >
      <mesh position={[-15, 0, 25]} castShadow receiveShadow>
        <boxGeometry args={[70, 35, 35]} />
        <meshLambertMaterial color={0xb4c6fc} flatShading />
      </mesh>
      <mesh position={[35, 0, 20]} castShadow receiveShadow>
        <boxGeometry args={[30, 30, 30]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <Whell x={-35} />
      <Whell x={5} />
      <Whell x={37} />
    </group>
  )
}

export default Truck
