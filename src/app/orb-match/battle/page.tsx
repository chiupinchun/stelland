import { FC } from 'react'
import OrbPuzzle from './components/game'

interface Props { }

const OrbPuzzleBattle: FC<Props> = () => {
  return (
    <>
      <div className='flex w-screen h-screen'>
        <div className='flex-1 text-white'>boss area</div>
        <div className='flex-1 flex items-center'>
          <OrbPuzzle />
        </div>
      </div>
    </>
  )
}

export default OrbPuzzleBattle
