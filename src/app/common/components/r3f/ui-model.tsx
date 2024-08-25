import { FC, useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AnimationMixer } from 'three'
import { Coordinate3d } from '@/app/common/types/math'
import { getDirection } from '@/app/common/utils/math'

interface Props {
  src: string
  position?: Coordinate3d
  speed?: number
}

const UiModel: FC<Props> = ({ src, position = [0, 0, 0], speed = 0.15 }) => {
  const model = useLoader(GLTFLoader, src)

  const rawPosition = useRef([...position])

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

    moveTo(position, delta * speed)
  });

  const moveTo = (coordinate: Coordinate3d, delta: number) => {
    const { x: currentX, y: currentY, z: currentZ } = model.scene.position
    const [goalX, goalY, goalZ] = coordinate

    const [offsetX, offsetY, offsetZ] = [
      (goalX - currentX) * delta,
      (goalY - currentY) * delta,
      (goalZ - currentZ) * delta
    ]

    model.scene.position.set(
      Math.abs(goalX - currentX) > delta ? currentX + offsetX : goalX,
      Math.abs(goalY - currentY) > delta ? currentY + offsetY : goalY,
      Math.abs(goalZ - currentZ) > delta ? currentZ + offsetZ : goalZ
    )

    const rawDirection = model.scene.rotation.y
    const direction = getDirection(goalX - currentX, goalZ - currentZ, rawDirection)

    if (direction !== rawDirection) {
      model.scene.rotation.y = direction
    }
  }

  return (
    <>
      <primitive object={model.scene} position={rawPosition.current} />
    </>
  )
}

export default UiModel

export const RandomMoveUiModel: FC<Props> = ({ position: rawPosition = [0, 0, 0], ...otherProps }) => {
  const [position, setPosition] = useState(rawPosition)

  const randomMove = () => {
    const getOffset = () => {
      return -0.5 + Math.random()
    }

    setPosition(([x, y, z]) => [x + getOffset(), y, z + getOffset()])
  }

  useEffect(() => {
    const time = 2000 + Math.random() * 3000
    setTimeout(randomMove, time)
  }, [position])

  return <UiModel {...otherProps} position={position} />
}
