import { FC } from 'react'
import { Coordinate3d } from '@/app/common/types/math'

interface Props {
  position: Coordinate3d
}

const Star: FC<Props> = ({ position }) => {
  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  )
}

export default Star
