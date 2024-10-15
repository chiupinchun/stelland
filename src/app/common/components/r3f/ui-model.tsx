import { FC, useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AnimationMixer, Camera, Group } from 'three'
import { Coordinate3d } from '@/app/common/types/math'
import { getDirection } from '@/app/common/utils/math'
import { CAMERA_OFFSET, RANDOM_MOVE_LENGTH } from '@/app/common/constants/ui-model'

interface Props {
  src: string
  position?: Coordinate3d
  focus?: boolean
  speed?: number
}

const UiModel: FC<Props> = ({
  src, position = [0, 0, 0], speed = 0.15, focus
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
      moveTo(state.camera, [
        model.scene.position.x,
        state.camera.position.y,
        model.scene.position.z + CAMERA_OFFSET
      ], delta * 5, false)
    } else {
      moveTo(model.scene, position, delta * speed)
    }
  });

  const moveTo = (
    target: Group | Camera,
    coordinate: Coordinate3d,
    delta: number,
    calcRotation: boolean = true
  ) => {
    const { x: currentX, y: currentY, z: currentZ } = target.position
    const [goalX, goalY, goalZ] = coordinate

    const [offsetX, offsetY, offsetZ] = [
      (goalX - currentX) * delta,
      (goalY - currentY) * delta,
      (goalZ - currentZ) * delta
    ]

    target.position.set(
      Math.abs(goalX - currentX) > Math.abs(offsetX) ? currentX + offsetX : goalX,
      Math.abs(goalY - currentY) > Math.abs(offsetY) ? currentY + offsetY : goalY,
      Math.abs(goalZ - currentZ) > Math.abs(offsetZ) ? currentZ + offsetZ : goalZ
    )

    const rawDirection = target.rotation.y
    const direction = getDirection(goalX - currentX, goalZ - currentZ, rawDirection)

    if (calcRotation && direction !== rawDirection) {
      target.rotation.y = direction
    }
  }

  return (
    <>
      <primitive object={model.scene} position={rawPosition.current} rotation={[0, 0, 0]} />
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
