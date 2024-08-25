export const degToRadian = (deg: number) => {
  return deg / 360 * 2 * Math.PI
}

export const radianToDeg = (radian: number) => {
  return radian / (2 * Math.PI) * 360
}

export const getDirection = (deltaX: number, deltaZ: number) => {
  return deltaZ >= 0
    ? Math.atan(deltaX / deltaZ)
    : Math.atan(deltaX / deltaZ) + Math.PI
}
