import { FC, useEffect, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Mesh } from 'three'
import { Coordinate3d } from '@/app/common/types/math'

interface Props {
  src: string
  rawPosition?: Coordinate3d
}

const UiModel: FC<Props> = ({ src, rawPosition = [0, 0, 0] }) => {
  const model = useLoader(GLTFLoader, src)
  const modelRef = useRef<React.MutableRefObject<Mesh>>(null!)

  return (
    <>
      <primitive object={model.scene} ref={modelRef} position={rawPosition} />
    </>
  )
}

export default UiModel
