import React, { useState } from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';
import Camera from './components/camera';
import { Link } from 'react-router-dom';
import { getUserInfo, updateUserInfo, UserInfoResponse } from '@/api/module/orb-match';
import EventSelector from './components/eventSelector';
import { useFetch } from '@/api/core/useFetch';
import { Event } from '../core/events';
import ChallengerInfo from './components/challengerInfo';
import Modal from '@/app/common/components/ui/modal';
import { STAGE_COUNT } from './constants/stage';

const WALK_DURATION = 2000

const TunnelCore: React.FC<{
  isWalking: boolean
  user: UserInfoResponse
  onRefreshUser: () => void
  onWalking: (isWalking: boolean) => void
  onClickChallengerInfo: () => void
}> = ({
  isWalking, user, onRefreshUser, onWalking, onClickChallengerInfo
}) => {
    const [isStarted, setIsStarted] = useState(false)

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
      onRefreshUser()
      walk()
    }

    const handleSelectEvent = (event: Event) => {
      event.effect(user)
      updateUserInfo(user)
      onRefreshUser()
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
                      <a onClick={onClickChallengerInfo} className='cursor-pointer font-bold hover:underline'>角色資訊</a>
                    </div>
                    <div>
                      當前層數：第{user.stage}層
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
  const { data: user, refresh: refreshUser } = useFetch(getUserInfo, [])

  const [isWalking, setIsWalking] = useState(false)
  const [isChallengerInfoShow, setIsChallengerInfoShow] = useState(false)

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

      {user && <TunnelCore
        isWalking={isWalking}
        user={user}
        onRefreshUser={refreshUser}
        onWalking={setIsWalking}
        onClickChallengerInfo={() => setIsChallengerInfoShow(true)}
      />}

      {user && <Modal
        show={isChallengerInfoShow}
        onClose={() => setIsChallengerInfoShow(false)}
      >
        <ChallengerInfo
          user={user}
          onClose={() => setIsChallengerInfoShow(false)}
        />
      </Modal>}
    </div>
  </>)
}

export default TunnelLayout;
