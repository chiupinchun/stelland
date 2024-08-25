import { FC, useEffect, useState } from 'react'
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

  return (
    <>
      <div className='flex justify-center items-center gap-10 h-screen'>
        <div>
          <h2>插槽區</h2>
          <ul className='grid grid-cols-4 gap-2'>
            {slots.map(piece => (
              <li key={piece.id}>
                <div className='w-5 h-5 border' style={{
                  width: PIECE_WIDTH + 'px',
                  height: PIECE_HEIGHT + 'px',
                  backgroundImage: piece.isEmpty ? '' : `url(${SpiritsPicture})`,
                  backgroundPosition: `${piece.x * 33}% ${piece.y * 50}%`
                }} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>碎片區</h2>
          <ul className='grid grid-cols-2 gap-2'>
            {pieces.map(piece => (
              <li key={piece.id}>
                <div className='w-5 h-5 border' style={{
                  width: PIECE_WIDTH + 'px',
                  height: PIECE_HEIGHT + 'px',
                  backgroundImage: `url(${SpiritsPicture})`,
                  backgroundPosition: `${piece.x * 33}% ${piece.y * 50}%`
                }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Puzzle
