import React, { useMemo, useState } from 'react';
import Scene from '@/app/common/components/r3f/scene';
import Tunnel from './components/tunnel';
import Camera from './components/camera';
import Selector from './components/selector';
import { questions } from './configs/questions';
import { Sprite, sprites } from '@/app/common/configs/sprites';
import { useNavigate } from 'react-router-dom';
import HpBar from '@/app/common/components/ui/hpBar';

const WALK_DURATION = 1000

const TunnelCore: React.FC<{
  isWalking: boolean
  onWalking: (isWalking: boolean) => void
}> = ({
  isWalking, onWalking
}) => {
    const navigate = useNavigate()

    const [isStarted, setIsStarted] = useState(false)

    const start = () => {
      setIsStarted(true)
      walk()
    }

    const walk = () => {
      return new Promise(resolve => {
        onWalking(true)
        setTimeout(() => {
          onWalking(false)
          resolve(undefined)
        }, WALK_DURATION)
      })
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currentQuestion = useMemo(
      () => questions[currentQuestionIndex],
      [currentQuestionIndex]
    )

    const [score, setScore] = useState<Record<Sprite['key'], number>>(
      sprites.reduce(
        (result, sprite) => ({ ...result, [sprite.key]: 0 }),
        {} as Record<string, number>
      )
    )

    const nextStage = async (keys: Sprite['key'][]) => {
      keys.forEach(key => {
        score[key]++
      })
      if (currentQuestionIndex < questions.length - 1) {
        setScore(score)

        walk()
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        const [key] = Object.entries(score)
          .reduce((highest, current) => highest[1] > current[1] ? highest : current)
        await walk()
        navigate(`/psycho-test/result/${key}`)
      }
    }

    return (
      <div className={
        'fixed top-0 w-screen h-screen flex flex-col justify-center items-center ' + (
          !isWalking && !isStarted ? 'bg-slate-900 bg-opacity-75' : ''
        )
      }>
        <div className='w-fit'>
          {isStarted || <button
            onClick={start}
            className='px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-100'
          >開始測驗</button>}
          {isStarted && !isWalking
            ? <>
              <HpBar
                hp={currentQuestionIndex}
                maxHp={questions.length}
                className='mb-5 rounded-lg'
                innerBarClassName='bg-blue-700'
              />
              <Selector onSelect={nextStage} question={currentQuestion} />
            </>
            : null}
        </div>
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

      <TunnelCore
        isWalking={isWalking}
        onWalking={setIsWalking}
      />
    </div>
  </>)
}

export default TunnelLayout;
