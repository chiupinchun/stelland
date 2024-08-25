import { Canvas } from '@react-three/fiber'
import { FC } from 'react'
import PrairieDogGlb from '@/assets/models/prairie-dog.glb?url'
import UiModel from '@/app/common/components/ui-model'

interface Props { }

const HomePage: FC<Props> = () => {

  return (
    <>
      <Canvas>
        <UiModel src={PrairieDogGlb} />
      </Canvas>
    </>
  )
}

export default HomePage
