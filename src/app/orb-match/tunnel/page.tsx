import React, { useState } from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';
import Camera from './components/camera';

const WALK_DURATION = 2500

const TunnelPage: React.FC = () => {
  const [isWalking, setIsWalking] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const handleStart = () => {
    setIsStarted(true)
    setIsWalking(true)

    setTimeout(() => {
      setIsWalking(false)
    }, WALK_DURATION)
  }


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

      <div className='fixed top-0 w-screen h-screen flex justify-center items-center'>
        {isStarted || <button onClick={handleStart} className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'>開始試煉</button>}
      </div>
    </div>
  );
};

export default TunnelPage;
