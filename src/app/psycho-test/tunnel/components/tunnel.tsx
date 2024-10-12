import * as THREE from 'three';

import TunnelBg from '@/assets/images/tunnel-bg.jpg'

const Tunnel: React.FC = () => {
  const tunnelLength = 500; // 隧道的長度
  const tunnelWidth = 20;   // 隧道的寬度
  const tunnelHeight = 15;  // 隧道的高度

  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(TunnelBg)

  return (
    <>
      {/* 隧道的上面 */}
      <mesh position={[0, tunnelHeight / 2, -tunnelLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[tunnelWidth, tunnelLength]} />
        <meshStandardMaterial map={texture} color="gray" side={THREE.DoubleSide} />
      </mesh>

      {/* 隧道的下面 */}
      <mesh position={[0, -tunnelHeight / 2, -tunnelLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[tunnelWidth, tunnelLength]} />
        <meshStandardMaterial map={texture} color="gray" side={THREE.DoubleSide} />
      </mesh>

      {/* 隧道的左側 */}
      <mesh position={[-tunnelWidth / 2, 0, -tunnelLength / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <planeGeometry args={[tunnelHeight, tunnelLength]} />
        <meshStandardMaterial map={texture} color="gray" side={THREE.DoubleSide} />
      </mesh>

      {/* 隧道的右側 */}
      <mesh position={[tunnelWidth / 2, 0, -tunnelLength / 2]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <planeGeometry args={[tunnelHeight, tunnelLength]} />
        <meshStandardMaterial map={texture} color="gray" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default Tunnel
