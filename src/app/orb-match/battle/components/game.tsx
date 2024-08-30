import { useThrottle } from '@/app/common/hooks/useThrottle'
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

  getSameColorOrbs(
    orbs: Orb[],
    nextDirect: (coordinate: [number, number]) => [number, number]
  ): Orb[] {
    const [x, y] = nextDirect([this.x, this.y])
    const nextOrb = orbs.find(orb => orb.x === x && orb.y === y)

    if (nextOrb && nextOrb.type === this.type) {
      return [...nextOrb.getSameColorOrbs(orbs, nextDirect), nextOrb]
    } else {
      return []
    }
  }
}

interface Props {
  ready: boolean
  onMatched?: (batch: Orb[]) => void
}

const OrbMatch: FC<Props> = ({ ready, onMatched }) => {
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
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useThrottle((e) => {
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
  }, 50)


  const [draggingOrb, setDraggingOrb] = useState<Orb | null>(null)
  const handleDropOrb = () => {
    if (!ready || !draggingOrb) { return }

    checkMatch()

    setDraggingOrb(null)
  }

  const checkMatch = async () => {
    const checkedHorizontalOrbs = new Set<Orb>()
    const checkHorizontal = (orb: Orb, strict: boolean) => {
      if (checkedHorizontalOrbs.has(orb)) { return [] }
      checkedHorizontalOrbs.add(orb)

      const horizontalSameColorOrbs = [
        orb,
        ...orb.getSameColorOrbs(orbs, ([x, y]) => [x - 1, y]),
        ...orb.getSameColorOrbs(orbs, ([x, y]) => [x + 1, y])
      ]

      // 3match: false, strict: true
      if (horizontalSameColorOrbs.length < 3 && strict) {
        return []
      }
      // 3match: true, strict: any
      if (horizontalSameColorOrbs.length >= 3) {
        horizontalSameColorOrbs.forEach(orb => {
          const verticalSameColorOrbs = checkVertical(orb, false)
          horizontalSameColorOrbs.push(...verticalSameColorOrbs)
        })
      }
      // 3match: false, strict: false
      else if (!strict) {
        horizontalSameColorOrbs.forEach(orb => {
          const verticalSameColorOrbs = checkVertical(orb, true)
          if (verticalSameColorOrbs.length >= 3) {
            horizontalSameColorOrbs.push(...verticalSameColorOrbs)
          }
        })
      }
      // 3match: false, strict: true
      // nothing to do

      const deDuplicated = [...new Set(horizontalSameColorOrbs)]

      return deDuplicated.length >= 3
        ? deDuplicated
        : []
    }

    const checkedVerticalOrbs = new Set<Orb>()
    const checkVertical = (orb: Orb, strict: boolean) => {
      if (checkedVerticalOrbs.has(orb)) { return [] }
      checkedVerticalOrbs.add(orb)

      const verticalSameColorOrbs = [
        orb,
        ...orb.getSameColorOrbs(orbs, ([x, y]) => [x, y - 1]),
        ...orb.getSameColorOrbs(orbs, ([x, y]) => [x, y + 1])
      ]

      // 3match: false, strict: true
      if (verticalSameColorOrbs.length < 3 && strict) {
        return []
      }
      // 3match: true, strict: any
      if (verticalSameColorOrbs.length >= 3) {
        verticalSameColorOrbs.forEach(orb => {
          const horizontalSameColorOrbs = checkHorizontal(orb, false)
          verticalSameColorOrbs.push(...horizontalSameColorOrbs)
        })
      }
      // 3match: false, strict: false
      else if (!strict) {
        verticalSameColorOrbs.forEach(orb => {
          const horizontalSameColorOrbs = checkHorizontal(orb, true)
          if (horizontalSameColorOrbs.length >= 3) {
            verticalSameColorOrbs.push(...horizontalSameColorOrbs)
          }
        })
      }
      // 3match: false, strict: true
      // nothing to do

      const deDuplicated = [...new Set(verticalSameColorOrbs)]

      return deDuplicated.length >= 3
        ? deDuplicated
        : []
    }

    const batches: Orb[][] = []
    orbs.forEach(orb => {
      const batch = [
        ...checkHorizontal(orb, true),
        ...checkVertical(orb, true)
      ]
      if (batch.length) { batches.push(batch) }
    })

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      batch.forEach(orb => orb.status = OrbStatus.Matched)
      if (onMatched) { onMatched(batch) }
      await new Promise(res => setTimeout(res, 150))
    }
    console.log(batches)
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
      width: (orb.status === OrbStatus.Normal ? ORB_SIZE : 0) + 'px',
      height: (orb.status === OrbStatus.Normal ? ORB_SIZE : 0) + 'px',
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
            className='absolute border border-slate-300 rounded cursor-pointer transition-all'
            style={getOrbStyle(orb)}
            onClick={() => draggingOrb === orb ? handleDropOrb() : setDraggingOrb(orb)}
          >{orb.id}</div>
        ))}
      </div>
    </>
  )
}

export default OrbMatch
