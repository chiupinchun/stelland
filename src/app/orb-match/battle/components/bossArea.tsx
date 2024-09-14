import Scene from '@/app/common/components/r3f/scene'
import UiModel from '@/app/common/components/r3f/ui-model'
import HpBar from '@/app/common/components/ui/hpBar'
import { FC } from 'react'
import { Sprite } from '@/app/orb-match/core/sprites'

interface Props {
  sprite: Sprite
  model: string
}

const BossArea: FC<Props> = ({ sprite, model }) => {
  return (
    <>
      <div className='relative h-full'>
        <Scene cameraPosition={[0, 0.3, 0.6]}>
          <UiModel src={model} />
        </Scene>
        <div className='absolute top-10 flex justify-center w-full text-slate-300'>
          <div className='w-3/4'>
            <div>Lv.{sprite.level} {sprite.name}</div>
            <HpBar hp={sprite.hp} maxHp={sprite.maxHp} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BossArea
