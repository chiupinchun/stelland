import { FC, useState } from 'react'
import { runes } from './configs/runes'
import Rune from './components/rune'

interface Props { }

const RuneDivination: FC<Props> = () => {
  const [selectedRune, setSelectedRune] = useState<typeof runes[number] | null>(null)

  return (
    <>
      <main className='flex flex-col justify-center items-center h-screen'>
        <div>
          <div className='mb-3 md:mb-8 text-start text-white'>
            <h2 className='mb-2 font-bold text-lg'>符文占卜</h2>
            <p className='text-slate-300'>
              請在心中默念你的問題，<br />
              並憑直覺選擇一顆符文。
            </p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-5 w-fit'>
            {runes.map(rune => (
              <Rune
                key={rune.key}
                isActive={selectedRune === rune}
                onClick={() => setSelectedRune(rune)}
              >
                <img src={rune.icon} width={75} height={75} />
              </Rune>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default RuneDivination
