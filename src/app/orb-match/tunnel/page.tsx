import React, { useEffect, useMemo, useState } from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';
import Camera from './components/camera';
import { Link } from 'react-router-dom';
import { createUser, getUserInfo, UserInfoResponse } from '@/api/module/orb-match';
import { Event, legendEvents, normalEvents, rareEvents } from '../core/events';
import { getRandomInt } from '@/app/common/utils/math';
import { LEGEND_EVENT_RATE, RARE_EVENT_RATE } from './constants/rate';

const WALK_DURATION = 2000
const STAGE_COUNT = 3

const TunnelPage: React.FC = () => {
  const [isWalking, setIsWalking] = useState(false)
  const [stage, setStage] = useState(0)
  const [user, setUser] = useState<UserInfoResponse>({
    weapon: null,
    blessings: [],
    items: []
  })

  const nextStage = () => {
    setIsWalking(true)
    setStage(stage + 1)

    setTimeout(() => {
      setIsWalking(false)
    }, WALK_DURATION)
  }

  const events = useMemo(() => {
    const pickupEvents: Event[] = []

    const _normalEvents = [...normalEvents]
    const _rareEvents = [...rareEvents]
    const _legentEvents = [...legendEvents]

    const spliceEvent = (events: Event[]) => {
      const [event] = events.splice(getRandomInt(0, events.length), 1)
      return event
    }

    const pickEvent = () => {
      let random = Math.random()
      if (random < LEGEND_EVENT_RATE) { return spliceEvent(_legentEvents) }
      if (random - LEGEND_EVENT_RATE < RARE_EVENT_RATE) { return spliceEvent(_rareEvents) }
      return spliceEvent(_normalEvents)
    }

    const isBonus = stage % 3 === 2
    if (isBonus) {
      const legendEvent = spliceEvent(_legentEvents)
      events.push(legendEvent)
    }

    while (pickupEvents.length < 3) {
      const event = pickEvent()
      pickupEvents.push(event)
    }

    return pickupEvents
  }, [stage])

  const handleSelectBonus = (event: Event) => {
    console.log(event)
    nextStage()
  }

  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo) {
      setUser(userInfo)
    } else {
      createUser(user)
    }
  }, [])

  return (
    <div className="h-screen">
      <Scene>
        {/* 環境光 */}
        <ambientLight intensity={0.5} />

        {/* 點光源 */}
        <pointLight position={[0, 0, 0]} intensity={2} distance={50} decay={2} />
        <pointLight position={[0, 0, -50]} intensity={2} distance={50} decay={2} />

        {/* 方向光 */}
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={1} />

        <Camera moving={isWalking} />

        <Tunnel />
      </Scene>

      <div className={
        'fixed top-0 w-screen h-screen flex justify-center items-center ' + (
          !isWalking && (stage === 0 || stage === STAGE_COUNT) ? 'bg-slate-900 bg-opacity-75' : ''
        )
      }>
        {stage === 0 && <button onClick={nextStage} className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'>開始試煉</button>}
        {stage > 0 && stage < STAGE_COUNT && !isWalking ? <div className='flex gap-40'>
          {events.map((event) => (
            <div onClick={() => handleSelectBonus(event)} className='w-48 h-96 bg-slate-300 rounded-xl cursor-pointer' key={event.id}>
              祝福 {event.name}
            </div>
          ))}
        </div> : null}
        {stage >= STAGE_COUNT && !isWalking ? <Link to='/orb-match/battle' className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'>
          謁見星靈
        </Link> : null}
      </div>
    </div>
  );
};

export default TunnelPage;
