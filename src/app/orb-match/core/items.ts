import { Challenger } from "./challenger"

export abstract class Item {
  abstract id: number
  abstract name: string
  abstract description: string
  abstract effect: (challenger: Challenger) => void
}
export class Meat extends Item {
  id = 1
  name = '肉'
  description = '回復生命10點。'
  effect = (challenger: Challenger) => {
    challenger.receiveHeal(10)
  }
}
export class Protect extends Item {
  id = 2
  name = '保護'
  description = '獲得10點護盾。'
  effect = (challenger: Challenger) => {
    challenger.receiveSheild(10)
  }
}

export const items = [Meat, Protect]

export const getItemById = (id: number) => {
  return new [items[0], ...items][id]()
}
