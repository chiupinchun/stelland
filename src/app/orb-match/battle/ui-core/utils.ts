import { X_COUNT, Y_COUNT } from "./config"
import { Orb, OrbTypeWeights } from "./orb"

export const getInitialOrbs = (weights: OrbTypeWeights) => {
  const orbs: Orb[] = []

  const getOrbByCoordinate = (x: number, y: number) => {
    return orbs[y * X_COUNT + x]
  }

  for (let y = 0; y < Y_COUNT; y++) {
    for (let x = 0; x < X_COUNT; x++) {
      const noContinuesColorWeights = { ...weights }
      if (x > 1) {
        const prevOrb = getOrbByCoordinate(x - 1, y)
        if (prevOrb.type === getOrbByCoordinate(x - 2, y).type) {
          noContinuesColorWeights[prevOrb.type] = 0
        }
      }
      if (y > 1) {
        const prevOrb = getOrbByCoordinate(x, y - 1)
        if (prevOrb.type === getOrbByCoordinate(x, y - 2).type) {
          noContinuesColorWeights[prevOrb.type] = 0
        }
      }
      orbs.push(new Orb(x, y, noContinuesColorWeights))
    }
  }

  return orbs
}