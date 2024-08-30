import { attackTypes, ORB_GAP, ORB_SIZE } from "./config"

export enum OrbStatus {
  Normal,
  Matched
}

let currentOrbId = 0
export class Orb {
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

export const getMatchedOrbs = (orbs: Orb[]) => {
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

  return batches
}
