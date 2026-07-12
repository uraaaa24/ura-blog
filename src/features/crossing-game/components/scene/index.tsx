import { Canvas } from '@react-three/fiber'

type SceneProps = {
  children: React.ReactNode
  isDark: boolean
}

const Scene = ({ children, isDark }: SceneProps) => {
  return (
    <Canvas
      orthographic
      shadows="percentage"
      camera={{
        up: [0, 0, 1],
        position: [100, -300, 200]
      }}
    >
      <color attach="background" args={[isDark ? '#111827' : '#d7f7ff']} />
      <ambientLight intensity={isDark ? 0.55 : 1} />
      {children}
    </Canvas>
  )
}

export default Scene
