import Avatar from '@/app/common/components/ui/avatar'
import Card from '@/app/common/components/ui/card'
import Carousel from '@/app/common/components/ui/carousel'
import { sprites } from '@/app/common/configs/sprites'
import { FC, useMemo, useRef } from 'react'
import { Radar } from 'react-chartjs-2'
import { useSearchParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const Subtitle: FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <h2 className={twMerge('border-b border-slate-700 font-bold text-lg', className)}>
      {children}
    </h2>
  )
}

interface Props { }

const DailyDivination: FC<Props> = () => {
  const images = useRef(sprites.map(sprite => sprite.avatar))

  const [searchParams, setSearchParams] = useSearchParams()

  const currentIndex = useMemo(() => {
    const index = searchParams.get('index')
    return typeof index === 'string' ? Number(index) : 0
  }, [searchParams])

  const handleChange = (index: number) => {
    searchParams.set('index', index + '')
    setSearchParams(searchParams)
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center py-4 min-h-screen'>
        <Carousel
          interval={null}
          index={currentIndex}
          onChange={handleChange}
          className='w-[90vw] max-w-2xl'
        >
          {sprites.map(sprite => (
            <Card key={sprite.key} className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <img src={sprite.avatar} alt={sprite.name} />
              <section className='flex flex-col justify-between space-y-2 md:space-y-0'>
                <Subtitle>星靈占卜：{sprite.name}</Subtitle>
                <article className='space-y-1 text-slate-700'>
                  <p>
                    和
                    <strong>{sprite.name}</strong>
                    締結契約的你，今天會有
                    <span className='text-emerald-500 font-bold'>無與倫比</span>
                    的
                    <span className='text-cyan-600 font-bold'>抽卡運</span>
                    。
                  </p>
                  <p>
                    在星靈的庇護下，今天適合
                    <span className='text-amber-500 font-bold'>拉屎</span>
                    ，但要注意
                    <span className='text-indigo-500 font-bold'>吃屎</span>
                    可能會帶來厄運。
                  </p>
                </article>
                <div className='p-3 border rounded-xl'>
                  <table className='w-full' >
                    <tbody>
                      <tr className='border-b'>
                        <td>幸運色</td>
                        <td>黃</td>
                      </tr>
                      <tr className='border-b'>
                        <td>幸運數字</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>幸運小物</td>
                        <td>內褲</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section>
                <Subtitle className='mb-2'>星靈關係</Subtitle>
                <table className='w-full' >
                  <tbody>
                    <tr className='border-b'>
                      <td>適合共事的星靈</td>
                      <td>牙之星靈</td>
                    </tr>
                    <tr>
                      <td>易起摩擦的星靈</td>
                      <td>牙之星靈</td>
                    </tr>
                  </tbody>
                </table>
                <Subtitle className='mt-5 mb-2'>運勢指標</Subtitle>
                <table className='w-full' >
                  <tbody>
                    <tr className='border-b'>
                      <td>健康</td>
                      <td>5</td>
                    </tr>
                    <tr className='border-b'>
                      <td>感情</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>事業</td>
                      <td>5</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                <Radar data={{
                  labels: ['健康', '事業', '感情'],
                  datasets: [{
                    data: [5, 5, 5]
                  }]
                }} options={{
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    r: {
                      ticks: { display: false },
                      beginAtZero: true,
                      grid: { display: false }
                    }
                  }
                }} />
              </section>
            </Card>
          ))}
        </Carousel>
        <div className='hidden md:flex justify-center gap-5 mt-5'>
          {images.current.map((image, index) => (<Avatar
            key={index} src={image} width={75}
            className={twMerge(
              'cursor-pointer',
              currentIndex === index ? 'shadow-lg shadow-slate-300' : ''
            )}
            onClick={() => handleChange(index)}
          />))}
        </div>
      </div>
    </>
  )
}

export default DailyDivination
