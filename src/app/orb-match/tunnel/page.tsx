import React, { useState } from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';
import Camera from './components/camera';
import { Link } from 'react-router-dom';
import { getUserInfo, updateUserInfo } from '@/api/module/orb-match';
import EventSelector from './components/eventSelector';
import { useFetch } from '@/api/core/useFetch';
import { Event } from '../core/events';
import { getWeaponById } from '../core/weapons';

const WALK_DURATION = 2000
const STAGE_COUNT = 10

const TunnelCore: React.FC<{
  isWalking: boolean
  onWalking: (isWalking: boolean) => void
}> = ({ isWalking, onWalking }) => {
  const [isStarted, setIsStarted] = useState(false)
  const { data: user, refresh: refreshUser } = useFetch(getUserInfo, [])

  if (!user) {
    return null
  }

  const walk = () => {
    onWalking(true)
    setTimeout(() => {
      onWalking(false)
    }, WALK_DURATION)
  }

  const start = () => {
    setIsStarted(true)
    walk()
  }

  const nextStage = () => {
    user.stage++
    updateUserInfo(user)
    refreshUser()
    walk()
  }

  const handleSelectEvent = (event: Event) => {
    event.effect(user)
    updateUserInfo(user)
    refreshUser()
    nextStage()
  }

  return (
    <div className={
      'fixed top-0 w-screen h-screen flex flex-col justify-center items-center ' + (
        !isWalking && (!isStarted || user.stage % STAGE_COUNT === 0) ? 'bg-slate-900 bg-opacity-75' : ''
      )
    }>
      {isStarted
        ? (<>
          <div className='w-fit'>
            {user.stage % STAGE_COUNT !== 0 && !isWalking
              ? <>
                <div className='flex justify-between mb-10 w-full text-blue-200'>
                  <div>
                    {user.weapon && <p>武器：{getWeaponById(user.weapon).name}</p>}
                    <p>已獲得祝福（{user.blessings.length}）</p>
                    <p>已獲得道具（{user.items.length}）</p>
                  </div>
                  <div>
                    <p>當前層數：第{user.stage}層</p>
                  </div>
                </div>
                <EventSelector onSelect={handleSelectEvent} stage={user.stage} />
              </>
              : null}
            {user.stage % STAGE_COUNT === 0 && !isWalking ? <Link to='/orb-match/battle' className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'>
              謁見星靈
            </Link> : null}
          </div>
        </>)
        : <button onClick={start} className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'>開始試煉</button>
      }
    </div>
  );
};

const TunnelLayout: React.FC = () => {
  const [isWalking, setIsWalking] = useState(false)

  return (<>
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

      <TunnelCore isWalking={isWalking} onWalking={setIsWalking} />
    </div>
  </>)
}

export default TunnelLayout;
