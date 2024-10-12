import { Question } from "@/app/psycho-test/tunnel/configs/questions"
import Card from "@/app/common/components/ui/card"
import { Sprite } from "@/app/common/configs/sprites"
import { useState } from "react"

const Selector: React.FC<{
  question: Question
  onSelect: (event: Sprite['key'][]) => void
}> = ({ question, onSelect }) => {
  const [selected, setSelected] = useState<Question['options'][number] | null>(null)

  const handleConfirm = () => {
    if (!selected) { return }

    onSelect(selected.sprites)
    setSelected(null)
  }

  return (<>
    <div className='flex gap-40'>
      <Card
        className='w-[800px] max-w-[90vw] shadow-2xl'
      >
        <h2 className='font-bold text-lg'>{question.text}</h2>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-5 my-10'>
          {question.options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => setSelected(option)}
                className={'px-4 py-2 w-full border rounded-full border-slate-400 shadow-slate-500 ' + (
                  selected === option ? 'shadow-inner' : 'shadow'
                )}
              >{option.text}</button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <a
            onClick={handleConfirm}
            className="text-blue-700 cursor-pointer hover:underline"
          >下一題&nbsp;&nbsp;&gt;&gt;</a>
        </div>
      </Card>
    </div>
  </>)
}

export default Selector