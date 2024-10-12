import { useFrame } from '@react-three/fiber'
import { FC } from 'react'

interface Props {
  moving: boolean
}

const Camera: FC<Props> = ({ moving }) => {
  useFrame((state, delta) => {
    if (!moving) { return }

    const [x, _, z] = state.camera.position
    state.camera.position.set(x, Math.sin(+new Date() / 100) / 7, z - delta * 1.5)
  })

  return (
    <></>
  )
}

export default Camera
