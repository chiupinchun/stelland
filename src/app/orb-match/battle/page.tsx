import { FC, useMemo } from 'react'
import OrbMatch from './ui-core'
import BossArea from './components/bossArea'
import { useFetch } from '@/api/core/useFetch'
import { getUserInfo } from '@/api/module/orb-match'
import { sprites } from '@/app/common/configs/sprites'

interface Props { }

const OrbMatchBattle: FC<Props> = () => {
  const { data: user } = useFetch(getUserInfo, [])
  const stage = useMemo(() => user?.stage ?? 0, [user])
  const sprite = useMemo(() => sprites[stage % sprites.length], [stage])

  return (
    <>
      <div className='relative flex w-screen h-screen'>
        <div className='w-1/2'>
          <BossArea sprite={sprite} />
        </div>
        <div className='absolute right-0 pe-3 h-full min-w-[50%] flex items-center'>
          <OrbMatch />
        </div>
      </div>
    </>
  )
}

export default OrbMatchBattle
