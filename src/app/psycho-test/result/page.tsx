import Scene from '@/app/common/components/r3f/scene'
import UiModel from '@/app/common/components/r3f/ui-model'
import Card from '@/app/common/components/ui/card'
import { sprites } from '@/app/common/configs/sprites'
import { FC, useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import StatusChart from './components/status'
import Share from '@/app/common/components/share'

interface Props { }

const Result: FC<Props> = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { key } = useParams()
  const sprite = sprites.find(sprite => sprite.key === key)

  if (!sprite) { return null }

  useEffect(() => {
    if (!sprite) {
      navigate('/psycho-test/tunnel')
    }
  }, [sprite])

  const isShareMode = useMemo(() => searchParams.get('mode') === 'share', [searchParams])

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
              守護星靈：
              <span className='font-bold'>{sprite.name}</span>
            </h2>
            <p className='my-4 whitespace-break-spaces'>「{sprite.lines.contract}」</p>
            <div className='flex justify-between items-end'>
              <div className='w-52'>
                <StatusChart sprite={sprite} />
              </div>
              <div className='flex flex-col gap-5'>
                {!isShareMode && <Share
                  location='left-top'
                  link={location.href.replace(/\?.*/, '') + '?mode=share'}
                  shareText={
                    `我的守護星靈是——${sprite.name}！\n「${sprite.lines.contract}」\n一起來測測看你的守護星靈吧☆`
                  }
                />}

                <Link to='/psycho-test/tunnel' className='text-blue-700 cursor-pointer hover:underline'>
                  {isShareMode ? '測我的星靈' : '再測一次'}
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Result
