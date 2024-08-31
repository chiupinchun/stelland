import { Challenger } from "./user"

export abstract class Item {
  abstract id: number
  abstract name: string
  abstract description: string
  abstract effect: (challenger: Challenger) => void
}

export class Potion extends Item {
  id = 1
  name = ''
  description = ''
  effect = () => { }
}

export const items = [Potion]

export const getItemById = (id: number) => {
  return new [items[0], ...items][id]()
}
