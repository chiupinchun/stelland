import { FC } from 'react'

interface Props { }

const Ground: FC<Props> = () => {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[40, 40, 100, 100]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
    </>
  )
}

export default Ground
