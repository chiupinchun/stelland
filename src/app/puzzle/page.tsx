import { FC, useCallback, useEffect, useState } from 'react'
import SpiritsPicture from '@/assets/images/spirits.webp'

const PIECE_COUNT_X = 4
const PIECE_COUNT_y = 3
const PIECE_WIDTH = 480 / PIECE_COUNT_X
const PIECE_HEIGHT = 270 / PIECE_COUNT_y

interface PuzzlePiece {
  id: number
  x: number
  y: number
  isEmpty: boolean
}

const Piece: FC<PuzzlePiece & { onClick: () => void }> = ({ onClick, ...piece }) => {
  return <div onClick={onClick} className='w-5 h-5 border cursor-pointer' style={{
    width: PIECE_WIDTH + 'px',
    height: PIECE_HEIGHT + 'px',
    backgroundImage: piece.isEmpty ? '' : `url(${SpiritsPicture})`,
    backgroundPosition: `${piece.x * 33}% ${piece.y * 50}%`
  }} />
}

interface Props { }

const Puzzle: FC<Props> = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [slots, setSlots] = useState<PuzzlePiece[]>([])

  const resetPieces = () => {
    const pieces = []
    const slots = []
    for (let y = 0; y < PIECE_COUNT_y; y++) {
      for (let x = 0; x < PIECE_COUNT_X; x++) {
        pieces.push({
          id: y * PIECE_COUNT_X + x + 1,
          x, y, isEmpty: false
        })
        slots.push({
          id: y * PIECE_COUNT_X + x + 1,
          x: 0, y: 0, isEmpty: true
        })
      }
    }

    pieces.sort(() => Math.random() > 0.5 ? 1 : -1)
    setPieces(pieces)
    setSlots(slots)
  }

  useEffect(resetPieces, [])

  const [selectedPice, setSelectedPiece] = useState<PuzzlePiece | null>(null)

  const handleSelectPiece = (piece: PuzzlePiece) => {
    if (selectedPice) {
      switchPieces(piece, selectedPice)
    } else {
      setSelectedPiece(piece)
    }
  }

  const switchPieces = (piece1: PuzzlePiece, piece2: PuzzlePiece) => {
    const tempPiece = { ...piece1 }
    Object.assign(piece1, piece2)
    Object.assign(piece2, tempPiece)
    setPieces([...pieces])
    setSlots([...slots])
    setSelectedPiece(null)

    const isComplete = checkComplete()
    if (isComplete) {
      alert('過關！')
    }
  }

  const checkComplete = () => {
    for (let i = 0; i < PIECE_COUNT_X * PIECE_COUNT_y; i++) {
      const currentSlot = slots[i]
      if (currentSlot.isEmpty || currentSlot.id !== i + 1) {
        return false
      }
    }
    return true
  }

  return (
    <>
      <div className='flex justify-center items-center gap-10 h-screen'>
        <div>
          <h2>插槽區</h2>
          <ul className='grid grid-cols-4 gap-2'>
            {slots.map(piece => (
              <li key={piece.id + '' + piece.isEmpty} className={'shadow-inner shadow-slate-300 ' + (selectedPice === piece ? 'shadow-2xl shadow-blue-300' : '')}>
                <Piece onClick={() => handleSelectPiece(piece)} {...piece} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>碎片區</h2>
          <ul className='grid grid-cols-2 gap-2'>
            {pieces.map(piece => (
              <li key={piece.id + '' + piece.isEmpty} className={selectedPice === piece ? 'shadow-2xl shadow-blue-300' : ''}>
                <Piece onClick={() => handleSelectPiece(piece)} {...piece} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Puzzle
