import { FC, useEffect, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Mesh } from 'three'

interface Props {
  src: string
}

const UiModel: FC<Props> = ({ src }) => {
  const model = useLoader(GLTFLoader, src)
  const modelRef = useRef<React.MutableRefObject<Mesh>>(null!)

  return (
    <>
      <primitive object={model.scene} ref={modelRef} />
    </>
  )
}

export default UiModel
