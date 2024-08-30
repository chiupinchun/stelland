import { useThrottle } from '@/app/common/hooks/useThrottle'
import { getRandomInt } from '@/app/common/utils/math'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { attackTypes, ORB_COLOR_MAP, ORB_GAP, ORB_SIZE, X_COUNT, Y_COUNT } from './config'
import { getMatchedOrbs, Orb, OrbStatus } from './orb'

interface Props {
  ready: boolean
  onMatched?: (batch: Orb[]) => void
}

const OrbMatch: FC<Props> = ({ ready, onMatched }) => {
  const [orbs, setOrbs] = useState<Orb[]>([])

  const initOrbs = useCallback(() => {
    const orbs = []
    for (let x = 0; x < X_COUNT; x++) {
      for (let y = 0; y < Y_COUNT; y++) {
        const typeIndex = getRandomInt(0, attackTypes.length)
        orbs.push(new Orb(attackTypes[typeIndex], x, y))
      }
    }
    setOrbs(orbs)
  }, [])

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

    checkMatch()

    setDraggingOrb(null)
  }

  const checkMatch = async () => {
    const batches = getMatchedOrbs(orbs)

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      batch.forEach(orb => orb.status = OrbStatus.Matched)
      if (onMatched) { onMatched(batch) }
      await new Promise(res => setTimeout(res, 150))
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
        left: orb.x * (ORB_SIZE + ORB_GAP) + ORB_GAP + 'px',
        bottom: orb.y * (ORB_SIZE + ORB_GAP) + ORB_GAP + 'px',
      }
  }

  return (
    <>
      <div className='border rounded'>
        <div className='relative' style={{
          width: ORB_SIZE * X_COUNT + ORB_GAP * (X_COUNT + 1) + 'px',
          height: ORB_SIZE * Y_COUNT + ORB_GAP * (Y_COUNT + 1) + 'px'
        }} ref={orbContainerRef} onMouseMove={handleMouseMove} onMouseLeave={handleDropOrb}
        >
          {orbs.map(orb => (
            <div
              key={orb.id}
              className='absolute border border-slate-300 rounded cursor-pointer transition-all'
              style={getOrbStyle(orb)}
              onClick={() => draggingOrb === orb ? handleDropOrb() : setDraggingOrb(orb)}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrbMatch
