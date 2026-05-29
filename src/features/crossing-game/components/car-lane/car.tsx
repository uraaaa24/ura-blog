import { useRef } from 'react'
import type * as THREE from 'three'
import { tileSize } from '../../constants'
import { useHitDetection } from '../../hooks/use-hit-detection'
import { useVehicleAnimation } from '../../hooks/use-vehicle-animation'
import Whell from '../whell'

type CarProps = {
  rowIndex: number
  initialtileIndex: number
  direction: boolean
  speed: number
  color: THREE.ColorRepresentation
}

const Car = ({ rowIndex, initialtileIndex, direction, speed, color }: CarProps) => {
  const car = useRef<THREE.Group>(null)
  useVehicleAnimation(car, direction, speed)
  useHitDetection(car, rowIndex)

  return (
    <group ref={car} position-x={initialtileIndex * tileSize} rotation-z={direction ? 0 : Math.PI}>
      <mesh position={[0, 0, 12]} castShadow receiveShadow>
        <boxGeometry args={[60, 30, 15]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <mesh position={[-6, 0, 25.5]} castShadow receiveShadow>
        <boxGeometry args={[33, 24, 12]} />
        <meshLambertMaterial color={0xffffff} flatShading />
      </mesh>
      <Whell x={-18} />
      <Whell x={18} />
    </group>
  )
}

export default Car
