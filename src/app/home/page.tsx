import { FC, useState } from 'react'
import { RandomMoveUiModel } from '@/app/common/components/r3f/ui-model'
import Scene from '@/app/common/components/r3f/scene'
import Ground from '@/app/common/components/r3f/ground'
import StarNight from '@/app/common/components/r3f/star-night'
import { Sprite, sprites } from '@/app/common/constants/sprites'
import { Coordinate3d } from '@/app/common/types/math'
import Avatars from './components/avatars'
import { CAMERA_OFFSET } from '../common/constants/ui-model'

interface Props { }

const HomePage: FC<Props> = () => {
  const spriteModels = sprites.map((sprite, index) => ({
    ...sprite,
    position: [
      index % 3 - 1,
      0,
      -1 * Math.floor(index / 3)
    ] as Coordinate3d
  }))

  const [selectedSprite, setSelectedSprite] = useState<Sprite | null>(null)

  return (
    <>
      <div className='relative h-screen'>
        <Scene>
          <Ground />
          <StarNight count={100} />
          {spriteModels.map(sprite => (
            <RandomMoveUiModel
              key={sprite.key} src={sprite.model} position={sprite.position}
              focus={selectedSprite?.key === sprite.key}
            />
          ))}
        </Scene>

        <div className='absolute top-0 left-2 flex justify-center items-center py-2 h-full'>
          <Avatars onSelect={setSelectedSprite} />
        </div>
      </div>
    </>
  )
}

export default HomePage
