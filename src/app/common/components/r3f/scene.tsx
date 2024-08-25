import { Canvas } from '@react-three/fiber'
import { FC, useRef } from 'react'
import { CAMERA_OFFSET } from '@/app/common/constants/ui-model'

interface Props {
  children: React.ReactNode
}

const Scene: FC<Props> = ({ children }) => {
  const lightIntensity = useRef(0.7 - 0.5 * Math.abs(new Date().getHours() - 12) / 12)

  return (
    <>
      <Canvas camera={{
        position: [0, 0.5, CAMERA_OFFSET]
      }} style={{ background: '#000000' }}>
        <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
          <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={lightIntensity.current} />
        {children}
      </Canvas>
    </>
  )
}

export default Scene
