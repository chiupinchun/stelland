import { FC } from 'react'
import { Sprite, sprites } from '@/app/common/constants/sprites'

interface Props {
  onSelect?: (sprite: Sprite) => void
}

const Avatars: FC<Props> = ({ onSelect }) => {

  return (
    <>
      <div className='flex flex-col justify-between lg:block p-2 lg:p-4 h-full lg:h-auto border rounded-full lg:space-y-4 bg-slate-700 bg-opacity-25'>
        {sprites.map(sprite => (
          <img onClick={() => onSelect?.(sprite)}
            key={sprite.key} src={sprite.avatar} alt={`${sprite.name}頭像`}
            width={50} height={50} className='lg:w-20 rounded-full cursor-pointer' />
        ))}
      </div>
    </>
  )
}

export default Avatars
