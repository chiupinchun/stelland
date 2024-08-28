import { getRandomInt } from '@/app/common/utils/math'
import { FC, useEffect, useRef, useState } from 'react'

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

  checkInRange(coordinate: { x: number, y: number }) {
    return coordinate.x > this.x * (ORB_SIZE + ORB_GAP)
      && coordinate.x < (this.x + 1) * (ORB_SIZE + ORB_GAP)
      && coordinate.y > this.y * (ORB_SIZE + ORB_GAP)
      && coordinate.y < (this.y + 1) * (ORB_SIZE + ORB_GAP)
  }
}

interface Props {
  ready: boolean
}

const OrbMatch: FC<Props> = ({ ready }) => {
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const orbContainerRef = useRef<HTMLDivElement>(null!)
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const container = orbContainerRef.current
    if (!container) { return }
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = container.clientHeight - (e.clientY - rect.top)

    if (
      x >= 0
      && x <= container.clientWidth
      && y >= 0
      && y <= container.clientHeight
    ) {
      setMousePosition({ x, y })
    }
  }

  const [draggingOrb, setDraggingOrb] = useState<Orb | null>(null)
  const handleDropOrb = () => {
    if (!ready || !draggingOrb) { return }
    setDraggingOrb(null)
  }

  useEffect(() => {
    if (!draggingOrb) { return }

    const touchedOrb = orbs.find(orb => orb.checkInRange(mousePosition))
    if (touchedOrb) {
      const tempCoordinate = {
        x: draggingOrb.x,
        y: draggingOrb.y
      }
      draggingOrb.x = touchedOrb.x
      draggingOrb.y = touchedOrb.y
      touchedOrb.x = tempCoordinate.x
      touchedOrb.y = tempCoordinate.y
    }
  }, [mousePosition, draggingOrb])

  const getOrbStyle = (orb: Orb): React.CSSProperties => {
    const baseStyle = {
      width: ORB_SIZE + 'px',
      height: ORB_SIZE + 'px',
      backgroundColor: ORB_COLOR_MAP[orb.type]
    }
    const isDragging = orb === draggingOrb

    return isDragging
      ? {
        ...baseStyle,
        left: mousePosition.x - ORB_SIZE / 2 + 'px',
        bottom: mousePosition.y - ORB_SIZE / 2 + 'px',
        zIndex: 10
      }
      : {
        ...baseStyle,
        left: orb.x * (ORB_SIZE + ORB_GAP) + 'px',
        bottom: orb.y * (ORB_SIZE + ORB_GAP) + 'px',
      }
  }

  return (
    <>
      <div className='relative' style={{
        width: ORB_SIZE * X_COUNT + ORB_GAP * (X_COUNT - 1) + 'px',
        height: ORB_SIZE * Y_COUNT + ORB_GAP * (Y_COUNT - 1) + 'px'
      }} ref={orbContainerRef} onMouseMove={handleMouseMove} onMouseLeave={handleDropOrb}
      >
        {orbs.map(orb => (
          <div
            key={orb.id}
            className='absolute border border-slate-300 rounded cursor-pointer'
            style={getOrbStyle(orb)}
            onClick={() => draggingOrb === orb ? handleDropOrb() : setDraggingOrb(orb)}
          ></div>
        ))}
      </div>
    </>
  )
}

export default OrbMatch
