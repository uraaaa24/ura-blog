import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import type * as THREE from 'three'
import { maxtileIndex, mintileIndex, tileSize } from '../constants'

export const useVehicleAnimation = (
  ref: RefObject<THREE.Group | null>,
  direction: boolean,
  speed: number
) => {
  useFrame((_, delta) => {
    if (!ref.current) return
    const vehicle = ref.current

    const beginingOfRow = (mintileIndex - 2) * tileSize
    const endOfRow = (maxtileIndex + 2) * tileSize

    if (direction) {
      vehicle.position.x =
        vehicle.position.x > endOfRow ? beginingOfRow : vehicle.position.x + speed * delta
    } else {
      vehicle.position.x =
        vehicle.position.x < beginingOfRow ? endOfRow : vehicle.position.x - speed * delta
    }
  })
}
