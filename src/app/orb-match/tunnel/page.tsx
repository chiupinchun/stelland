import React, { useEffect, useState } from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';
import Camera from './components/camera';
import { Link } from 'react-router-dom';
import { createUser, getUserInfo, UserInfoResponse } from '@/api/module/orb-match';

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

  const handleSelectBonus = (bonus: number) => {
    console.log(bonus)
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
          {[1, 2, 3].map((num) => (
            <div onClick={() => handleSelectBonus(num)} className='w-48 h-96 bg-slate-300 rounded-xl cursor-pointer' key={num}>
              祝福{num}
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
