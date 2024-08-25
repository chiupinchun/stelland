import { Canvas } from '@react-three/fiber'
import './App.css'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import PrairieDogGlb from './assets/models/prairie-dog.glb?url'

function App() {
  const model = useLoader(GLTFLoader, PrairieDogGlb)

  return (
    <>
      <div className='border'>
        <Canvas>
          <primitive object={model.scene} />
        </Canvas>
      </div>
    </>
  )
}

export default App
