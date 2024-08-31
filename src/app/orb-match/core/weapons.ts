export abstract class Weapon {
  abstract id: number
  // abstract name: string
  // abstract description: string
  // abstract story: string
}

export class Sword extends Weapon {
  id = 1
}

export const weapons = [Sword]

export const getWeaponById = (id: number) => {
  return new [weapons[0], ...weapons][id]()
}
