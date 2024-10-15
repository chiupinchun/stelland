import { FC } from 'react'
import { Sprite, sprites } from '@/app/common/configs/sprites'

interface Props {
  onSelect?: (sprite: Sprite) => void
}

const Avatars: FC<Props> = ({ onSelect }) => {

  return (
    <>
      <div className='flex flex-col justify-between gap-5 md:block p-2 md:p-4 h-full md:h-auto border rounded-full md:space-y-4 bg-slate-700 bg-opacity-25'>
        {sprites.map(sprite => (
          <img onClick={() => onSelect?.(sprite)}
            key={sprite.key} src={sprite.avatar} alt={`${sprite.name}頭像`}
            width={50} height={50} className='md:w-20 rounded-full cursor-pointer' />
        ))}
      </div>
    </>
  )
}

export default Avatars
