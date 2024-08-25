import { Canvas } from '@react-three/fiber'
import { FC } from 'react'

interface Props {
  children: React.ReactNode
}

const Scene: FC<Props> = ({ children }) => {

  return (
    <>
      <Canvas camera={{
        position: [0, 0.5, 1]
      }}>
        <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
          <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={0.2} />
        {children}
      </Canvas>
    </>
  )
}

export default Scene
