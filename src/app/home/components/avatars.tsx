import { FC } from 'react'
import { sprites } from '@/app/common/constants/sprites'

interface Props { }

const Avatars: FC<Props> = () => {

  return (
    <>
      <div className='flex flex-col justify-between lg:block p-2 lg:p-4 h-full lg:h-auto border rounded-full lg:space-y-4'>
        {sprites.map(sprite => (
          <img key={sprite.key} src={sprite.avatar} alt={`${sprite.name}頭像`}
            width={50} height={50} className='rounded-full lg:w-20' />
        ))}
      </div>
    </>
  )
}

export default Avatars
