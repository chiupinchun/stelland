import { FC, useState } from 'react'
import { runes as runesBeforeShuffled } from './configs/runes'
import Rune from './components/rune'
import Modal from '@/app/common/components/ui/modal'
import Card from '@/app/common/components/ui/card'
import { shuffle } from '@/app/common/utils/math'
import bg from '@/assets/images/rune-bg.webp'

interface Props { }

const RuneDivination: FC<Props> = () => {
  const [runes, setRunes] = useState(shuffle(runesBeforeShuffled))

  const [selectedRune, setSelectedRune] = useState<typeof runes[number] | null>(null)

  const [
    isDescriptionModalOpen, setIsDescriptionModalOpen
  ] = useState(false)

  const handleSelectRune = (rune: typeof runes[number]) => {
    if (selectedRune) { return }

    setSelectedRune(rune)
    setTimeout(() => {
      setIsDescriptionModalOpen(true)
    }, 300)
  }

  const handleInit = () => {
    setSelectedRune(null)
    setIsDescriptionModalOpen(false)
    setRunes(shuffle(runesBeforeShuffled))
  }

  return (
    <>
      <main
        className='flex flex-col justify-center items-center h-screen bg-center'
        style={{
          backgroundImage: `url(${bg})`
        }}
      >
        <div className='p-10 bg-slate-700 bg-opacity-50 rounded-2xl'>
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
                onClick={() => handleSelectRune(rune)}
              >
                <img src={rune.icon} width={75} height={75} />
              </Rune>
            ))}
          </div>
        </div>
      </main>

      <Modal show={isDescriptionModalOpen}>
        {selectedRune && <Card className='mx-2 px-10 space-y-5'>
          <div className='flex justify-between items-center'>
            <img src={selectedRune.icon} alt="" />
            <h3 className='font-bold text-lg'>{selectedRune.name}</h3>
          </div>
          <div>
            <h4 className='font-bold'>意義</h4>
            <ul className='ps-5 list-disc text-slate-700'>
              {selectedRune.meanings.map(meaning => (
                <li key={meaning}>{meaning}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className='font-bold'>指引</h4>
            <ul className='ps-5 list-disc text-slate-700'>
              {selectedRune.guides.map(guide => (
                <li key={guide}>{guide}</li>
              ))}
            </ul>
          </div>
          <button
            className='flex justify-center px-4 py-1 w-full md:w-auto rounded-xl bg-slate-700 text-slate-100 hover:bg-slate-100 hover:text-slate-700'
            onClick={handleInit}
          >再測一次</button>
        </Card>}
      </Modal>
    </>
  )
}

export default RuneDivination
