import { Bounds } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type * as THREE from 'three'
import { usePlayerAnimation } from '../../hooks/use-player-animation'
import { setPlayerRef } from '../../stores/player'
import DirectionalLight from '../directional-light'

const Player = () => {
  const player = useRef<THREE.Group | null>(null)
  const light = useRef<THREE.DirectionalLight | null>(null)
  const camera = useThree((state) => state.camera)

  usePlayerAnimation(player)

  useEffect(() => {
    if (!player.current) return
    if (!light.current) return

    player.current.add(camera)
    light.current.target = player.current

    setPlayerRef(player.current)
  }, [camera])

  return (
    <Bounds fit clip observe margin={10}>
      <group ref={player}>
        <group>
          <mesh position={[0, 0, 10]} castShadow receiveShadow>
            <boxGeometry args={[15, 15, 20]} />
            <meshLambertMaterial color={0xffffff} flatShading />
          </mesh>
          <mesh position={[0, 0, 21]} castShadow receiveShadow>
            <boxGeometry args={[2, 4, 2]} />
            <meshLambertMaterial color={0xf0619a} flatShading />
          </mesh>
        </group>
        <DirectionalLight ref={light} />
      </group>
    </Bounds>
  )
}

export default Player
