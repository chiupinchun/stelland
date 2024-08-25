import { FC } from 'react'
import PrairieDogGlb from '@/assets/models/prairie-dog.glb?url'
import UiModel from '@/app/common/components/ui-model'
import Scene from '../common/components/scene'

interface Props { }

const HomePage: FC<Props> = () => {

  return (
    <>
      <div className='h-screen'>
        <Scene>
          <UiModel src={PrairieDogGlb} />
        </Scene>
      </div>
    </>
  )
}

export default HomePage
