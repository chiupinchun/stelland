import { FC, useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AnimationMixer, Mesh } from 'three'
import { Coordinate3d } from '@/app/common/types/math'

interface Props {
  src: string
  rawPosition?: Coordinate3d
}

const UiModel: FC<Props> = ({ src, rawPosition = [0, 0, 0] }) => {
  const model = useLoader(GLTFLoader, src)

  const mixer = useRef<AnimationMixer | null>(null)

  useEffect(() => {
    mixer.current = new AnimationMixer(model.scene);

    model.animations.forEach(animation => {
      const action = mixer.current?.clipAction(animation)
      action?.play()
    })
  }, [])

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <>
      <primitive object={model.scene} position={rawPosition} />
    </>
  )
}

export default UiModel
