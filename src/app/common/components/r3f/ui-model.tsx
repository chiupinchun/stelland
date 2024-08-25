import { FC, useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AnimationMixer, Mesh } from 'three'
import { Coordinate2d, Coordinate3d } from '@/app/common/types/math'

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

    const getDirect = (current: number, goal: number) => {
      if (current > goal) {
        return -1
      } else if (current < goal) {
        return 1
      } else {
        return 0
      }
    }

    const [offsetX, offsetY, offsetZ] = [
      getDirect(currentX, goalX) * delta,
      getDirect(currentY, goalY) * delta,
      getDirect(currentZ, goalZ) * delta
    ]

    model.scene.position.set(
      Math.abs(goalX - currentX) > delta ? currentX + offsetX : goalX,
      Math.abs(goalY - currentY) > delta ? currentY + offsetY : goalY,
      Math.abs(goalZ - currentZ) > delta ? currentZ + offsetZ : goalZ
    )
  }

  return (
    <>
      <primitive object={model.scene} position={rawPosition} />
    </>
  )
}

export default UiModel
