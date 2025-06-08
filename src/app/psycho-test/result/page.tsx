import Scene from '@/app/common/components/r3f/scene'
import UiModel from '@/app/common/components/r3f/ui-model'
import Card from '@/app/common/components/ui/card'
import { sprites } from '@/app/common/configs/sprites'
import { FC, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusChart from './components/status'

interface Props { }

const Result: FC<Props> = () => {
  const navigate = useNavigate()
  const { key } = useParams()
  const sprite = sprites.find(sprite => sprite.key === key)

  if (!sprite) { return null }

  useEffect(() => {
    if (!sprite) {
      navigate('/psycho-test/tunnel')
    }
  }, [sprite])

  return (
    <>
      <div className='md:flex items-center h-screen'>
        <div className='h-80 md:h-full md:w-2/3'>
          <Scene cameraPosition={[0, 0.25, 0.5]}>
            <UiModel src={sprite.model} />
          </Scene>
        </div>
        <div className='absolute md:relative bottom-5 w-full md:w-fit'>
          <Card className='mx-auto md:mx-0 w-96 max-w-[90vw]'>
            <h2>
              你的守護星靈：
              <span className='font-bold'>{sprite.name}</span>
            </h2>
            <p className='my-4 whitespace-break-spaces'>「{sprite.lines.contract}」</p>
            <div className='flex justify-between items-end'>
              <div className='w-52'>
                <StatusChart sprite={sprite} />
              </div>
              <Link to='/psycho-test/tunnel' className='text-blue-700 cursor-pointer hover:underline'>再測一次</Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Result
