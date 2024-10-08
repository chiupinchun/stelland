import { FC } from 'react'
import OrbMatch from './ui-core'

interface Props { }

const OrbMatchBattle: FC<Props> = () => {
  return (
    <>
      <div className='flex w-screen h-screen'>
        <div className='flex-1 text-white'>boss area</div>
        <div className='flex-1 flex items-center'>
          <OrbMatch />
        </div>
      </div>
    </>
  )
}

export default OrbMatchBattle
