import { FC } from 'react'
import PrairieDogGlb from '@/assets/models/prairie-dog.glb?url'
import UiModel from '@/app/common/components/r3f/ui-model'
import Scene from '@/app/common/components/r3f/scene'
import Ground from '@/app/common/components/r3f/ground'
import StarNight from '../common/components/r3f/star-night'

interface Props { }

const HomePage: FC<Props> = () => {

  return (
    <>
      <div className='h-screen'>
        <Scene>
          <Ground />
          <StarNight count={100} />
          <UiModel src={PrairieDogGlb} />
        </Scene>
      </div>
    </>
  )
}

export default HomePage
