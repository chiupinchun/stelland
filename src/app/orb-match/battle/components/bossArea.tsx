import Scene from '@/app/common/components/r3f/scene'
import UiModel from '@/app/common/components/r3f/ui-model'
import HpBar from '@/app/common/components/ui/hpBar'
import { Sprite } from '@/app/common/configs/sprites'
import { FC } from 'react'

interface Props {
  sprite: Sprite
}

const BossArea: FC<Props> = ({ sprite }) => {
  return (
    <>
      <div className='relative h-full'>
        <Scene cameraPosition={[0, 0.3, 0.6]}>
          <UiModel src={sprite.model} />
        </Scene>
        <div className='absolute top-10 flex justify-center w-full'>
          <HpBar hp={50} maxHp={100} className='w-3/4' />
        </div>
      </div>
    </>
  )
}

export default BossArea
