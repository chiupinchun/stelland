import { FC } from 'react'
import { RandomMoveUiModel } from '@/app/common/components/r3f/ui-model'
import Scene from '@/app/common/components/r3f/scene'
import Ground from '@/app/common/components/r3f/ground'
import StarNight from '@/app/common/components/r3f/star-night'
import { sprites } from '@/app/common/constants/sprites'
import { Coordinate3d } from '@/app/common/types/math'

interface Props { }

const HomePage: FC<Props> = () => {
  const spriteModels: {
    model: string
    position: Coordinate3d
  }[] = sprites.map((sprite, index) => ({
    model: sprite.model,
    position: [
      index % 3 - 1,
      0,
      -1 * Math.floor(index / 3)
    ]
  }))

  return (
    <>
      <div className='relative h-screen'>
        <Scene>
          <Ground />
          <StarNight count={100} />
          {spriteModels.map(sprite => (
            <RandomMoveUiModel src={sprite.model} position={sprite.position} />
          ))}
        </Scene>
      </div>
    </>
  )
}

export default HomePage
