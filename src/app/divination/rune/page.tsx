import { FC, useState } from 'react'
import { runes } from './configs/runes'
import Rune from './components/rune'

interface Props { }

const RuneDivination: FC<Props> = () => {
  const [selectedRune, setSelectedRune] = useState<typeof runes[number] | null>(null)

  return (
    <>
      <main className='flex justify-center items-center h-screen'>
        <div className='grid grid-cols-3 gap-5 w-fit'>
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
      </main>
    </>
  )
}

export default RuneDivination
