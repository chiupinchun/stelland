import { FC, useEffect, useRef, useState } from 'react'
import { RootState, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AnimationMixer, Group } from 'three'
import { Coordinate3d } from '@/app/common/types/math'
import { getDirection } from '@/app/common/utils/math'
import { RANDOM_MOVE_LENGTH } from '@/app/common/constants/ui-model'

interface Props {
  src: string
  position?: Coordinate3d
  focus?: boolean
  speed?: number
  onFrame?: (model: Group, state: RootState, delta: number) => void
}

const UiModel: FC<Props> = ({
  src, position = [0, 0, 0], speed = 0.15,
  focus,
  onFrame
}) => {
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

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }

    if (focus === true) {
      model.scene.rotation.y = 0
    } else {
      moveTo(model.scene, position, delta * speed)
    }
    onFrame?.(model.scene, state, delta)
  });

  const moveTo = (target: Group, coordinate: Coordinate3d, delta: number) => {
    const { x: currentX, y: currentY, z: currentZ } = target.position
    const [goalX, goalY, goalZ] = coordinate

    const [offsetX, offsetY, offsetZ] = [
      (goalX - currentX) * delta,
      (goalY - currentY) * delta,
      (goalZ - currentZ) * delta
    ]

    target.position.set(
      Math.abs(goalX - currentX) > delta ? currentX + offsetX : goalX,
      Math.abs(goalY - currentY) > delta ? currentY + offsetY : goalY,
      Math.abs(goalZ - currentZ) > delta ? currentZ + offsetZ : goalZ
    )

    const rawDirection = target.rotation.y
    const direction = getDirection(goalX - currentX, goalZ - currentZ, rawDirection)

    if (direction !== rawDirection) {
      target.rotation.y = direction
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
      return -RANDOM_MOVE_LENGTH + Math.random() * 2 * RANDOM_MOVE_LENGTH
    }

    setPosition(([x, y, z]) => [x + getOffset(), y, z + getOffset()])
  }

  useEffect(() => {
    const time = 2000 + Math.random() * 3000
    setTimeout(randomMove, time)
  }, [position])

  return <UiModel {...otherProps} position={position} />
}
