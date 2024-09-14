import { FC, useEffect, useMemo, useState } from 'react'
import OrbMatch from './ui-core'
import BossArea from './components/bossArea'
import { useFetch } from '@/api/core/useFetch'
import { getUserInfo } from '@/api/module/orb-match'
import { sprites } from '@/app/common/configs/sprites'
import { STAGE_COUNT } from '../tunnel/constants/stage'
import { getSpriteByKey, Sprite } from '../core/sprites'

interface Props { }

const OrbMatchBattle: FC<Props> = () => {
  const { data: user } = useFetch(getUserInfo, [])
  const stage = useMemo(() => user?.stage ?? 0, [user])
  const spriteConfig = useMemo(
    () => sprites[Math.floor(stage / STAGE_COUNT) % sprites.length],
    [stage]
  )

  const [sprite, setSprite] = useState<Sprite>()
  useEffect(() => {
    setSprite(getSpriteByKey(spriteConfig.key, stage))
  }, [spriteConfig])

  return (
    <>
      <div className='relative flex w-screen h-screen'>
        <div className='w-1/2'>
          {sprite && <BossArea sprite={sprite} model={spriteConfig.model} />}
        </div>
        <div className='absolute right-0 pe-3 h-full min-w-[50%] flex items-center'>
          <OrbMatch />
        </div>
      </div>
    </>
  )
}

export default OrbMatchBattle
