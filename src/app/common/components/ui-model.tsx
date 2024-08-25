import { FC } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface Props {
  src: string
}

const UiModel: FC<Props> = ({ src }) => {
  const model = useLoader(GLTFLoader, src)
  console.log(model)
  return (
    <>
      <primitive object={model.scene} />
    </>
  )
}

export default UiModel
