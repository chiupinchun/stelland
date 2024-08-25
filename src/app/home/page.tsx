import { Canvas } from '@react-three/fiber'
import React, { FC } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import PrairieDogGlb from '@/assets/models/prairie-dog.glb?url'

interface Props { }

const HomePage: FC<Props> = () => {
  const model = useLoader(GLTFLoader, PrairieDogGlb)
  return (
    <>
      <Canvas>
        <primitive object={model.scene} />
      </Canvas>
    </>
  )
}

export default HomePage
