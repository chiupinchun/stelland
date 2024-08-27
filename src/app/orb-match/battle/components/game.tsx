import { getRandomInt } from '@/app/common/utils/math'
import { FC, useEffect, useState } from 'react'

const X_COUNT = 6
const Y_COUNT = 5
const ORB_SIZE = 40
const ORB_GAP = 10

const ORB_COLOR_MAP = {
  fire: '#FE3434',
  water: '#88FFFC',
  ground: '#A07811',
  poison: '#024331',
  physic: '#A8A8A8',
  heal: '#EF77C9'
}

const attackTypes = ['fire', 'water', 'ground', 'poison', 'physic', 'heal'] as const

enum OrbStatus {
  Normal,
  Matched
}

let currentOrbId = 0
class Orb {
  id: number
  status = OrbStatus.Normal

  constructor(
    public readonly type: typeof attackTypes[number],
    public x: number,
    public y: number
  ) {
    this.id = ++currentOrbId
  }
}

interface Props { }

const OrbPuzzle: FC<Props> = () => {
  const [orbs, setOrbs] = useState<Orb[]>([])

  const initOrbs = () => {
    const orbs = []
    for (let x = 0; x < X_COUNT; x++) {
      for (let y = 0; y < Y_COUNT; y++) {
        const typeIndex = getRandomInt(0, attackTypes.length)
        orbs.push(new Orb(attackTypes[typeIndex], x, y))
      }
    }
    setOrbs(orbs)
  }

  useEffect(initOrbs, [])

  return (
    <>
      <div className='relative' style={{
        width: ORB_SIZE * X_COUNT + ORB_GAP * (X_COUNT - 1) + 'px',
        height: ORB_SIZE * Y_COUNT + ORB_GAP * (Y_COUNT - 1) + 'px'
      }}>
        {orbs.map(orb => (
          <div key={orb.id} className='absolute rounded' style={{
            width: ORB_SIZE + 'px',
            height: ORB_SIZE + 'px',
            left: orb.x * (ORB_SIZE + ORB_GAP) + 'px',
            bottom: orb.y * (ORB_SIZE + ORB_GAP) + 'px',
            backgroundColor: ORB_COLOR_MAP[orb.type]
          }}></div>
        ))}
      </div>
    </>
  )
}

export default OrbPuzzle
