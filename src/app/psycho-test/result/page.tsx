import Scene from '@/app/common/components/r3f/scene'
import UiModel from '@/app/common/components/r3f/ui-model'
import Card from '@/app/common/components/ui/card'
import { sprites } from '@/app/common/configs/sprites'
import { FC, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

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
      <div className='flex items-center h-screen'>
        <div className='h-full w-1/2'>
          <Scene cameraPosition={[0, 0.25, 0.5]}>
            <UiModel src={sprite.model} />
          </Scene>
        </div>
        <Card>
          <h2>你的守護星靈：{sprite.name}</h2>
          <div className='flex justify-end'>
            <Link to='/psycho-test/tunnel' className='text-blue-700 cursor-pointer hover:underline'>再測一次</Link>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Result
