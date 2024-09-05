import React, { useEffect, useState } from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';
import Camera from './components/camera';
import { Link } from 'react-router-dom';
import { createUser, getUserInfo, UserInfoResponse } from '@/api/module/orb-match';
import EventSelector from './components/eventSelector';

const WALK_DURATION = 2000
const STAGE_COUNT = 10

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

  const handleSelectEvent = () => {
    // TODO: post event
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
        'fixed top-0 w-screen h-screen flex flex-col justify-center items-center ' + (
          !isWalking && (stage === 0 || stage === STAGE_COUNT) ? 'bg-slate-900 bg-opacity-75' : ''
        )
      }>
        {stage === 0 && <button onClick={nextStage} className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'>開始試煉</button>}
        {stage > 0 && stage < STAGE_COUNT && !isWalking
          ? <EventSelector onSelect={handleSelectEvent} stage={stage} />
          : null}
        {stage >= STAGE_COUNT && !isWalking ? <Link to='/orb-match/battle' className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'>
          謁見星靈
        </Link> : null}
      </div>
    </div>
  );
};

export default TunnelPage;
