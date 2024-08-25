import React, { FC } from 'react'
import { Coordinate3d } from '@/app/common/types/math'
import Star from './star'

interface Props {
  count: number
}

const StarNight: FC<Props> = ({ count }) => {
  const starPositions: Coordinate3d[] = []
  for (let i = 0; i < count; i++) {
    starPositions.push([
      -45 + Math.random() * 90,
      Math.random() * 8,
      -20 - Math.random() * 20
    ])
  }

  return (
    <>
      {starPositions.map((position, index) => <Star key={index} position={position} />)}
    </>
  )
}

export default React.memo(StarNight)
