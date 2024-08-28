import { FC } from 'react'
import OrbMatch from './components/game'

interface Props { }

const OrbMatchBattle: FC<Props> = () => {
  return (
    <>
      <div className='flex w-screen h-screen'>
        <div className='flex-1 text-white'>boss area</div>
        <div className='flex-1 flex items-center'>
          <OrbMatch ready={true} />
        </div>
      </div>
    </>
  )
}

export default OrbMatchBattle
