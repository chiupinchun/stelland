import { FC, useEffect, useMemo, useState } from 'react'
import OrbMatch from './ui-core'
import BossArea from './components/bossArea'
import { useFetch } from '@/api/core/useFetch'
import { getUserInfo } from '@/api/module/orb-match'
import { sprites } from '@/app/common/configs/sprites'
import { STAGE_COUNT } from '../tunnel/constants/stage'
import { getSpriteByKey, Sprite } from '../core/sprites'
import HpBar from '@/app/common/components/ui/hpBar'
import { Challenger } from '../core/challenger'
import { getWeaponById } from '../core/weapons'

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

  const [challenger, setChallenger] = useState<Challenger>()
  const { data: userConfig } = useFetch(getUserInfo, [])
  useEffect(() => {
    if (!userConfig) { return }

    const challenger = new Challenger(
      userConfig.weapon ? getWeaponById(userConfig.weapon) : null,
      userConfig.blessings
    )
    setChallenger(challenger)
  }, [userConfig])

  return (
    <>
      <div className='relative flex w-screen h-screen'>
        <div className='w-1/2'>
          {sprite && <BossArea model={spriteConfig.model}>
            <div className='absolute top-10 flex justify-center w-full text-slate-300'>
              <div className='w-3/4'>
                <div>Lv.{sprite.level} {sprite.name}</div>
                <HpBar hp={sprite.hp} maxHp={sprite.maxHp} />
              </div>
            </div>
            <div className='absolute bottom-10 lg:bottom-20 flex justify-center w-full text-slate-300'>
              {
                challenger && <div className='w-3/4'>
                  <div className='text-right'>挑戰者</div>
                  <HpBar hp={challenger.hp} maxHp={challenger.maxHp} />
                </div>
              }
            </div>
          </BossArea>}
        </div>
        <div className='absolute right-0 pe-3 h-full min-w-[50%] flex items-center'>
          <OrbMatch />
        </div>
      </div>
    </>
  )
}

export default OrbMatchBattle
