import { Canvas } from '@react-three/fiber'

const Scene = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      orthographic
      shadows="percentage"
      camera={{
        up: [0, 0, 1],
        position: [100, -300, 200]
      }}
    >
      <ambientLight />
      {children}
    </Canvas>
  )
}

export default Scene
