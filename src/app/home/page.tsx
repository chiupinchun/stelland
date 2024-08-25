import { FC } from 'react'
import Cat from '@/assets/models/cat.glb?url'
import Chikun from '@/assets/models/chikun.glb?url'
import Dog from '@/assets/models/dog.glb?url'
import Fish from '@/assets/models/fish.glb?url'
import PrairieDog from '@/assets/models/prairie-dog.glb?url'
import Snake from '@/assets/models/snake.glb?url'
import { RandomMoveUiModel } from '@/app/common/components/r3f/ui-model'
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
          <RandomMoveUiModel src={Fish} position={[-1, 0, 0]} />
          <RandomMoveUiModel src={Cat} position={[0, 0, 0]} />
          <RandomMoveUiModel src={Dog} position={[1, 0, 0]} />
          <RandomMoveUiModel src={Chikun} position={[0, 0, -1]} />
          <RandomMoveUiModel src={PrairieDog} position={[1, 0, -1]} />
          <RandomMoveUiModel src={Snake} position={[-1, 0, -1]} />
        </Scene>
      </div>
    </>
  )
}

export default HomePage
