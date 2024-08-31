import React from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';

const TunnelPage: React.FC = () => {



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
        <Tunnel />
      </Scene>
    </div>
  );
};

export default TunnelPage;
