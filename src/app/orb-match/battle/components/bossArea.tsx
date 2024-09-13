import Scene from '@/app/common/components/r3f/scene'
import UiModel from '@/app/common/components/r3f/ui-model'
import { Sprite } from '@/app/common/configs/sprites'
import { FC } from 'react'

interface Props {
  sprite: Sprite
}

const BossArea: FC<Props> = ({ sprite }) => {
  return (
    <>
      <Scene cameraPosition={[0, 0.3, 0.6]}>
        <UiModel src={sprite.model} />
      </Scene>
    </>
  )
}

export default BossArea
