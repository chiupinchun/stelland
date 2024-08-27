export const degToRadian = (deg: number) => {
  return deg / 360 * 2 * Math.PI
}

export const radianToDeg = (radian: number) => {
  return radian / (2 * Math.PI) * 360
}

export const getDirection = (deltaX: number, deltaZ: number, rawDirection: number) => {
  if (deltaZ === 0 && deltaX === 0) {
    return rawDirection
  }

  if (deltaZ === 0) {
    return deltaX > 0
      ? Math.PI / 2
      : Math.PI * 3 / 4
  }

  return deltaZ > 0
    ? Math.atan(deltaX / deltaZ)
    : Math.atan(deltaX / deltaZ) + Math.PI
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min))
}
