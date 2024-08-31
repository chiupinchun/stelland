import { Challenger } from "./user"

export abstract class Weapon {
  abstract id: number
  abstract name: string
  abstract description: string
  abstract effect: (challenger: Challenger) => void

  abstract baseAtk: number
}

export class Sword extends Weapon {
  id = 1
  name = ''
  description = ''
  effect = () => { }
  baseAtk = 10
}

export const weapons = [Sword]

export const getWeaponById = (id: number) => {
  return new [weapons[0], ...weapons][id]()
}
