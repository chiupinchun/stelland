import { useThrottle } from '@/app/common/hooks/useThrottle'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { ORB_CLEAR_TRANSITION, ORB_COLOR_MAP, ORB_GAP, ORB_SIZE, X_COUNT, Y_COUNT } from './config'
import { getMatchedOrbs, Orb, OrbStatus, OrbTypeWeights } from './orb'
import { getInitialOrbs } from './utils'

interface Props {
  ready: boolean
  weights?: OrbTypeWeights
  onMatched?: (batch: Orb[]) => void
}

const OrbMatch: FC<Props> = ({
  ready,
  weights = {
    fire: 10,
    water: 10,
    ground: 10,
    poison: 10,
    physic: 10,
    heal: 8
  },
  onMatched
}) => {
  const [orbs, setOrbs] = useState<Orb[]>([])

  const initOrbs = useCallback(() => setOrbs(getInitialOrbs(weights)), [])

  useEffect(initOrbs, [])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const orbContainerRef = useRef<HTMLDivElement>(null!)
  const [orbContainerInfo, setOrbContainerInfo] = useState<{
    width: number,
    height: number,
    left: number,
    top: number
  } | null>(null)
  useEffect(() => {
    if (!orbContainerRef.current) { return }
    const rect = orbContainerRef.current.getBoundingClientRect()
    setOrbContainerInfo({
      width: orbContainerRef.current.clientWidth,
      height: orbContainerRef.current.clientHeight,
      left: rect.left,
      top: rect.top
    })
  }, [])

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useThrottle((e) => {
    if (!orbContainerInfo) { return }

    const x = e.clientX - orbContainerInfo.left
    const y = orbContainerInfo.height - (e.clientY - orbContainerInfo.top)

    if (
      x >= 0
      && x <= orbContainerInfo.width
      && y >= 0
      && y <= orbContainerInfo.height
    ) {
      setMousePosition({ x, y })
    }
  }, 50)

  const [draggingOrb, setDraggingOrb] = useState<Orb | null>(null)
  const handleDropOrb = () => {
    if (!ready || !draggingOrb) { return }

    setDraggingOrb(null)

    checkMatch()
  }

  const checkMatch = async () => {
    const batches = getMatchedOrbs(orbs)

    // set status: matched
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      batch.forEach(orb => orb.status = OrbStatus.Matched)
      if (onMatched) { onMatched(batch) }
      setOrbs([...orbs])
      await new Promise(res => setTimeout(res, ORB_CLEAR_TRANSITION))
    }

    setOrbs(orbs => {
      /**
       * orderedOrbs[n] collect orbs which prop x = n, and each sublist are sorted by y
       */
      const orderedOrbs: Orb[][] = new Array(X_COUNT)
        .fill(undefined)
        .map(() => [])

      orbs.forEach(orb => {
        // filter matched orbs
        if (orb.status === OrbStatus.Matched) { return }

        // order by x, sort by y
        const col = orderedOrbs[orb.x]
        for (let i = 0; i < col.length; i++) {
          if (orb.y < col[i].y) {
            col.splice(i, 0, orb)
            return
          }
        }
        col.push(orb)
      })

      // create new orbs and fall old orbs dwon
      const newOrbs: Orb[] = []
      for (let x = 0; x < X_COUNT; x++) {
        for (let y = 0; y < Y_COUNT; y++) {
          const orb = orderedOrbs[x]?.[y] ?? new Orb(x, y, weights, true)
          orb.y = y
          newOrbs.push(orb)
        }
      }

      return newOrbs
    })

    if (batches.length) {
      // fall new orbs down
      setOrbs(orbs => {
        orbs.forEach(orb => orb.status = OrbStatus.Normal)
        return [...orbs]
      })

      await new Promise(res => setTimeout(res, ORB_CLEAR_TRANSITION))

      checkMatch()
    }
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
      width: (orb.status === OrbStatus.Matched ? 0 : ORB_SIZE) + 'px',
      height: (orb.status === OrbStatus.Matched ? 0 : ORB_SIZE) + 'px',
      backgroundColor: ORB_COLOR_MAP[orb.type],
      transition: ORB_CLEAR_TRANSITION / 1000 + 's'
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
        left: orb.x * (ORB_SIZE + ORB_GAP) + ORB_GAP + 'px',
        bottom: orb.status === OrbStatus.New && orbContainerInfo
          ? orbContainerInfo.height + 'px'
          : orb.y * (ORB_SIZE + ORB_GAP) + ORB_GAP + 'px',
      }
  }

  return (
    <>
      <div className='border rounded'>
        <div className='relative' style={{
          width: ORB_SIZE * X_COUNT + ORB_GAP * (X_COUNT + 1) + 'px',
          height: ORB_SIZE * Y_COUNT + ORB_GAP * (Y_COUNT + 1) + 'px'
        }} ref={orbContainerRef} onMouseMove={handleMouseMove}
        >
          {orbs.map(orb => (
            <div
              key={orb.id}
              className='absolute border border-slate-300 rounded cursor-pointer'
              style={getOrbStyle(orb)}
              onClick={() => draggingOrb === orb ? handleDropOrb() : setDraggingOrb(orb)}
            >{orb.status}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrbMatch
