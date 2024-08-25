import { FC, useState } from 'react'
import Cat from '@/assets/models/cat.glb?url'
import Chikun from '@/assets/models/chikun.glb?url'
import Dog from '@/assets/models/dog.glb?url'
import Fish from '@/assets/models/fish.glb?url'
import PrairieDogGlb from '@/assets/models/prairie-dog.glb?url'
import Snake from '@/assets/models/snake.glb?url'
import UiModel from '@/app/common/components/r3f/ui-model'
import Scene from '@/app/common/components/r3f/scene'
import Ground from '@/app/common/components/r3f/ground'
import StarNight from '@/app/common/components/r3f/star-night'

interface Props { }

const HomePage: FC<Props> = () => {

  return (
    <>
      <div className='h-screen'>
        <Scene>
          <Ground />
          <StarNight count={100} />
          <UiModel src={Fish} position={[-1, 0, 0]} />
          <UiModel src={Cat} position={[0, 0, 0]} />
          <UiModel src={Dog} position={[1, 0, 0]} />
          <UiModel src={Chikun} position={[0, 0, -1]} />
          <UiModel src={PrairieDogGlb} position={[1, 0, -1]} />
          <UiModel src={Snake} position={[-1, 0, -1]} />
        </Scene>
      </div>
    </>
  )
}

export default HomePage
